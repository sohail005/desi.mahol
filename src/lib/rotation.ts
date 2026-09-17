import { playlists } from "@/data/playlists";
import type { Playlist } from "@/types/music";
import { getISTHour } from "@/lib/time";

/**
 * Whether `hour` falls inside [startHour, endHour), handling ranges that
 * wrap past midnight (e.g. 22 -> 5).
 */
export function isHourInRotation(hour: number, startHour: number, endHour: number): boolean {
  if (startHour === endHour) return true; // 24-hour rotation
  if (startHour < endHour) {
    return hour >= startHour && hour < endHour;
  }
  // Overnight wrap, e.g. 22:00–05:00
  return hour >= startHour || hour < endHour;
}

/**
 * Returns the playlist that should be "on air" right now, based on the
 * current hour in Asia/Kolkata. Falls back to the first playlist if the
 * schedule somehow leaves a gap.
 */
export function getCurrentRotation(date: Date = new Date()): Playlist {
  const hour = getISTHour(date);
  const active = playlists.find((playlist) =>
    isHourInRotation(hour, playlist.startHour, playlist.endHour)
  );
  return active ?? playlists[0];
}

/**
 * Deterministic "radio" starting index into a playlist based on the
 * current IST hour and minute, so tuning in twice within the same minute
 * lands on the same song, but different times of day vary the start.
 */
export function getRadioStartingPosition(songCount: number, date: Date = new Date()): number {
  if (songCount <= 0) return 0;
  const hour = getISTHour(date);
  const minute = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      minute: "numeric",
    }).format(date)
  );
  return (hour * 60 + minute) % songCount;
}
