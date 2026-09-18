/**
 * Mood-based visual themes. Each theme recolors the hero backdrop and
 * starts the matching rotation when selected.
 *
 * `imageDesktop`/`imageMobile` point at per-theme hero backgrounds so each
 * mood can use a desktop and mobile composition.
 */
export interface Theme {
  id: string;
  label: string;
  emoji: string;
  /** null means "Mix" - shuffle the whole catalogue instead of one rotation. */
  playlistSlug: string | null;
  /** Real YouTube playlist ID to play instead of the internal catalogue, when set. */
  youtubePlaylistId?: string;
  /** CSS gradient painted over the hero photo to color-grade the mood. */
  overlay: string;
  imageDesktop: string;
  imageMobile: string;
}

export const themes: Theme[] = [
  {
    id: "mix",
    label: "Mix",
    emoji: "🔀",
    playlistSlug: null,
    youtubePlaylistId: "PL9bw4S5ePsEEdDKeGALwOvH11_BatLjBH",
    overlay:
      "linear-gradient(180deg, rgba(180,60,150,0.18) 0%, rgba(60,90,180,0.28) 45%, rgba(20,20,20,0.8) 100%)",
    imageDesktop: "/images/theme-mix-hero-desktop.webp",
    imageMobile: "/images/theme-mix-hero-mobile.webp",
  },
  {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    playlistSlug: "shaadi-sunday",
    youtubePlaylistId: "PLIllizHRrDEbqnnf69BIM_g4seIoEFH0K",
    overlay:
      "linear-gradient(180deg, rgba(255,196,64,0.16) 0%, rgba(120,60,10,0.25) 55%, rgba(0,0,0,0.75) 100%)",
    imageDesktop: "/images/theme-happy-hero-desktop.webp",
    imageMobile: "/images/theme-happy-hero-mobile.webp",
  },
  {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    playlistSlug: "90s-dard",
    youtubePlaylistId: "PLHuHXHyLu7BGi-vR7X6j_xh_Tt9wy7pNA",
    overlay:
      "linear-gradient(180deg, rgba(30,50,80,0.35) 0%, rgba(15,25,45,0.5) 55%, rgba(0,0,0,0.82) 100%)",
    imageDesktop: "/images/theme-sad-hero-desktop.webp",
    imageMobile: "/images/theme-sad-hero-mobile.webp",
  },
  {
    id: "love",
    label: "Love",
    emoji: "❤️",
    playlistSlug: "90s-dard",
    youtubePlaylistId: "PLbgYDgHMfQS2q-dvN9RRu3H9tNhATrLM3",
    overlay:
      "linear-gradient(180deg, rgba(190,40,80,0.22) 0%, rgba(90,15,40,0.35) 55%, rgba(0,0,0,0.78) 100%)",
    imageDesktop: "/images/theme-love-hero-desktop.webp",
    imageMobile: "/images/theme-love-hero-mobile.webp",
  },
  {
    id: "travel",
    label: "Travel",
    emoji: "🧳",
    playlistSlug: "highway-raat",
    youtubePlaylistId: "PLQdfb6nEJz_X-0Tkwec2N2Sj83d_DM36d",
    overlay:
      "linear-gradient(180deg, rgba(20,110,120,0.22) 0%, rgba(10,60,70,0.35) 55%, rgba(0,0,0,0.78) 100%)",
    imageDesktop: "/images/theme-travel-hero-desktop.webp",
    imageMobile: "/images/theme-travel-hero-mobile.webp",
  },
  {
    id: "driving",
    label: "Driving",
    emoji: "🚗",
    playlistSlug: "highway-raat",
    youtubePlaylistId: "PL2n9PsUx_VHcVgOATXGVFFP9IXjYO6wMY",
    overlay:
      "linear-gradient(180deg, rgba(20,20,45,0.35) 0%, rgba(10,10,30,0.55) 55%, rgba(0,0,0,0.85) 100%)",
    imageDesktop: "/images/theme-driving-hero-desktop.webp",
    imageMobile: "/images/theme-driving-hero-mobile.webp",
  },
  {
    id: "working",
    label: "Working",
    emoji: "💼",
    playlistSlug: "saloon-classics",
    youtubePlaylistId: "PL9PwPs7-UT5xfmBfQ3UIbgDv7WWPvdCTy",
    overlay:
      "linear-gradient(180deg, rgba(90,70,40,0.18) 0%, rgba(50,35,20,0.3) 55%, rgba(0,0,0,0.75) 100%)",
    imageDesktop: "/images/theme-working-hero-desktop.webp",
    imageMobile: "/images/theme-working-hero-mobile.webp",
  },
  {
    id: "cooking",
    label: "Cooking",
    emoji: "🍳",
    playlistSlug: "saloon-classics",
    youtubePlaylistId: "PL-sdNC-scxHZ90pEFtsibiOGF3alAjDt1",
    overlay:
      "linear-gradient(180deg, rgba(210,110,30,0.2) 0%, rgba(120,55,15,0.32) 55%, rgba(0,0,0,0.78) 100%)",
    imageDesktop: "/images/theme-cooking-hero-desktop.webp",
    imageMobile: "/images/theme-cooking-hero-mobile.webp",
  },
  {
    id: "relax",
    label: "Relax",
    emoji: "🌿",
    playlistSlug: "saloon-classics",
    overlay:
      "linear-gradient(180deg, rgba(60,120,90,0.18) 0%, rgba(25,70,55,0.3) 55%, rgba(0,0,0,0.78) 100%)",
    imageDesktop: "/images/theme-relax-hero-desktop.webp",
    imageMobile: "/images/theme-relax-hero-mobile.webp",
  },
];

export function getThemeById(id: string): Theme | undefined {
  return themes.find((theme) => theme.id === id);
}
