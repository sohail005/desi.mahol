"use client";

import { Play, Pause } from "lucide-react";
import { useRadio } from "@/hooks/useRadio";
import type { Playlist } from "@/types/music";

export default function PlayRotationButton({ playlist }: { playlist: Playlist }) {
  const { currentPlaylist, isPlaying, playPlaylist, togglePlay } = useRadio();

  const isThisPlaying = currentPlaylist?.slug === playlist.slug && isPlaying;

  function handleClick() {
    if (currentPlaylist?.slug === playlist.slug) {
      togglePlay();
    } else {
      playPlaylist(playlist);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-dark)] bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold tracking-wide text-white uppercase shadow-sm transition hover:bg-[var(--accent-dark)]"
    >
      {isThisPlaying ? (
        <Pause size={15} fill="currentColor" />
      ) : (
        <Play size={15} fill="currentColor" />
      )}
      Play Rotation
    </button>
  );
}
