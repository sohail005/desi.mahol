import type { Metadata } from "next";
import Link from "next/link";
import { playlists } from "@/data/playlists";
import { getSongsForPlaylist } from "@/lib/catalogue";
import { getCurrentRotation } from "@/lib/rotation";
import { formatRotationHours } from "@/lib/time";

export const metadata: Metadata = {
  title: "Playlists | Desi Mahol",
  description: "Every Desi Mahol rotation — Highway Raat, Saloon Classics, 90s Dard and Shaadi & Sunday.",
};

export default function PlaylistsPage() {
  const onAir = getCurrentRotation();

  return (
    <div className="min-h-[70vh] bg-[#1c0704] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 border-b border-white/10 pb-6">
          <p className="font-[family-name:var(--font-devanagari)] text-3xl font-semibold text-white sm:text-4xl">
            रोटेशन
          </p>
          <p className="mt-1 text-sm text-white/50">Playlists</p>
        </div>

        <ul className="space-y-3">
          {playlists.map((playlist) => {
            const songCount = getSongsForPlaylist(playlist).length;
            const isOnAir = playlist.slug === onAir.slug;
            return (
              <li key={playlist.id}>
                <Link
                  href={`/playlists/${playlist.slug}`}
                  className={`group flex flex-col gap-2 rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-lg sm:p-6 ${
                    isOnAir ? "border-emerald-500/40 bg-white/5" : "border-white/10 bg-white/5 hover:border-amber-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-white/50">
                    <span>
                      {songCount} songs · {formatRotationHours(playlist.startHour, playlist.endHour)}
                    </span>
                    {isOnAir && (
                      <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        On Air
                      </span>
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-devanagari)] text-2xl font-semibold text-white transition group-hover:text-amber-400">
                    {playlist.titleHindi}
                  </p>
                  <p className="text-sm text-white/50">{playlist.titleEnglish}</p>
                  <p className="text-sm leading-relaxed text-white/70">{playlist.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
