import { getISTHour } from "@/lib/time";

interface RotationSlot {
  categoryId: string;
  startHour: number;
  endHour: number;
}

/**
 * Time-of-day → category schedule for "Tap to Tune In" (Asia/Kolkata).
 * Same hour boundaries as the old hardcoded rotation playlists, just
 * retargeted at Firebase categories instead of static song lists.
 */
const ROTATION_SCHEDULE: RotationSlot[] = [
  { categoryId: "happy", startHour: 5, endHour: 9 },
  { categoryId: "mix", startHour: 9, endHour: 18 },
  { categoryId: "sad", startHour: 18, endHour: 22 },
  { categoryId: "travel", startHour: 22, endHour: 5 },
];

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
 * Returns the category that should be "on air" right now, based on the
 * current hour in Asia/Kolkata. Falls back to the first slot if the
 * schedule somehow leaves a gap.
 */
export function getCurrentCategoryId(date: Date = new Date()): string {
  const hour = getISTHour(date);
  const active = ROTATION_SCHEDULE.find((slot) =>
    isHourInRotation(hour, slot.startHour, slot.endHour)
  );
  return active?.categoryId ?? ROTATION_SCHEDULE[0].categoryId;
}

/**
 * Deterministic "radio" starting index into a queue based on the current
 * IST hour and minute, so tuning in twice within the same minute lands on
 * the same song, but different times of day vary the start.
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
