export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0d0503] px-5 py-8 text-center sm:px-8">
      <p className="font-[family-name:var(--font-devanagari)] mb-1 text-lg text-amber-200/80">
        Desi Mahol
      </p>
      <p className="text-xs text-white/40">Desi Mahol · playing all day</p>

      <div className="mt-4 flex items-center justify-center gap-3">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Join Desi Mahol WhatsApp Channel"
          className="flex h-9 items-center justify-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/15 px-3.5 text-xs font-semibold tracking-wide text-[#25D366] shadow-sm transition-all hover:border-[#25D366] hover:bg-[#25D366]/25 hover:text-emerald-300 active:scale-95"
        >
          <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span>Join Group</span>
        </a>
        <a
          href="https://www.instagram.com/sohail.code/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Desi Mahol on Instagram"
          className="flex h-9 items-center justify-center gap-2 rounded-lg border border-[#E1306C]/40 bg-[#E1306C]/15 px-3.5 text-xs font-semibold tracking-wide text-[#E1306C] shadow-sm transition-all hover:border-[#E1306C] hover:bg-[#E1306C]/25 hover:text-pink-300 active:scale-95"
        >
          <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
          </svg>
          <span>Instagram</span>
        </a>
      </div>

      <p className="mx-auto mt-6 max-w-xl px-4 text-[11.5px] leading-relaxed text-white/40">
        Disclaimer: Audio plays through YouTube&rsquo;s embedded player. Nothing is hosted on
        this site, and all rights stay with the labels, composers and performers. Song
        credits are put together from film soundtrack listings.
      </p>
    </footer>
  );
}
