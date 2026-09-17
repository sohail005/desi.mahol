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
    songIds: [
      "022", "024", "026", "027", "028", "029", "031", "034", "036", "039",
      "040", "041", "048", "051", "059", "064", "065", "068", "070", "071",
      "080", "085", "086", "090", "091", "095", "099", "105", "106", "108",
      "111", "114", "119", "120", "122",
    ],
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
    songIds: [
      "021", "030", "032", "035", "038", "045", "047", "050", "053", "057",
      "058", "062", "063", "066", "067", "069", "072", "074", "077", "079",
      "081", "084", "094", "097", "098", "109", "116",
    ],
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
    songIds: [
      "019", "020", "023", "025", "033", "037", "042", "043", "044", "046",
      "049", "052", "054", "055", "056", "060", "061", "073", "075", "076",
      "078", "082", "083", "087", "088", "089", "092", "093", "100", "101",
      "102", "103", "107", "110", "112", "113", "115", "117", "118", "121",
      "123",
    ],
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
    songIds: ["096", "104"],
  },
];
