"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, Share2 } from "lucide-react";
import { formatISTClock } from "@/lib/time";
import { useOnlineCount } from "@/hooks/useOnlineCount";
import SupportModal from "@/components/SupportModal";
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
        src="/images/desimaholnew.webp"
        alt="Desi Mahol — nostalgic Hindi radio"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/20 to-black/80" />

      <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6 sm:py-6">
        <div className="liquid-glass col-start-1 flex items-center gap-1.5 justify-self-start rounded-full px-3 py-1.5 text-xs text-white">
          <span className="flex items-center gap-1.5 pl-1.5 font-semibold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
            </span>
            <span className="tabular-nums">{onlineCount ?? "…"}</span> online
          </span>
        </div>

        <nav className="col-start-4 flex flex-wrap items-center justify-center gap-2 justify-self-center text-sm">
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
          <button
            type="button"
            onClick={() => setIsSupportOpen(true)}
            className="liquid-glass liquid-glass-accent inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-semibold text-white transition"
          >
            <Heart size={13} className="fill-current text-red-500" />
            Support us
          </button>
        </nav>
      </div>

      <div className="relative z-10 mt-12 flex flex-1 flex-col px-4 text-center sm:mt-30 sm:px-6">
        <p className="font-[family-name:var(--font-devanagari)] text-5xl leading-none font-bold text-white drop-shadow-lg sm:text-8xl">
          Desi Mahol
        </p>
        <p className="mt-4 text-xs tracking-[0.3em] text-white/80 uppercase sm:text-sm">
          Old songs · pure desi vibes · playing all day
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 px-4 pb-28 sm:pb-32">
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

      {isSupportOpen && <SupportModal onClose={() => setIsSupportOpen(false)} />}
    </section>
  );
}
