"use client";

import Link from "next/link";
import { ListMusic } from "lucide-react";
import { playlists } from "@/data/playlists";
import { useCurrentRotation } from "@/hooks/useCurrentRotation";
import { formatRotationHours } from "@/lib/time";
import PlaylistCard from "@/components/PlaylistCard";

export default function RotationSection() {
  const onAir = useCurrentRotation();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 border-b border-[var(--border)] pb-6 sm:mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-[var(--green)] uppercase">
          On Air Now
        </p>
        <p className="mt-2 font-[family-name:var(--font-devanagari)] text-3xl font-semibold text-[var(--foreground)]">
          {onAir.titleHindi}
        </p>
        <p className="text-sm text-[var(--muted)]">
          {onAir.titleEnglish} · {formatRotationHours(onAir.startHour, onAir.endHour)}
        </p>
      </div>

      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="font-[family-name:var(--font-devanagari)] text-2xl font-semibold text-[var(--foreground)]">
            रोटेशन
          </p>
          <p className="text-sm text-[var(--muted)]">Rotations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            isOnAir={playlist.slug === onAir.slug}
          />
        ))}

        <Link
          href="/songs"
          className="group flex flex-col justify-between border border-dashed border-[var(--border)] bg-transparent p-5 transition hover:border-[var(--accent)] sm:p-6"
        >
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <ListMusic size={14} />
            <span>Full catalogue</span>
          </div>
          <div className="mt-4">
            <p className="font-[family-name:var(--font-devanagari)] text-2xl font-semibold text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
              सारे गाने
            </p>
            <p className="text-sm text-[var(--muted)]">All Songs</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
            Browse the entire Desi Mahol record collection and play anything, any time.
          </p>
        </Link>
      </div>
    </section>
  );
}
