"use client";

import { Pause, Play } from "lucide-react";
import type { Song } from "@/types/music";

interface SongRowProps {
  song: Song;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
}

export default function SongRow({ song, index, isActive, isPlaying, onPlay }: SongRowProps) {
  return (
    <li className="border-b border-white/10 last:border-b-0">
      <button
        type="button"
        onClick={() => onPlay(song)}
        aria-current={isActive ? "true" : undefined}
        className={`group grid w-full grid-cols-[2.5rem_1fr] items-center gap-3 px-2 py-3 text-left transition hover:bg-white/10 sm:grid-cols-[3rem_1fr_14rem_4rem] sm:gap-4 sm:px-3 ${
          isActive ? "bg-white/10" : ""
        }`}
      >
        <span className="flex items-center gap-2 text-xs text-white/50 tabular-nums">
          <span className="flex h-6 w-6 items-center justify-center">
            {isActive ? (
              isPlaying ? (
                <Pause size={13} className="text-amber-400" fill="currentColor" />
              ) : (
                <Play size={13} className="text-amber-400" fill="currentColor" />
              )
            ) : (
              <span className={isActive ? "text-amber-400" : ""}>
                {String(index + 1).padStart(3, "0")}
              </span>
            )}
          </span>
        </span>

        <span className="min-w-0">
          <span
            className={`block truncate text-base font-semibold leading-snug ${
              isActive ? "text-amber-400" : "text-white"
            }`}
          >
            {song.titleEnglish}
          </span>
          <span className="block truncate text-sm text-white/50">
            {song.movie} · {song.artist}
          </span>
        </span>

        <span className="hidden truncate text-sm text-white/50 sm:block sm:pl-1">
          {song.artist}
        </span>

        <span className="hidden text-sm text-white/50 tabular-nums sm:block">
          {song.year}
        </span>
      </button>
    </li>
  );
}
