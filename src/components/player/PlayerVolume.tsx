"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useRadio } from "@/hooks/useRadio";

export default function PlayerVolume() {
  const { volume, isMuted, setVolume, toggleMute } = useRadio();

  const Icon = isMuted || volume === 0 ? VolumeX : volume < 55 ? Volume1 : Volume2;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--border)]/40 hover:text-[var(--foreground)]"
      >
        <Icon size={17} />
      </button>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={isMuted ? 0 : volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        aria-label="Volume"
        className="h-1 w-14 cursor-pointer appearance-none rounded-full bg-[var(--border)] accent-[var(--accent)] sm:w-20"
        style={{
          background: `linear-gradient(to right, var(--accent) ${isMuted ? 0 : volume}%, var(--border) ${isMuted ? 0 : volume}%)`,
        }}
      />
    </div>
  );
}
