"use client";

import { useEffect, useState } from "react";
import type { Playlist } from "@/types/music";
import { getCurrentRotation } from "@/lib/rotation";

/**
 * The playlist currently "on air" according to IST, re-checked every 30s
 * so the homepage updates live if a visitor leaves the tab open across a
 * rotation boundary.
 */
export function useCurrentRotation(): Playlist {
  const [rotation, setRotation] = useState<Playlist>(() => getCurrentRotation());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRotation(getCurrentRotation());
    }, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return rotation;
}
