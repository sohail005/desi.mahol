"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Song } from "@/types/music";
import { useRadio } from "@/hooks/useRadio";
import SongRow from "@/components/SongRow";

interface SongListProps {
  songs: Song[];
  playlistSlug?: string | null;
  showSearch?: boolean;
  emptyMessage?: string;
}

function matchesQuery(song: Song, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [song.titleEnglish, song.titleHindi, song.movie, song.artist, String(song.year)]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export default function SongList({
  songs,
  playlistSlug = null,
  showSearch = false,
  emptyMessage = "No songs have been added yet.",
}: SongListProps) {
  const [query, setQuery] = useState("");
  const { currentSong, isPlaying, playSong } = useRadio();

  const filtered = useMemo(
    () => songs.filter((song) => matchesQuery(song, query)),
    [songs, query]
  );

  function handlePlay(song: Song) {
    playSong(song, { queue: songs, playlistSlug });
  }

  return (
    <div>
      {showSearch && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <Search size={16} className="text-white/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs..."
            aria-label="Search songs"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>
      )}

      {songs.length === 0 ? (
        <p className="py-10 text-center text-sm text-white/50">{emptyMessage}</p>
      ) : filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-white/50">
          No songs match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <ul className="rounded-xl border border-white/10 bg-white/5">
          {filtered.map((song, index) => (
            <SongRow
              key={song.id}
              song={song}
              index={index}
              isActive={currentSong?.id === song.id}
              isPlaying={isPlaying && currentSong?.id === song.id}
              onPlay={handlePlay}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
