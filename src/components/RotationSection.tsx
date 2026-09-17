"use client";

import Link from "next/link";
import { ArrowUpRight, ListMusic, Radio } from "lucide-react";
import { playlists } from "@/data/playlists";
import { useCurrentRotation } from "@/hooks/useCurrentRotation";
import { formatRotationHours } from "@/lib/time";
import PlaylistCard from "@/components/PlaylistCard";

export default function RotationSection() {
  const onAir = useCurrentRotation();

  return (
    <section className="relative bg-[#1c0704] px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/playlists/${onAir.slug}`}
          className="group flex flex-col gap-4 rounded-2xl border border-emerald-500/30 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <Radio size={20} />
            </span>
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-emerald-400 uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                On Air Now
              </p>
              <p className="mt-1 font-[family-name:var(--font-devanagari)] text-2xl font-semibold text-white sm:text-3xl">
                {onAir.titleHindi}
              </p>
              <p className="text-sm text-white/50">
                {onAir.titleEnglish} · {formatRotationHours(onAir.startHour, onAir.endHour)}
              </p>
            </div>
          </div>

          <span className="flex items-center gap-1 self-start text-sm font-semibold text-white transition group-hover:text-amber-400 sm:self-center">
            Listen now
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>

        <div className="mt-14 mb-6 flex items-end justify-between sm:mt-16">
          <div>
            <p className="font-[family-name:var(--font-devanagari)] text-2xl font-semibold text-white">
              रोटेशन
            </p>
            <p className="text-sm text-white/50">The day&apos;s rotations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              isOnAir={playlist.slug === onAir.slug}
            />
          ))}

          <Link
            href="/songs"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-white/15 bg-transparent p-5 transition hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-lg sm:p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/15">
              <ListMusic size={18} className="text-amber-400" />
            </span>

            <div className="mt-5">
              <p className="font-[family-name:var(--font-devanagari)] text-2xl font-semibold text-white transition group-hover:text-amber-400">
                सारे गाने
              </p>
              <p className="text-sm text-white/50">All Songs</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Browse the entire Desi Mahol record collection and play anything, any time.
            </p>

            <div className="mt-5 flex items-center justify-end border-t border-white/10 pt-4 text-xs">
              <span className="flex items-center gap-1 font-semibold text-white transition group-hover:text-amber-400">
                Browse
                <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
