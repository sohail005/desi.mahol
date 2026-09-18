"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Heart, Menu, X } from "lucide-react";
import { formatISTClock } from "@/lib/time";
import { useOnlineCount } from "@/hooks/useOnlineCount";
import SupportModal from "@/components/SupportModal";
import InstallAppButton from "@/components/InstallAppButton";
import ThemeSelector from "@/components/ThemeSelector";
import PlaylistSelector from "@/components/PlaylistSelector";
import RadioPlayer from "@/components/player/RadioPlayer";
import type { Theme } from "@/data/themes";

const DEFAULT_OVERLAY = "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)";
const DEFAULT_DESKTOP_IMAGE = "/images/desimahol3.webp";
const DEFAULT_MOBILE_IMAGE = "/images/desimaholnew.webp";

// Hidden below sm — for nav items tucked into the mobile hamburger menu
// instead of sitting in the always-visible top bar.
const GLASS_LINK_DESKTOP_ONLY =
  "liquid-glass hidden sm:inline-flex font-semibold items-center rounded-full px-4 py-1.5 text-white transition";

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
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <Image
        src={activeTheme?.imageDesktop ?? DEFAULT_DESKTOP_IMAGE}
        alt="Desi Mahol — nostalgic Hindi radio"
        fill
        priority
        className="hidden object-cover sm:block"
      />
      <Image
        src={activeTheme?.imageMobile ?? DEFAULT_MOBILE_IMAGE}
        alt="Desi Mahol — nostalgic Hindi radio"
        fill
        priority
        className="object-cover sm:hidden"
      />
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{ background: activeTheme?.overlay ?? DEFAULT_OVERLAY }}
      />

      <div className="relative z-30 grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-6">
        <div className="liquid-glass col-start-1 flex items-center gap-1.5 justify-self-start rounded-full px-3 py-1.5 text-sm text-white">
          <span className="flex items-center gap-1.5 pl-1.5 font-semibold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
            </span>
            <span className="tabular-nums">{onlineCount ?? "…"}</span> online
          </span>
        </div>

        <nav className="col-start-2 flex flex-wrap items-center justify-center gap-2 justify-self-center text-sm">
          <a href="#about" className={GLASS_LINK_DESKTOP_ONLY}>
            About
          </a>
          <a href="#faq" className={GLASS_LINK_DESKTOP_ONLY}>
            FAQ
          </a>
          <InstallAppButton className={`${GLASS_LINK_DESKTOP_ONLY} gap-1.5`} />
          {/* <PlaylistSelector /> */}
          <ThemeSelector activeThemeId={activeTheme?.id ?? null} onThemeChange={setActiveTheme} />
          <button
            type="button"
            onClick={() => setIsSupportOpen(true)}
            className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-semibold text-white transition"
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
          className="liquid-glass col-start-3 flex h-9 w-9 items-center justify-center justify-self-end rounded-full text-white sm:hidden"
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
            <InstallAppButton
              onInstall={() => setIsMenuOpen(false)}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-left font-semibold text-white transition hover:bg-white/10"
            />
          </div>
        </>
      )}

      <div className="relative z-10 mt-8 flex flex-1 flex-col px-4 text-center sm:mt-30 sm:px-6">
        <p className="font-devanagari text-4xl leading-none font-bold text-white drop-shadow-lg sm:text-8xl">
          Desi Mahol
        </p>
        <p className="mt-4 text-xs tracking-[0.2em] text-white/80 uppercase sm:tracking-[0.3em] sm:text-sm">
          Old songs · pure desi vibes · playing all day
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 px-4 pb-8 sm:pb-10">
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
