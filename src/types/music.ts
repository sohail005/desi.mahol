export interface Song {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  movie: string;
  artist: string;
  year: number;
  youtubeId: string;
  duration?: number;
  thumbnail?: string;
  audioSrc?: string;
}

export interface Playlist {
  id: string;
  slug: string;
  titleHindi: string;
  titleEnglish: string;
  description: string;
  startHour: number;
  endHour: number;
  songIds: string[];
}

export interface PlaybackQueueItem {
  song: Song;
  playlistSlug: string | null;
}
