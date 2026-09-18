"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Palette } from "lucide-react";
import { useRadio } from "@/hooks/useRadio";
import { getPlaylistBySlug } from "@/lib/catalogue";
import { songs } from "@/data/songs";
import { themes, type Theme } from "@/data/themes";

interface ThemeSelectorProps {
  activeThemeId: string | null;
  onThemeChange: (theme: Theme) => void;
  className?: string;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function ThemeSelector({
  activeThemeId,
  onThemeChange,
  className = "",
}: ThemeSelectorProps) {
  const { playPlaylist, playSong, playExternalPlaylist } = useRadio();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const activeTheme = themes.find((theme) => theme.id === activeThemeId) ?? null;

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

  function handleSelect(theme: Theme) {
    onThemeChange(theme);
    setIsOpen(false);

    if (theme.youtubePlaylistId) {
      playExternalPlaylist(theme.youtubePlaylistId);
      return;
    }

    if (theme.playlistSlug === null) {
      const shuffled = shuffle(songs);
      if (shuffled.length > 0) {
        playSong(shuffled[0], { queue: shuffled, playlistSlug: null });
      }
      return;
    }

    const playlist = getPlaylistBySlug(theme.playlistSlug);
    if (playlist) playPlaylist(playlist);
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="liquid-glass flex h-8 w-full items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white sm:text-sm"
      >
        {activeTheme ? (
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center text-sm leading-none" aria-hidden="true">
            {activeTheme.emoji}
          </span>
        ) : (
          <Palette size={14} className="shrink-0 text-white/80" aria-hidden="true" />
        )}
        {activeTheme ? activeTheme.label : "Mood"}
        <ChevronDown
          size={13}
          className={`ml-auto shrink-0 text-white/60 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="liquid-glass-card no-scrollbar absolute top-full left-0 z-40 mt-2 flex max-h-80 w-44 flex-col gap-0.5 overflow-y-auto rounded-2xl p-1.5"
        >
          {themes.map((theme) => (
            <button
              key={theme.id}
              type="button"
              role="option"
              aria-selected={theme.id === activeThemeId}
              onClick={() => handleSelect(theme)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-white transition hover:bg-amber-400/25 ${
                theme.id === activeThemeId ? "bg-amber-400/15" : ""
              }`}
            >
              <span aria-hidden="true">{theme.emoji}</span>
              {theme.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
