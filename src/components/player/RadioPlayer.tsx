"use client";

import { Radio } from "lucide-react";
import { useRadio } from "@/hooks/useRadio";
import { isPlaceholderYoutubeId } from "@/lib/youtube";
import PlayerControls from "@/components/player/PlayerControls";
import PlayerProgress from "@/components/player/PlayerProgress";
import PlayerVolume from "@/components/player/PlayerVolume";

export default function RadioPlayer() {
  const { currentSong, isPlaying, hasTunedIn, isLoading, playbackUnavailable, tuneIn } =
    useRadio();

  if (!hasTunedIn && !currentSong) {
    return (
      <div className="absolute inset-x-3 top-1/2 z-20 -translate-y-1/2 sm:inset-x-6">
        <button
          type="button"
          onClick={tuneIn}
          className="mx-auto flex max-w-2xl w-full items-center justify-center gap-2 rounded-2xl bg-black/70 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/80"
        >
          <Radio size={16} className="text-[var(--accent)]" />
          Tap to Tune In
        </button>
      </div>
    );
  }

  const hasThumbnail = currentSong && !isPlaceholderYoutubeId(currentSong.youtubeId);

  return (
    <div
      role="region"
      aria-label="Now playing"
      className="absolute inset-x-3 top-1/2 z-20 -translate-y-1/2 sm:inset-x-6"
    >
      <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-2xl bg-black/70 px-4 py-2.5 shadow-lg backdrop-blur-md sm:gap-4 sm:px-5 sm:py-3">
        <span
          className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/15 sm:h-12 sm:w-12 ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
          aria-hidden="true"
        >
          {hasThumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://i.ytimg.com/vi/${currentSong!.youtubeId}/default.jpg`}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-white/5 text-[var(--accent)]">
              <Radio size={16} />
            </span>
          )}
        </span>

        <div className="min-w-0 flex-1">
          {currentSong ? (
            <>
              <p className="truncate text-sm font-semibold text-white sm:text-base">
                {currentSong.titleEnglish}
              </p>
              <p className="truncate text-xs text-white/50">
                {isLoading ? "Tuning in…" : `Credits: ${currentSong.artist}`}
              </p>
              <div className="mt-1">
                <PlayerProgress />
              </div>
            </>
          ) : (
            <p className="text-sm text-white/60">Nothing tuned in yet</p>
          )}
        </div>

        <PlayerControls />

        <div className="hidden sm:block">
          <PlayerVolume />
        </div>
      </div>

      {playbackUnavailable && (
        <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-amber-400">
          This track isn&apos;t available yet — add a YouTube ID to hear it.
        </p>
      )}
    </div>
  );
}
