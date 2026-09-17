"use client";

import { Radio } from "lucide-react";
import { useRadio } from "@/hooks/useRadio";
import PlayerControls from "@/components/player/PlayerControls";
import PlayerProgress from "@/components/player/PlayerProgress";
import PlayerVolume from "@/components/player/PlayerVolume";

export default function RadioPlayer() {
  const { currentSong, currentPlaylist, hasTunedIn, isLoading, playbackUnavailable } = useRadio();

  if (!hasTunedIn && !currentSong) return null;

  return (
    <div
      role="region"
      aria-label="Now playing"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--background)]/97 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 sm:px-6 sm:py-3">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--accent)] sm:flex"
              aria-hidden="true"
            >
              <Radio size={16} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--muted)] uppercase">
                {isLoading ? "Tuning in…" : "Now Playing"}
              </p>
              {currentSong ? (
                <div className="min-w-0">
                  <p className="truncate font-[family-name:var(--font-devanagari)] text-sm text-[var(--foreground)] sm:text-base">
                    {currentSong.titleHindi}
                  </p>
                  <p className="truncate text-xs text-[var(--muted)] sm:text-sm">
                    {currentSong.titleEnglish}
                    {currentPlaylist ? ` · ${currentPlaylist.titleEnglish}` : ""}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-[var(--muted)]">Nothing tuned in yet</p>
              )}
            </div>
          </div>

          <PlayerControls />

          <div className="hidden flex-1 justify-end md:flex">
            <PlayerVolume />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <PlayerProgress />
          </div>
          <div className="md:hidden">
            <PlayerVolume />
          </div>
        </div>

        {playbackUnavailable && (
          <p className="text-xs text-[var(--accent)]">
            This track isn&apos;t available yet — add a YouTube ID to hear it.
          </p>
        )}
      </div>
    </div>
  );
}
