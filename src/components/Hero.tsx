"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, Menu, Share2, X } from "lucide-react";
import { formatISTClock } from "@/lib/time";
import { useOnlineCount } from "@/hooks/useOnlineCount";
import SupportModal from "@/components/SupportModal";
import InstallAppButton from "@/components/InstallAppButton";
import RadioPlayer from "@/components/player/RadioPlayer";

const GLASS_LINK =
  "liquid-glass inline-flex font-semibold items-center rounded-full px-4 py-1.5 text-white transition";

function useClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      setTime(formatISTClock());
    }
    const timeout = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000 * 15);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  return time;
}

export default function Hero() {
  const time = useClock();
  const onlineCount = useOnlineCount();
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleShare() {
    const shareData = {
      title: "Desi Mahol",
      text: "Desi Mahol — old Hindi songs, playing all day.",
      url: typeof window !== "undefined" ? window.location.origin : undefined,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled the share sheet — nothing to do
      }
    } else if (typeof navigator !== "undefined" && shareData.url) {
      await navigator.clipboard.writeText(shareData.url);
    }
  }

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <Image
        src="/images/desimahol3.webp"
        alt="Desi Mahol — nostalgic Hindi radio"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/20 to-black/80" />

      <div className="relative z-30 flex items-center justify-between gap-3 px-4 py-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:px-6 sm:py-6">
        <div className="liquid-glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white sm:col-start-1 sm:justify-self-start">
          <span className="flex items-center gap-1.5 pl-1.5 font-semibold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
            </span>
            <span className="tabular-nums">{onlineCount ?? "…"}</span> online
          </span>
        </div>

        <nav className="hidden flex-wrap items-center justify-center gap-2 text-sm sm:col-start-2 sm:flex sm:justify-self-center">
          <a href="#about" className={GLASS_LINK}>
            About
          </a>
          <a href="#faq" className={GLASS_LINK}>
            FAQ
          </a>
          <Link href="/playlists" className={GLASS_LINK}>
            Playlists
          </Link>
          <Link href="/songs" className={GLASS_LINK}>
            Songs
          </Link>
          <InstallAppButton className={`${GLASS_LINK} gap-1.5`} />
          <button
            type="button"
            onClick={() => setIsSupportOpen(true)}
            className="liquid-glass liquid-glass-accent inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-semibold text-white transition"
          >
            <Heart size={13} className="fill-current text-red-500" />
            Support us
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-white sm:hidden"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 z-20 sm:hidden"
          />
          <div className="liquid-glass absolute inset-x-4 top-20 z-30 flex flex-col gap-1 rounded-2xl p-2 text-sm sm:hidden">
            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 font-semibold text-white transition hover:bg-white/10"
            >
              About
            </a>
            <a
              href="#faq"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 font-semibold text-white transition hover:bg-white/10"
            >
              FAQ
            </a>
            <Link
              href="/playlists"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 font-semibold text-white transition hover:bg-white/10"
            >
              Playlists
            </Link>
            <Link
              href="/songs"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 font-semibold text-white transition hover:bg-white/10"
            >
              Songs
            </Link>
            <InstallAppButton
              onInstall={() => setIsMenuOpen(false)}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-left font-semibold text-white transition hover:bg-white/10"
            />
            <button
              type="button"
              onClick={() => {
                setIsSupportOpen(true);
                setIsMenuOpen(false);
              }}
              className="liquid-glass-accent mt-1 flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 font-semibold text-white"
            >
              <Heart size={13} className="fill-current text-red-500" />
              Support us
            </button>
          </div>
        </>
      )}

      <div className="relative z-10 mt-8 flex flex-1 flex-col px-4 text-center sm:mt-30 sm:px-6">
        <p className="font-[family-name:var(--font-devanagari)] text-4xl leading-none font-bold text-white drop-shadow-lg sm:text-8xl">
          Desi Mahol
        </p>
        <p className="mt-4 text-xs tracking-[0.2em] text-white/80 uppercase sm:tracking-[0.3em] sm:text-sm">
          Old songs · pure desi vibes · playing all day
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 px-4 pb-40 sm:pb-32">
        <button
          type="button"
          onClick={handleShare}
          className="liquid-glass flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/95"
        >
          <Share2 size={13} />
          Share
        </button>

        <span className="hidden flex-col items-center gap-1 text-[10px] tracking-[0.3em] text-white/60 uppercase sm:flex">
          Scroll
          <ChevronDown size={14} className="animate-bounce" />
        </span>
      </div>

      <RadioPlayer />

      {isSupportOpen && (
        <SupportModal onClose={() => setIsSupportOpen(false)} />
      )}
    </section>
  );
}
