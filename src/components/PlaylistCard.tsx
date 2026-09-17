import Link from "next/link";
import { ArrowUpRight, Moon, Sparkles, Sun, Sunrise } from "lucide-react";
import type { Playlist } from "@/types/music";
import { formatRotationHours } from "@/lib/time";
import { getSongsForPlaylist } from "@/lib/catalogue";

interface PlaylistCardProps {
  playlist: Playlist;
  isOnAir?: boolean;
}

function rotationIcon(startHour: number) {
  if (startHour >= 5 && startHour < 9) return Sunrise;
  if (startHour >= 9 && startHour < 18) return Sun;
  if (startHour >= 18 && startHour < 22) return Moon;
  return Sparkles;
}

export default function PlaylistCard({ playlist, isOnAir }: PlaylistCardProps) {
  const songCount = getSongsForPlaylist(playlist).length;
  const Icon = rotationIcon(playlist.startHour);

  return (
    <Link
      href={`/playlists/${playlist.slug}`}
      className={`liquid-glass-card group relative block overflow-hidden rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-lg sm:p-6 ${
        isOnAir ? "border-emerald-500/40" : "hover:border-amber-500/40"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full border-amber-500/30">
          <Icon size={18} className="text-amber-400" />
        </span>

        {isOnAir ? (
          <span className="liquid-glass flex items-center gap-1.5 rounded-full border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            On Air
          </span>
        ) : (
          <span className="liquid-glass rounded-full px-2.5 py-1 text-xs text-white/70">
            {formatRotationHours(playlist.startHour, playlist.endHour)}
          </span>
        )}
      </div>

      <p className="mt-5 text-2xl font-semibold text-white transition group-hover:text-amber-400">
        {playlist.titleEnglish}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-white/70">{playlist.description}</p>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/50">
        <span>{songCount} songs</span>
        <span className="flex items-center gap-1 font-semibold text-white transition group-hover:text-amber-400">
          Listen
          <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
