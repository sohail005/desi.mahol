import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { playlists } from "@/data/playlists";
import { getPlaylistBySlug, getSongsForPlaylist } from "@/lib/catalogue";
import { formatRotationHours } from "@/lib/time";
import SongList from "@/components/SongList";
import PlayRotationButton from "./PlayRotationButton";

export function generateStaticParams() {
  return playlists.map((playlist) => ({ slug: playlist.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const playlist = getPlaylistBySlug(slug);
  if (!playlist) {
    return { title: "Playlist Not Found | Desi Mahol" };
  }
  return {
    title: `${playlist.titleEnglish} | Desi Mahol`,
    description: playlist.description,
  };
}

export default async function PlaylistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playlist = getPlaylistBySlug(slug);

  if (!playlist) {
    notFound();
  }

  const songs = getSongsForPlaylist(playlist);

  return (
    <div className="min-h-[70vh] bg-[#1c0704] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <p className="text-xs text-white/50">
            {formatRotationHours(playlist.startHour, playlist.endHour)} · {songs.length} songs
          </p>
          <p className="mt-2 font-[family-name:var(--font-devanagari)] text-3xl font-semibold text-white sm:text-4xl">
            {playlist.titleHindi}
          </p>
          <p className="mt-1 text-lg text-white/50">{playlist.titleEnglish}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
            {playlist.description}
          </p>

          <div className="mt-6">
            <PlayRotationButton playlist={playlist} />
          </div>
        </div>

        <SongList
          songs={songs}
          playlistSlug={playlist.slug}
          emptyMessage="This rotation is currently empty."
        />
      </div>
    </div>
  );
}
