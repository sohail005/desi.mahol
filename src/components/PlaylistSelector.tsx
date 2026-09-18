"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ListMusic } from "lucide-react";
import { useRadio } from "@/hooks/useRadio";
import { getPlaylistBySlug } from "@/lib/catalogue";
import { songs } from "@/data/songs";
import { playlists } from "@/data/playlists";
import { externalPlaylists } from "@/data/externalPlaylists";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PlaylistSelector({ className = "" }: { className?: string }) {
  const { playPlaylist, playSong, playExternalPlaylist, externalPlaylistId } = useRadio();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  function handleSelectPlaylist(slug: string) {
    const playlist = getPlaylistBySlug(slug);
    if (!playlist) return;
    setActiveSlug(slug);
    setIsOpen(false);
    playPlaylist(playlist);
  }

  function handleSelectAllSongs() {
    setActiveSlug(null);
    setIsOpen(false);
    const shuffled = shuffle(songs);
    if (shuffled.length > 0) {
      playSong(shuffled[0], { queue: shuffled, playlistSlug: null });
    }
  }

  function handleSelectExternalPlaylist(youtubePlaylistId: string) {
    setActiveSlug(null);
    setIsOpen(false);
    playExternalPlaylist(youtubePlaylistId);
  }

  const activePlaylist = playlists.find((playlist) => playlist.slug === activeSlug) ?? null;
  const activeExternalPlaylist =
    externalPlaylists.find((playlist) => playlist.youtubePlaylistId === externalPlaylistId) ?? null;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="liquid-glass flex w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-semibold text-white"
      >
        <ListMusic size={14} className="shrink-0 text-white/80" aria-hidden="true" />
        {activePlaylist?.titleEnglish ?? activeExternalPlaylist?.label ?? "Playlists"}
        <ChevronDown
          size={13}
          className={`ml-auto shrink-0 text-white/60 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="liquid-glass-card no-scrollbar absolute bottom-full left-0 z-40 mb-2 flex max-h-80 w-56 flex-col gap-0.5 overflow-y-auto rounded-2xl p-1.5"
        >
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              type="button"
              role="option"
              aria-selected={playlist.slug === activeSlug}
              onClick={() => handleSelectPlaylist(playlist.slug)}
              className={`flex flex-col items-start gap-0.5 rounded-xl px-3 py-2 text-left text-white transition hover:bg-white/10 ${
                playlist.slug === activeSlug ? "bg-white/15" : ""
              }`}
            >
              <span className="text-[16px] font-medium">{playlist.titleEnglish}</span>
              <span className="text-[14px] text-white/50">{playlist.songIds.length} songs</span>
            </button>
          ))}

          {externalPlaylists.map((playlist) => (
            <button
              key={playlist.id}
              type="button"
              role="option"
              aria-selected={playlist.youtubePlaylistId === externalPlaylistId}
              onClick={() => handleSelectExternalPlaylist(playlist.youtubePlaylistId)}
              className={`flex flex-col items-start gap-0.5 rounded-xl px-3 py-2 text-left text-white transition hover:bg-white/10 ${
                playlist.youtubePlaylistId === externalPlaylistId ? "bg-white/15" : ""
              }`}
            >
              <span className="text-[16px] font-medium">{playlist.label}</span>
              <span className="text-[14px] text-white/50">YouTube playlist</span>
            </button>
          ))}

          <button
            type="button"
            role="option"
            aria-selected={activeSlug === null}
            onClick={handleSelectAllSongs}
            className={`flex flex-col items-start gap-0.5 rounded-xl px-3 py-2 text-left text-white transition hover:bg-white/10 ${
              activeSlug === null ? "bg-white/15" : ""
            }`}
          >
            <span className="text-[16px] font-medium">All Songs</span>
            <span className="text-[14px] text-white/50">Shuffle the whole collection</span>
          </button>
        </div>
      )}
    </div>
  );
}
