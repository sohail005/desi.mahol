import { songs } from "@/data/songs";
import { playlists } from "@/data/playlists";
import type { Song, Playlist } from "@/types/music";

export function getSongById(id: string): Song | undefined {
  return songs.find((song) => song.id === id);
}

export function getPlaylistBySlug(slug: string): Playlist | undefined {
  return playlists.find((playlist) => playlist.slug === slug);
}

export function getSongsForPlaylist(playlist: Playlist): Song[] {
  return playlist.songIds
    .map((id) => getSongById(id))
    .filter((song): song is Song => Boolean(song));
}

export function searchSongs(query: string): Song[] {
  const q = query.trim().toLowerCase();
  if (!q) return songs;
  return songs.filter((song) =>
    [song.titleEnglish, song.titleHindi, song.movie, song.artist, String(song.year)]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
