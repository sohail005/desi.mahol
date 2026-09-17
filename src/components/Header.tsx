"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { formatISTClock } from "@/lib/time";
import { useOnlineCount } from "@/hooks/useOnlineCount";
import InstallAppButton from "@/components/InstallAppButton";

export default function Header() {
  const pathname = usePathname();
  const [time, setTime] = useState<string | null>(null);
  const onlineCount = useOnlineCount();

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

  if (pathname === "/") return null;

  return (
    <header className="border-b border-white/10 bg-[#1c0704]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span className="tabular-nums" suppressHydrationWarning>
            {time ?? "--:--"} IST
          </span>
          <span className="liquid-glass flex items-center gap-1.5 rounded-full px-2 py-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {onlineCount ?? "…"} online
          </span>
        </div>

        <nav className="flex items-center gap-5 text-sm sm:gap-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-devanagari)] text-base font-semibold text-white sm:text-lg"
          >
            Desi Mahol
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/playlists" className="group relative text-white/80 transition hover:text-amber-400">
              Playlists
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-400 transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link href="/songs" className="group relative text-white/80 transition hover:text-amber-400">
              Songs
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-400 transition-all duration-200 group-hover:w-full" />
            </Link>
            <InstallAppButton
              iconSize={14}
              className="liquid-glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
