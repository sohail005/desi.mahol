import { Clock, Infinity as InfinityIcon, Radio } from "lucide-react";

const features = [
  {
    icon: Radio,
    titleHindi: "पुराने गाने",
    title: "Timeless Hindi Radio",
    description:
      "A curated stream of old, evergreen Hindi songs that never really left our playlists — tuned to keep playing in the background all day.",
  },
  {
    icon: Clock,
    titleHindi: "रोज़ की रोटेशन",
    title: "Daily Rotations",
    description:
      "A different mood for every part of the day — mornings, afternoons, evenings and late night — each with its own running rotation.",
  },
  {
    icon: InfinityIcon,
    titleHindi: "हमेशा खुला",
    title: "Always Open",
    description:
      "Desi Mahol is free, streams straight from your browser, and never closes — no sign-up, no app.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[#1c0704] px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase">
          Welcome to
        </p>
        <h2 className="font-[family-name:var(--font-devanagari)] text-3xl text-white sm:text-5xl">
          देसी माहौल — पुराने गानों का माहौल
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base">
          Desi Mahol is a free ambient Hindi radio built to recreate one very specific
          feeling: an old shop radio left on in the background, playing timeless Hindi
          songs while the day goes by. Press play, and Desi Mahol streams a nonstop mix
          of old Bollywood nostalgia, organised into rotations that shift with the time
          of day.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3 sm:gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left"
          >
            <div
              className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/15"
              aria-hidden="true"
            >
              <feature.icon className="h-5 w-5 text-amber-400" />
            </div>
            <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-white/60">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
