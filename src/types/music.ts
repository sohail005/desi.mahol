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
  storagePath: string;
  audioUrl: string;
  duration: number | null;
  createdAt: number; // epoch ms
  createdBy: string;
}
