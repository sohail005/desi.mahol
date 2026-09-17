import Hero from "@/components/Hero";
import RotationSection from "@/components/RotationSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RotationSection />
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="border-t border-[var(--border)] pt-8 text-center">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-[var(--muted)]">
            No algorithms, no skips forced on you — just a running rotation of Hindi
            songs that have stuck around for a reason, playing through the day like an
            old shop radio left on in the background.
          </p>
        </div>
      </section>
    </>
  );
}
