"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { get, ref as dbRef, remove as dbRemove, set as dbSet } from "firebase/database";
import { auth, db, rtdb } from "@/lib/firebase/config";
import type { Category, Song } from "@/types/music";

// Realtime Database has no per-document size cap like Firestore, but a
// single JSON value should still stay well clear of its request-size
// limits — 10MB raw (~13.5MB once base64-encoded) comfortably fits a
// compressed 3-5 minute song while staying safely inside those limits.
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toEpochMs(value: unknown): number {
  return value instanceof Timestamp ? value.toMillis() : Date.now();
}

export async function fetchCategories(): Promise<Category[]> {
  const snapshot = await getDocs(collection(db, "categories"));
  return snapshot.docs
    .map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: String(data.name ?? docSnap.id),
        createdAt: toEpochMs(data.createdAt),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function createCategory(name: string): Promise<Category> {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Category name cannot be empty.");

  const id = slugify(trimmed);
  if (!id) throw new Error("Category name must contain at least one letter or number.");

  const categoryRef = doc(db, "categories", id);
  const existing = await getDoc(categoryRef);
  if (existing.exists()) {
    throw new Error(`A category named "${trimmed}" already exists.`);
  }

  await setDoc(categoryRef, { name: trimmed, createdAt: serverTimestamp() });
  return { id, name: trimmed, createdAt: Date.now() };
}

function mapSongDoc(id: string, data: Record<string, unknown>): Song {
  return {
    id,
    title: String(data.title ?? "Untitled"),
    artist: typeof data.artist === "string" ? data.artist : null,
    categoryId: String(data.categoryId ?? ""),
    categoryName: String(data.categoryName ?? ""),
    audioPath: String(data.audioPath ?? ""),
    duration: typeof data.duration === "number" ? data.duration : null,
    createdAt: toEpochMs(data.createdAt),
    createdBy: String(data.createdBy ?? ""),
  };
}

export async function fetchSongsByCategory(categoryId: string): Promise<Song[]> {
  const snapshot = await getDocs(
    query(collection(db, "songs"), where("categoryId", "==", categoryId))
  );
  return snapshot.docs.map((docSnap) => mapSongDoc(docSnap.id, docSnap.data()));
}

export async function fetchAllSongsOnce(): Promise<Song[]> {
  const snapshot = await getDocs(collection(db, "songs"));
  return snapshot.docs.map((docSnap) => mapSongDoc(docSnap.id, docSnap.data()));
}

/**
 * Resolves a song's `audioPath` to a playable data: URI. Fetches the
 * base64 payload from Realtime Database lazily — only when a song is
 * actually about to play, not when listing/browsing songs.
 */
export async function fetchSongAudio(audioPath: string): Promise<string> {
  const snapshot = await get(dbRef(rtdb, audioPath));
  const value = snapshot.val() as { data?: string; contentType?: string } | null;
  if (!value?.data) throw new Error("This song's audio file is missing.");
  return `data:${value.contentType || "audio/mpeg"};base64,${value.data}`;
}

/** Reads an audio file's duration in seconds by loading it into a throwaway <audio> element. */
function readAudioDuration(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const audio = new Audio();
    const cleanup = () => URL.revokeObjectURL(objectUrl);
    audio.addEventListener("loadedmetadata", () => {
      const duration = Number.isFinite(audio.duration) ? audio.duration : null;
      cleanup();
      resolve(duration);
    });
    audio.addEventListener("error", () => {
      cleanup();
      resolve(null);
    });
    audio.src = objectUrl;
  });
}

/** Reads a File into just its base64 payload (no "data:...;base64," prefix). */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

interface UploadSongInput {
  file: File;
  title: string;
  artist: string | null;
  categoryId: string;
  categoryName: string;
  onProgress?: (pct: number) => void;
}

export async function uploadSong({
  file,
  title,
  artist,
  categoryId,
  categoryName,
  onProgress,
}: UploadSongInput): Promise<Song> {
  const currentUser = auth.currentUser;
  if (!currentUser?.email) throw new Error("You must be signed in as an admin to upload.");

  if (!file.type.startsWith("audio/")) {
    throw new Error("File must be an audio file (MP3).");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`File is too large (max ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB).`);
  }
  const trimmedTitle = title.trim();
  if (!trimmedTitle) throw new Error("Song title cannot be empty.");
  if (!categoryId) throw new Error("A category must be selected.");

  const songRef = doc(collection(db, "songs"));
  const songId = songRef.id;
  const audioPath = `songsAudio/${songId}`;

  onProgress?.(10);
  const duration = await readAudioDuration(file);
  onProgress?.(30);
  const base64Data = await fileToBase64(file);
  onProgress?.(60);

  await dbSet(dbRef(rtdb, audioPath), { data: base64Data, contentType: file.type });
  onProgress?.(90);

  try {
    const song: Omit<Song, "createdAt"> & { createdAt: unknown } = {
      id: songId,
      title: trimmedTitle,
      artist: artist?.trim() || null,
      categoryId,
      categoryName,
      audioPath,
      duration,
      createdAt: serverTimestamp(),
      createdBy: currentUser.email,
    };
    await setDoc(songRef, song);
    onProgress?.(100);
    return { ...song, createdAt: Date.now() };
  } catch (error) {
    // Firestore write failed after the audio made it to Realtime Database
    // — clean up the orphaned entry rather than leaving it unreferenced.
    await dbRemove(dbRef(rtdb, audioPath)).catch(() => {});
    throw error;
  }
}

export async function deleteSong(songId: string, audioPath: string): Promise<void> {
  await deleteDoc(doc(db, "songs", songId));
  await dbRemove(dbRef(rtdb, audioPath)).catch(() => {
    // Entry already gone / never finished uploading — the metadata delete
    // above is what matters for the app; ignore.
  });
}
