"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { loadYouTubeApi, YT_PLAYER_STATE, type YTPlayer, type YTPlayerEvent } from "@/lib/youtube";

export interface YouTubePlayerHandle {
  loadVideoById(videoId: string): void;
  cueVideoById(videoId: string): void;
  play(): void;
  pause(): void;
  seekTo(seconds: number): void;
  setVolume(volume: number): void;
  getCurrentTime(): number;
  getDuration(): number;
}

interface YouTubePlayerProps {
  onReady?: () => void;
  onEnded?: () => void;
  onPlaying?: () => void;
  onPaused?: () => void;
  onError?: (videoId: string) => void;
}

/**
 * Mounts a visually hidden YouTube IFrame player and exposes imperative
 * playback controls via ref. Rendered once at the app root (inside
 * PlayerProvider) so it survives client-side navigation.
 */
const YouTubePlayer = forwardRef<YouTubePlayerHandle, YouTubePlayerProps>(function YouTubePlayer(
  { onReady, onEnded, onPlaying, onPaused, onError },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const pendingVideoIdRef = useRef<string | null>(null);
  const pendingAutoplayRef = useRef(false);
  const currentVideoIdRef = useRef<string | null>(null);
  const callbacksRef = useRef({ onReady, onEnded, onPlaying, onPaused, onError });
  callbacksRef.current = { onReady, onEnded, onPlaying, onPaused, onError };

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        height: "200",
        width: "200",
        playerVars: {
          playsinline: 1,
          controls: 0,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (pendingVideoIdRef.current) {
              if (pendingAutoplayRef.current) {
                playerRef.current?.loadVideoById(pendingVideoIdRef.current);
              } else {
                playerRef.current?.cueVideoById(pendingVideoIdRef.current);
              }
              pendingVideoIdRef.current = null;
            }
            callbacksRef.current.onReady?.();
          },
          onStateChange: (event: YTPlayerEvent) => {
            switch (event.data) {
              case YT_PLAYER_STATE.ENDED:
                callbacksRef.current.onEnded?.();
                break;
              case YT_PLAYER_STATE.PLAYING:
                callbacksRef.current.onPlaying?.();
                break;
              case YT_PLAYER_STATE.PAUSED:
                callbacksRef.current.onPaused?.();
                break;
              default:
                break;
            }
          },
          onError: () => {
            if (currentVideoIdRef.current) {
              callbacksRef.current.onError?.(currentVideoIdRef.current);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    loadVideoById(videoId: string) {
      currentVideoIdRef.current = videoId;
      if (playerRef.current) {
        playerRef.current.loadVideoById(videoId);
      } else {
        pendingVideoIdRef.current = videoId;
        pendingAutoplayRef.current = true;
      }
    },
    cueVideoById(videoId: string) {
      currentVideoIdRef.current = videoId;
      pendingAutoplayRef.current = false;
      if (playerRef.current) {
        playerRef.current.cueVideoById(videoId);
      } else {
        pendingVideoIdRef.current = videoId;
      }
    },
    play() {
      playerRef.current?.playVideo();
    },
    pause() {
      playerRef.current?.pauseVideo();
    },
    seekTo(seconds: number) {
      playerRef.current?.seekTo(seconds, true);
    },
    setVolume(volume: number) {
      playerRef.current?.setVolume(volume);
    },
    getCurrentTime() {
      return playerRef.current?.getCurrentTime() ?? 0;
    },
    getDuration() {
      return playerRef.current?.getDuration() ?? 0;
    },
  }));

  return (
    <div
      className="pointer-events-none fixed top-0 left-[-9999px] h-50 w-50 opacity-0"
      aria-hidden="true"
    >
      <div ref={containerRef} />
    </div>
  );
});

export default YouTubePlayer;
