import type { Playlist } from "@/types/music";

/**
 * Rotation schedule (IST). Highway Raat wraps past midnight, handled by
 * getCurrentRotation() in src/lib/rotation.ts.
 *
 * Playlists only reference song IDs — full song data lives in
 * src/data/songs.ts and is looked up via getSongsForPlaylist().
 */
export const playlists: Playlist[] = [
  {
    id: "shaadi-sunday",
    slug: "shaadi-sunday",
    titleHindi: "शादी और रविवार",
    titleEnglish: "Shaadi & Sunday",
    description:
      "Celebration songs, family favourites and cheerful weekend energy.",
    startHour: 5,
    endHour: 9,
    songIds: ["012", "013", "014", "015"],
  },
  {
    id: "saloon-classics",
    slug: "saloon-classics",
    titleHindi: "पुराने नग़मे",
    titleEnglish: "Saloon Classics",
    description:
      "A warm daytime collection of evergreen Hindi classics.",
    startHour: 9,
    endHour: 18,
    songIds: ["001", "003", "004", "010", "017"],
  },
  {
    id: "90s-dard",
    slug: "90s-dard",
    titleHindi: "90s दर्द",
    titleEnglish: "90s Dard",
    description:
      "Melancholy favourites, heartbreak songs and unforgettable melodies.",
    startHour: 18,
    endHour: 22,
    songIds: ["002", "005", "007", "009", "011", "018"],
  },
  {
    id: "highway-raat",
    slug: "highway-raat",
    titleHindi: "हाईवे रात",
    titleEnglish: "Highway Raat",
    description:
      "Late-night songs for long roads, quiet rooms and old memories.",
    startHour: 22,
    endHour: 5,
    songIds: ["006", "008", "016"],
  },
];
