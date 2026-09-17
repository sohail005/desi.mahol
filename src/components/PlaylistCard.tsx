import Link from "next/link";
import type { Playlist } from "@/types/music";
import { formatRotationHours } from "@/lib/time";
import { getSongsForPlaylist } from "@/lib/catalogue";

interface PlaylistCardProps {
  playlist: Playlist;
  isOnAir?: boolean;
}

export default function PlaylistCard({ playlist, isOnAir }: PlaylistCardProps) {
  const songCount = getSongsForPlaylist(playlist).length;

  return (
    <Link
      href={`/playlists/${playlist.slug}`}
      className="group block border border-[var(--border)] bg-[var(--surface)]/40 p-5 transition hover:border-[var(--accent)] hover:bg-[var(--surface)] sm:p-6"
    >
      <div className="flex items-center justify-between gap-2 text-xs text-[var(--muted)]">
        <span>{formatRotationHours(playlist.startHour, playlist.endHour)}</span>
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

      <p className="mt-4 font-[family-name:var(--font-devanagari)] text-2xl font-semibold text-[var(--foreground)] transition group-hover:text-[var(--accent)]">
        {playlist.titleHindi}
      </p>
      <p className="text-sm text-[var(--muted)]">{playlist.titleEnglish}</p>

      <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
        {playlist.description}
      </p>

      <p className="mt-4 text-xs text-[var(--muted)]">{songCount} songs</p>
    </Link>
  );
}
