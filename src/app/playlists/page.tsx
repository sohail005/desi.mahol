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
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 border-b border-[var(--border)] pb-6">
        <p className="font-[family-name:var(--font-devanagari)] text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
          रोटेशन
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">Playlists</p>
      </div>

      <ul className="divide-y divide-[var(--border)]">
        {playlists.map((playlist) => {
          const songCount = getSongsForPlaylist(playlist).length;
          const isOnAir = playlist.slug === onAir.slug;
          return (
            <li key={playlist.id}>
              <Link
                href={`/playlists/${playlist.slug}`}
                className="group flex flex-col gap-2 py-6 transition hover:opacity-80"
              >
                <div className="flex items-center justify-between gap-2 text-xs text-[var(--muted)]">
                  <span>
                    {songCount} songs · {formatRotationHours(playlist.startHour, playlist.endHour)}
                  </span>
                  {isOnAir && (
                    <span className="flex items-center gap-1.5 font-semibold text-[var(--green)]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
                      </span>
                      On Air
                    </span>
                  )}
                </div>
                <p className="font-[family-name:var(--font-devanagari)] text-2xl font-semibold text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
                  {playlist.titleHindi}
                </p>
                <p className="text-sm text-[var(--muted)]">{playlist.titleEnglish}</p>
                <p className="text-sm leading-relaxed text-[var(--foreground)]">
                  {playlist.description}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
