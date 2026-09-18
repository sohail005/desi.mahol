"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Song, Playlist } from "@/types/music";
import { getPlaylistBySlug, getSongById, getSongsForPlaylist } from "@/lib/catalogue";
import { getCurrentRotation, getRadioStartingPosition } from "@/lib/rotation";
import { isPlaceholderYoutubeId } from "@/lib/youtube";
import YouTubePlayer, { type YouTubePlayerHandle } from "@/components/player/YouTubePlayer";

const STORAGE_KEYS = {
  song: "desi-mahol.current-song",
  playlist: "desi-mahol.current-playlist",
  volume: "desi-mahol.volume",
  tunedIn: "desi-mahol.has-tuned-in",
} as const;

const DEFAULT_VOLUME = 80;

interface PlaySongOptions {
  queue?: Song[];
  playlistSlug?: string | null;
}

export interface ExternalVideoInfo {
  videoId: string;
  title: string;
  author: string;
}

export interface PlayerContextValue {
  currentSong: Song | null;
  currentPlaylist: Playlist | null;
  isPlaying: boolean;
  isLoading: boolean;
  isReady: boolean;
  hasTunedIn: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  queue: Song[];
  playbackUnavailable: boolean;
  externalPlaylistId: string | null;
  externalVideo: ExternalVideoInfo | null;

  tuneIn: () => void;
  playSong: (song: Song, options?: PlaySongOptions) => void;
  playPlaylist: (playlist: Playlist, startIndex?: number) => void;
  playExternalPlaylist: (playlistId: string) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export const PlayerContext = createContext<PlayerContextValue | null>(null);

function findPlayableIndex(queue: Song[], startIndex: number, direction: 1 | -1): number {
  const len = queue.length;
  if (len === 0) return -1;
  for (let i = 0; i < len; i++) {
    const idx = (((startIndex + i * direction) % len) + len) % len;
    if (!isPlaceholderYoutubeId(queue[idx].youtubeId)) return idx;
  }
  return -1;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const playerHandleRef = useRef<YouTubePlayerHandle>(null);
  const loadedVideoIdRef = useRef<string | null>(null);
  const skipAttemptsRef = useRef(0);
  const hasRestoredRef = useRef(false);
  const tabIdRef = useRef<string | null>(null);
  const playbackChannelRef = useRef<BroadcastChannel | null>(null);
  if (tabIdRef.current === null && typeof crypto !== "undefined") {
    tabIdRef.current = crypto.randomUUID();
  }

  const [queue, setQueue] = useState<Song[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentPlaylistSlug, setCurrentPlaylistSlug] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasTunedIn, setHasTunedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackUnavailable, setPlaybackUnavailable] = useState(false);
  const [externalPlaylistId, setExternalPlaylistId] = useState<string | null>(null);
  const [externalVideo, setExternalVideo] = useState<ExternalVideoInfo | null>(null);

  const currentPlaylist = useMemo(
    () => (currentPlaylistSlug ? getPlaylistBySlug(currentPlaylistSlug) ?? null : null),
    [currentPlaylistSlug]
  );

  const goToIndex = useCallback(
    (nextQueue: Song[], index: number, autoplay: boolean, direction: 1 | -1 = 1) => {
      if (nextQueue.length === 0) return;
      const playableIdx = findPlayableIndex(nextQueue, index, direction);
      setCurrentTime(0);
      setDuration(0);

      if (playableIdx === -1) {
        setQueueIndex(((index % nextQueue.length) + nextQueue.length) % nextQueue.length);
        setCurrentSong(nextQueue[index] ?? nextQueue[0]);
        setIsPlaying(false);
        setPlaybackUnavailable(true);
        return;
      }

      setPlaybackUnavailable(false);
      setQueueIndex(playableIdx);
      const song = nextQueue[playableIdx];
      setCurrentSong(song);
      loadedVideoIdRef.current = song.youtubeId;

      if (autoplay) {
        setIsLoading(true);
        setIsPlaying(true);
        playerHandleRef.current?.loadVideoById(song.youtubeId);
      } else {
        setIsPlaying(false);
        playerHandleRef.current?.cueVideoById(song.youtubeId);
      }
    },
    []
  );


  const playSong = useCallback(
    (song: Song, options?: PlaySongOptions) => {
      const nextQueue = options?.queue ?? [song];
      const slug = options?.playlistSlug ?? null;
      const idx = nextQueue.findIndex((s) => s.id === song.id);
      setExternalPlaylistId(null);
      setExternalVideo(null);
      setQueue(nextQueue);
      setCurrentPlaylistSlug(slug);
      goToIndex(nextQueue, idx === -1 ? 0 : idx, true);
    },
    [goToIndex]
  );

  const playPlaylist = useCallback(
    (playlist: Playlist, startIndex = 0) => {
      const nextQueue = getSongsForPlaylist(playlist);
      setExternalPlaylistId(null);
      setExternalVideo(null);
      setQueue(nextQueue);
      setCurrentPlaylistSlug(playlist.slug);
      goToIndex(nextQueue, startIndex, true);
    },
    [goToIndex]
  );

  const playExternalPlaylist = useCallback((playlistId: string) => {
    setQueue([]);
    setQueueIndex(0);
    setCurrentSong(null);
    setCurrentPlaylistSlug(null);
    setExternalVideo(null);
    setExternalPlaylistId(playlistId);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackUnavailable(false);
    setIsLoading(true);
    setIsPlaying(true);
    playerHandleRef.current?.loadPlaylist(playlistId);
  }, []);

  const tuneIn = useCallback(() => {
    setHasTunedIn(true);
    const rotation = getCurrentRotation();
    const rotationSongs = getSongsForPlaylist(rotation);
    const startIndex = getRadioStartingPosition(rotationSongs.length);
    playPlaylist(rotation, startIndex);
  }, [playPlaylist]);

  const play = useCallback(() => {
    if (externalPlaylistId) {
      playerHandleRef.current?.play();
      setIsPlaying(true);
      return;
    }
    if (!currentSong) return;
    if (loadedVideoIdRef.current === currentSong.youtubeId && !playbackUnavailable) {
      playerHandleRef.current?.play();
      setIsPlaying(true);
    } else {
      goToIndex(queue, queueIndex, true);
    }
  }, [currentSong, playbackUnavailable, goToIndex, queue, queueIndex, externalPlaylistId]);

  const pause = useCallback(() => {
    playerHandleRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    if (externalPlaylistId) {
      setIsLoading(true);
      playerHandleRef.current?.nextVideo();
      return;
    }
    if (queue.length === 0) return;
    goToIndex(queue, queueIndex + 1, true);
  }, [queue, queueIndex, goToIndex, externalPlaylistId]);

  const previous = useCallback(() => {
    if (externalPlaylistId) {
      setIsLoading(true);
      playerHandleRef.current?.previousVideo();
      return;
    }
    if (queue.length === 0) return;
    if (currentTime > 5) {
      playerHandleRef.current?.seekTo(0);
      setCurrentTime(0);
      return;
    }
    goToIndex(queue, queueIndex - 1, true, -1);
  }, [queue, queueIndex, currentTime, goToIndex, externalPlaylistId]);

  const seek = useCallback((seconds: number) => {
    playerHandleRef.current?.seekTo(seconds);
    setCurrentTime(seconds);
  }, []);

  const setVolume = useCallback((nextVolume: number) => {
    const clamped = Math.min(100, Math.max(0, Math.round(nextVolume)));
    setVolumeState(clamped);
    setIsMuted(clamped === 0);
    playerHandleRef.current?.setVolume(clamped);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      playerHandleRef.current?.setVolume(nextMuted ? 0 : volume || DEFAULT_VOLUME);
      return nextMuted;
    });
  }, [volume]);

  // Restore playback preferences (but never auto-start audio). Deferred to
  // a microtask so state updates happen in a callback rather than
  // synchronously in the effect body.
  useEffect(() => {
    if (hasRestoredRef.current) return;
    hasRestoredRef.current = true;
    if (typeof window === "undefined") return;

    queueMicrotask(() => {
      const savedVolume = window.localStorage.getItem(STORAGE_KEYS.volume);
      if (savedVolume) setVolumeState(Number(savedVolume));

      const savedTunedIn = window.localStorage.getItem(STORAGE_KEYS.tunedIn) === "true";
      setHasTunedIn(savedTunedIn);

      const savedSongId = window.localStorage.getItem(STORAGE_KEYS.song);
      const song = savedSongId ? getSongById(savedSongId) : undefined;

      if (song) {
        const savedPlaylistSlug = window.localStorage.getItem(STORAGE_KEYS.playlist);
        const savedPlaylist = savedPlaylistSlug ? getPlaylistBySlug(savedPlaylistSlug) : undefined;
        const restoredQueue = savedPlaylist ? getSongsForPlaylist(savedPlaylist) : [song];
        const idx = restoredQueue.findIndex((s) => s.id === song.id);

        setQueue(restoredQueue);
        setQueueIndex(idx === -1 ? 0 : idx);
        setCurrentPlaylistSlug(savedPlaylist?.slug ?? null);
        setCurrentSong(song);
        return;
      }

      // Nothing saved (first-ever visit) — cue up the current rotation so
      // the player bar shows up ready to go instead of a bare "tune in"
      // prompt. Cueing doesn't need a user gesture; only playVideo() does,
      // which the visible Play button provides.
      const rotation = getCurrentRotation();
      const rotationSongs = getSongsForPlaylist(rotation);
      const startIndex = getRadioStartingPosition(rotationSongs.length);
      setQueue(rotationSongs);
      setCurrentPlaylistSlug(rotation.slug);
      goToIndex(rotationSongs, startIndex, false);
    });
  }, [goToIndex]);

  // Only one browser tab should play audio at a time. When this tab starts
  // playing, tell other tabs of the same site to pause — but don't pause
  // ourselves just because the tab is backgrounded/unfocused.
  useEffect(() => {
    if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;

    const channel = new BroadcastChannel("desi-mahol-player");
    playbackChannelRef.current = channel;

    channel.onmessage = (event) => {
      if (event.data?.type === "playing" && event.data.tabId !== tabIdRef.current) {
        pause();
      }
    };

    return () => {
      channel.close();
      playbackChannelRef.current = null;
    };
  }, [pause]);

  // Persist preferences.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.volume, String(volume));
  }, [volume]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.tunedIn, String(hasTunedIn));
  }, [hasTunedIn]);

  useEffect(() => {
    if (typeof window === "undefined" || !currentSong) return;
    window.localStorage.setItem(STORAGE_KEYS.song, currentSong.id);
    if (currentPlaylistSlug) {
      window.localStorage.setItem(STORAGE_KEYS.playlist, currentPlaylistSlug);
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.playlist);
    }
  }, [currentSong, currentPlaylistSlug]);

  // Poll playback progress while playing.
  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      const handle = playerHandleRef.current;
      if (!handle) return;
      setCurrentTime(handle.getCurrentTime());
      const d = handle.getDuration();
      if (d > 0) setDuration(d);
    }, 750);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  // Space toggles play/pause, arrow keys seek — unless a form control has focus.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      const isFormControl =
        tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable;
      if (isFormControl) return;

      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      } else if (event.code === "ArrowRight") {
        seek(Math.min(duration, currentTime + 5));
      } else if (event.code === "ArrowLeft") {
        seek(Math.max(0, currentTime - 5));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, seek, currentTime, duration]);

  const handleReady = useCallback(() => {
    setIsReady(true);
    playerHandleRef.current?.setVolume(volume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlaying = useCallback(() => {
    setIsPlaying(true);
    setIsLoading(false);
    setPlaybackUnavailable(false);
    skipAttemptsRef.current = 0;
    playbackChannelRef.current?.postMessage({ type: "playing", tabId: tabIdRef.current });
    if (externalPlaylistId) {
      const data = playerHandleRef.current?.getVideoData();
      if (data) {
        setExternalVideo({ videoId: data.video_id, title: data.title, author: data.author });
      }
    }
  }, [externalPlaylistId]);

  const handlePaused = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleEnded = useCallback(() => {
    skipAttemptsRef.current = 0;
    // YouTube advances its own playlist internally on ended.
    if (externalPlaylistId) return;
    goToIndex(queue, queueIndex + 1, true);
  }, [queue, queueIndex, goToIndex, externalPlaylistId]);

  const handleError = useCallback(() => {
    skipAttemptsRef.current += 1;
    setIsLoading(false);
    if (externalPlaylistId) {
      if (skipAttemptsRef.current > 20) {
        setIsPlaying(false);
        setPlaybackUnavailable(true);
        return;
      }
      playerHandleRef.current?.nextVideo();
      return;
    }
    if (skipAttemptsRef.current > Math.max(queue.length, 1)) {
      setIsPlaying(false);
      setPlaybackUnavailable(true);
      return;
    }
    goToIndex(queue, queueIndex + 1, true);
  }, [queue, queueIndex, goToIndex, externalPlaylistId]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      currentSong,
      currentPlaylist,
      isPlaying,
      isLoading,
      isReady,
      hasTunedIn,
      currentTime,
      duration,
      volume,
      isMuted,
      queue,
      playbackUnavailable,
      externalPlaylistId,
      externalVideo,
      tuneIn,
      playSong,
      playPlaylist,
      playExternalPlaylist,
      play,
      pause,
      togglePlay,
      next,
      previous,
      seek,
      setVolume,
      toggleMute,
    }),
    [
      currentSong,
      currentPlaylist,
      isPlaying,
      isLoading,
      isReady,
      hasTunedIn,
      currentTime,
      duration,
      volume,
      isMuted,
      queue,
      playbackUnavailable,
      externalPlaylistId,
      externalVideo,
      tuneIn,
      playSong,
      playPlaylist,
      playExternalPlaylist,
      play,
      pause,
      togglePlay,
      next,
      previous,
      seek,
      setVolume,
      toggleMute,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <YouTubePlayer
        ref={playerHandleRef}
        onReady={handleReady}
        onPlaying={handlePlaying}
        onPaused={handlePaused}
        onEnded={handleEnded}
        onError={handleError}
      />
    </PlayerContext.Provider>
  );
}
