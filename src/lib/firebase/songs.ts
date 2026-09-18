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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  type UploadTaskSnapshot,
} from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase/config";
import type { Category, Song } from "@/types/music";

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

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
    storagePath: String(data.storagePath ?? ""),
    audioUrl: String(data.audioUrl ?? ""),
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
    throw new Error("File is too large (max 15MB).");
  }
  const trimmedTitle = title.trim();
  if (!trimmedTitle) throw new Error("Song title cannot be empty.");
  if (!categoryId) throw new Error("A category must be selected.");

  const songRef = doc(collection(db, "songs"));
  const songId = songRef.id;
  const storagePath = `songs/${categoryId}/${songId}.mp3`;
  const storageRef = ref(storage, storagePath);

  const duration = await readAudioDuration(file);

  const uploadTask = uploadBytesResumable(storageRef, file, { contentType: file.type });

  await new Promise<void>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        if (onProgress && snapshot.totalBytes > 0) {
          onProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        }
      },
      reject,
      () => resolve()
    );
  });

  try {
    const audioUrl = await getDownloadURL(uploadTask.snapshot.ref);
    const song: Omit<Song, "createdAt"> & { createdAt: unknown } = {
      id: songId,
      title: trimmedTitle,
      artist: artist?.trim() || null,
      categoryId,
      categoryName,
      storagePath,
      audioUrl,
      duration,
      createdAt: serverTimestamp(),
      createdBy: currentUser.email,
    };
    await setDoc(songRef, song);
    return { ...song, createdAt: Date.now() };
  } catch (error) {
    // Firestore write failed after the file made it to Storage — clean up
    // the orphaned file rather than leaving unreferenced storage around.
    await deleteObject(storageRef).catch(() => {});
    throw error;
  }
}

export async function deleteSong(songId: string, storagePath: string): Promise<void> {
  await deleteDoc(doc(db, "songs", songId));
  await deleteObject(ref(storage, storagePath)).catch(() => {
    // File already gone / never finished uploading — the metadata delete
    // above is what matters for the app; ignore.
  });
}
