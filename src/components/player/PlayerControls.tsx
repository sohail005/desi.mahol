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
        className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <SkipBack size={16} fill="currentColor" />
      </button>

      <button
        type="button"
        onClick={togglePlay}
        disabled={disabled}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="liquid-glass liquid-glass-accent flex h-10 w-10 items-center justify-center rounded-full text-white disabled:opacity-40"
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : isPlaying ? (
          <Pause size={18} fill="currentColor" />
        ) : (
          <Play size={18} fill="currentColor" className="ml-0.5" />
        )}
      </button>

      <button
        type="button"
        onClick={next}
        disabled={disabled}
        aria-label="Next song"
        className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <SkipForward size={16} fill="currentColor" />
      </button>
    </div>
  );
}
