export interface Category {
  id: string; // slugified name, e.g. "happy" — also the Firestore doc ID
  name: string; // display name, e.g. "Happy"
  createdAt: number; // epoch ms
}

export interface Song {
  id: string;
  title: string;
  artist: string | null;
  categoryId: string;
  categoryName: string;
  /** Realtime Database path holding the base64-encoded audio (see src/lib/firebase/songs.ts). */
  audioPath: string;
  duration: number | null;
  createdAt: number; // epoch ms
  createdBy: string;
}
