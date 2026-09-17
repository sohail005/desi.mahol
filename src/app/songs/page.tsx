import type { Metadata } from "next";
import { songs } from "@/data/songs";
import SongList from "@/components/SongList";

export const metadata: Metadata = {
  title: "All Songs | Desi Mahol",
  description: "Browse the full Desi Mahol record collection — timeless Hindi songs, searchable by title, movie, artist or year.",
};

export default function SongsPage() {
  return (
    <div className="min-h-[70vh] bg-[#1c0704] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 border-b border-white/10 pb-6">
          <p className="font-[family-name:var(--font-devanagari)] text-3xl font-semibold text-white sm:text-4xl">
            सारे गाने
          </p>
          <p className="mt-1 text-sm text-white/50">All Songs</p>
          <p className="mt-3 text-xs text-white/40">{songs.length} records</p>
        </div>

        <SongList songs={songs} showSearch emptyMessage="No songs have been added yet." />
      </div>
    </div>
  );
}
