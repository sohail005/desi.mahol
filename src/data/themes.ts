/**
 * Mood-based visual themes. Each theme recolors the hero backdrop and,
 * when selected, plays songs from the matching Firebase category
 * (`theme.id` is used directly as the categoryId).
 *
 * `imageDesktop`/`imageMobile` point at per-theme hero backgrounds so each
 * mood can use a desktop and mobile composition.
 */
export interface Theme {
  id: string;
  label: string;
  emoji: string;
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
    overlay:
      "linear-gradient(180deg, rgba(180,60,150,0.18) 0%, rgba(60,90,180,0.28) 45%, rgba(20,20,20,0.8) 100%)",
    imageDesktop: "/images/mixmood.webp",
    imageMobile: "/images/theme-mix-hero-mobile.webp",
  },
  {
    id: "happy",
    label: "Happy",
    emoji: "😊",
    overlay:
      "linear-gradient(180deg, rgba(255,196,64,0.16) 0%, rgba(120,60,10,0.25) 55%, rgba(0,0,0,0.75) 100%)",
    imageDesktop: "/images/happymood.webp",
    imageMobile: "/images/theme-happy-hero-mobile.webp",
  },
  {
    id: "sad",
    label: "Sad",
    emoji: "😢",
    overlay:
      "linear-gradient(180deg, rgba(30,50,80,0.35) 0%, rgba(15,25,45,0.5) 55%, rgba(0,0,0,0.82) 100%)",
    imageDesktop: "/images/sadmood.webp",
    imageMobile: "/images/theme-sad-hero-mobile.webp",
  },
  {
    id: "love",
    label: "Love",
    emoji: "❤️",
    overlay:
      "linear-gradient(180deg, rgba(190,40,80,0.22) 0%, rgba(90,15,40,0.35) 55%, rgba(0,0,0,0.78) 100%)",
    imageDesktop: "/images/lovemood.webp",
    imageMobile: "/images/theme-love-hero-mobile.webp",
  },
  {
    id: "travel",
    label: "Travel",
    emoji: "🧳",
    overlay:
      "linear-gradient(180deg, rgba(20,110,120,0.22) 0%, rgba(10,60,70,0.35) 55%, rgba(0,0,0,0.78) 100%)",
    imageDesktop: "/images/theme-travel-hero-desktop.webp",
    imageMobile: "/images/theme-travel-hero-mobile.webp",
  },
  {
    id: "driving",
    label: "Driving",
    emoji: "🚗",
    overlay:
      "linear-gradient(180deg, rgba(20,20,45,0.35) 0%, rgba(10,10,30,0.55) 55%, rgba(0,0,0,0.85) 100%)",
    imageDesktop: "/images/theme-driving-hero-desktop.webp",
    imageMobile: "/images/theme-driving-hero-mobile.webp",
  },
  {
    id: "working",
    label: "Working",
    emoji: "💼",
    overlay:
      "linear-gradient(180deg, rgba(90,70,40,0.18) 0%, rgba(50,35,20,0.3) 55%, rgba(0,0,0,0.75) 100%)",
    imageDesktop: "/images/theme-working-hero-desktop.webp",
    imageMobile: "/images/theme-working-hero-mobile.webp",
  },
  {
    id: "cooking",
    label: "Cooking",
    emoji: "🍳",
    overlay:
      "linear-gradient(180deg, rgba(210,110,30,0.2) 0%, rgba(120,55,15,0.32) 55%, rgba(0,0,0,0.78) 100%)",
    imageDesktop: "/images/theme-cooking-hero-desktop.webp",
    imageMobile: "/images/theme-cooking-hero-mobile.webp",
  },
  {
    id: "relax",
    label: "Relax",
    emoji: "🌿",
    overlay:
      "linear-gradient(180deg, rgba(60,120,90,0.18) 0%, rgba(25,70,55,0.3) 55%, rgba(0,0,0,0.78) 100%)",
    imageDesktop: "/images/theme-relax-hero-desktop.webp",
    imageMobile: "/images/theme-relax-hero-mobile.webp",
  },
];

export function getThemeById(id: string): Theme | undefined {
  return themes.find((theme) => theme.id === id);
}
