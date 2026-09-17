const faqs = [
  {
    question: "What is Desi Mahol?",
    answer:
      "Desi Mahol is a free ambient Hindi radio website that recreates the sound of an old shop radio — nonstop, timeless Hindi songs organised into rotations that change through the day.",
  },
  {
    question: "Is Desi Mahol free to use?",
    answer:
      "Yes. Desi Mahol streams entirely for free in your browser, with no sign-up required, on both desktop and mobile.",
  },
  {
    question: "What kind of music plays on Desi Mahol?",
    answer:
      "Desi Mahol plays old, evergreen Hindi songs across curated rotations like Shaadi & Sunday, Saloon Classics, 90s Dard and Highway Raat.",
  },
  {
    question: "How does the rotation work?",
    answer:
      "The playlist that's \"on air\" changes automatically with the time of day (IST) — a different rotation plays through mornings, afternoons, evenings and late night.",
  },
  {
    question: "Can I pick a specific playlist or song?",
    answer:
      "Yes. Browse the Playlists page for the day's rotations, or the Songs page for the full catalogue, and play anything directly.",
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="relative border-t border-white/5 bg-[#120806] px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-center text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase">
          FAQ
        </p>
        <h2 className="mb-10 text-center font-[family-name:var(--font-devanagari)] text-3xl text-white sm:text-4xl">
          Desi Mahol, Explained
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="faq-item liquid-glass-card rounded-xl p-4 sm:p-5"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-white sm:text-base">
                {faq.question}
                <svg
                  className="faq-chevron h-4 w-4 shrink-0 text-amber-400 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
