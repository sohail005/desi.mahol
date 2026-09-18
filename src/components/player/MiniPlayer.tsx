"use client";

import { useRadio } from "@/hooks/useRadio";
import { useScrolledPastHero } from "@/hooks/useScrolledPastHero";
import PlayerControls from "@/components/player/PlayerControls";

/**
 * Compact "now playing" widget that takes over once the hero (and the full
 * RadioPlayer bar inside it) has scrolled out of view.
 */
export default function MiniPlayer() {
  const { currentSong, hasTunedIn, isLoading, externalPlaylistId, externalVideo } = useRadio();
  const scrolledPastHero = useScrolledPastHero();

  const hasActivePlayer = hasTunedIn || !!currentSong || !!externalPlaylistId;
  if (!hasActivePlayer || !scrolledPastHero) return null;

  const title = externalPlaylistId
    ? (externalVideo?.title ?? "Mood Radio")
    : (currentSong?.titleEnglish ?? "Nothing tuned in yet");

  return (
    <div className="liquid-glass-card fixed top-4 right-4 z-40 flex max-w-[min(90vw,20rem)] items-center gap-2 rounded-full py-1.5 pr-2 pl-4 shadow-lg">
      <p className="min-w-0 flex-1 truncate text-xs font-semibold text-white sm:text-sm">
        {isLoading ? "Tuning in…" : title}
      </p>
      <PlayerControls />
    </div>
  );
}
