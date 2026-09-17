"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useRadio } from "@/hooks/useRadio";

export default function PlayerControls() {
  const { isPlaying, isLoading, currentSong, togglePlay, next, previous } = useRadio();

  const disabled = !currentSong;

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        type="button"
        onClick={previous}
        disabled={disabled}
        aria-label="Previous song"
        className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--foreground)] transition hover:bg-[var(--border)]/40 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <SkipBack size={18} fill="currentColor" />
      </button>

      <button
        type="button"
        onClick={togglePlay}
        disabled={disabled}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--accent-dark)] bg-[var(--accent)] text-[var(--background)] shadow-sm transition hover:bg-[var(--accent-dark)] disabled:opacity-40 disabled:hover:bg-[var(--accent)]"
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--background)] border-t-transparent" />
        ) : isPlaying ? (
          <Pause size={20} fill="currentColor" />
        ) : (
          <Play size={20} fill="currentColor" className="ml-0.5" />
        )}
      </button>

      <button
        type="button"
        onClick={next}
        disabled={disabled}
        aria-label="Next song"
        className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--foreground)] transition hover:bg-[var(--border)]/40 disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <SkipForward size={18} fill="currentColor" />
      </button>
    </div>
  );
}
