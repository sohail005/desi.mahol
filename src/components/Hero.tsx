"use client";

import { Disc3, Radio as RadioIcon } from "lucide-react";
import { useRadio } from "@/hooks/useRadio";

/**
 * Hero artwork placeholder.
 *
 * Replace this component's contents with:
 *
 *   import Image from "next/image";
 *   <Image
 *     src="/images/desi-mahol-hero.webp"
 *     alt="A nostalgic hand-painted Indian street scene"
 *     width={1600}
 *     height={1000}
 *     priority
 *     className="h-full w-full object-cover"
 *   />
 *
 * once a real, rights-cleared illustration is placed at
 * public/images/desi-mahol-hero.webp. Recommended: a warm, hand-painted
 * style scene — an old radio/cassette shop, a tea stall, a rickshaw and
 * painted signboards, evoking 90s Bollywood nostalgia. Do not use
 * copyrighted or trademarked artwork.
 */
function HeroArtPlaceholder() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-[var(--border)] bg-gradient-to-b from-[#d9c3a3] via-[#c99b7c] to-[#8e2f25]/70 sm:aspect-[21/9]">
      <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(32,26,23,0.5)_3px)]" />
      <div className="absolute left-1/2 top-1/2 h-[70%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--foreground)]/15">
        <div className="absolute inset-[12%] rounded-full border border-[var(--foreground)]/15" />
        <div className="absolute inset-[24%] rounded-full border border-[var(--foreground)]/15" />
        <div className="absolute inset-[36%] rounded-full border border-[var(--foreground)]/20" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center gap-6 sm:gap-10">
        <Disc3
          className="h-10 w-10 text-[var(--background)]/70 sm:h-14 sm:w-14"
          strokeWidth={1.25}
        />
        <RadioIcon
          className="h-14 w-14 text-[var(--background)] sm:h-20 sm:w-20"
          strokeWidth={1}
        />
        <Disc3
          className="h-10 w-10 text-[var(--background)]/70 sm:h-14 sm:w-14"
          strokeWidth={1.25}
        />
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[var(--background)]/70 sm:bottom-4 sm:left-4 sm:right-4">
        <span>On Air</span>
        <span>90s · Hindi · Radio</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { hasTunedIn, tuneIn, play, isPlaying } = useRadio();

  function handleTuneIn() {
    if (hasTunedIn) {
      if (!isPlaying) play();
    } else {
      tuneIn();
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
      <div className="text-center">
        <p className="font-[family-name:var(--font-devanagari)] text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
          देसी माहौल
        </p>
        <p className="mt-2 text-sm tracking-[0.25em] text-[var(--muted)] uppercase">
          Desi Mahol · playing all day
        </p>
      </div>

      <div className="mt-8 sm:mt-10">
        <HeroArtPlaceholder />
      </div>

      <div className="mx-auto mt-10 max-w-2xl text-center">
        <h1 className="font-[family-name:var(--font-devanagari)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
          पुराने गाने, पूरा देसी माहौल
        </h1>
        <p className="mt-2 text-base text-[var(--foreground)] sm:text-lg">
          Old songs. Pure desi vibes.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Timeless Hindi songs, playing all day.
        </p>

        <button
          type="button"
          onClick={handleTuneIn}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--accent-dark)] bg-[var(--accent)] px-8 py-3 text-sm font-semibold tracking-wide text-[var(--background)] uppercase shadow-sm transition hover:bg-[var(--accent-dark)]"
        >
          <RadioIcon size={16} />
          Tune In
        </button>
      </div>
    </section>
  );
}
