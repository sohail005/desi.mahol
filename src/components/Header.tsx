"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatISTClock } from "@/lib/time";

export default function Header() {
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

  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          <span className="tabular-nums" suppressHydrationWarning>
            {time ?? "--:--"} IST
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-[var(--border)] px-2 py-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
            </span>
            online
          </span>
        </div>

        <nav className="flex items-center gap-5 text-sm sm:gap-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-devanagari)] text-base font-semibold text-[var(--foreground)] sm:text-lg"
          >
            Desi Mahol
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/playlists"
              className="group relative text-[var(--foreground)] transition hover:text-[var(--accent)]"
            >
              Playlists
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-200 group-hover:w-full" />
            </Link>
            <Link
              href="/songs"
              className="group relative text-[var(--foreground)] transition hover:text-[var(--accent)]"
            >
              Songs
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-200 group-hover:w-full" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
