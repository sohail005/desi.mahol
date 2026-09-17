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
    <li className="border-b border-[var(--border)] last:border-b-0">
      <button
        type="button"
        onClick={() => onPlay(song)}
        aria-current={isActive ? "true" : undefined}
        className={`group grid w-full grid-cols-[2.5rem_1fr] items-center gap-3 py-3 text-left transition hover:bg-[var(--surface)]/60 sm:grid-cols-[3rem_1fr_14rem_4rem] sm:gap-4 sm:px-3 ${
          isActive ? "bg-[var(--surface)]/70" : ""
        }`}
      >
        <span className="flex items-center gap-2 text-xs text-[var(--muted)] tabular-nums">
          <span className="flex h-6 w-6 items-center justify-center">
            {isActive ? (
              isPlaying ? (
                <Pause size={13} className="text-[var(--accent)]" fill="currentColor" />
              ) : (
                <Play size={13} className="text-[var(--accent)]" fill="currentColor" />
              )
            ) : (
              <span className={isActive ? "text-[var(--accent)]" : ""}>
                {String(index + 1).padStart(3, "0")}
              </span>
            )}
          </span>
        </span>

        <span className="min-w-0">
          <span
            className={`block font-[family-name:var(--font-devanagari)] text-base leading-snug ${
              isActive ? "text-[var(--accent)]" : "text-[var(--foreground)]"
            }`}
          >
            {song.titleHindi}
          </span>
          <span className="block truncate text-sm text-[var(--muted)]">
            {song.titleEnglish} · {song.movie}
          </span>
        </span>

        <span className="col-span-2 mt-1 truncate text-sm text-[var(--muted)] sm:col-span-1 sm:mt-0 sm:pl-1">
          {song.artist}
        </span>

        <span className="hidden text-sm text-[var(--muted)] tabular-nums sm:block">
          {song.year}
        </span>
      </button>
    </li>
  );
}
