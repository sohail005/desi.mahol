import Link from "next/link";
import { playlists } from "@/data/playlists";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] pb-32">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="font-[family-name:var(--font-devanagari)] text-2xl font-semibold text-[var(--foreground)]">
              देसी माहौल
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">Desi Mahol</p>
            <p className="mt-4 max-w-xs font-[family-name:var(--font-devanagari)] text-sm text-[var(--foreground)]">
              पुराने गाने, पूरा देसी माहौल.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)] uppercase">
              Rotations
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {playlists.map((playlist) => (
                <li key={playlist.slug}>
                  <Link
                    href={`/playlists/${playlist.slug}`}
                    className="text-[var(--foreground)] transition hover:text-[var(--accent)]"
                  >
                    {playlist.titleEnglish}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[var(--muted)] uppercase">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/songs" className="text-[var(--foreground)] transition hover:text-[var(--accent)]">
                  All Songs
                </Link>
              </li>
              <li>
                <Link
                  href="/playlists"
                  className="text-[var(--foreground)] transition hover:text-[var(--accent)]"
                >
                  Playlists
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-[var(--muted)]">
          Audio playback is provided through embedded third-party services. Desi Mahol does not
          host third-party commercial recordings unless explicitly licensed.
        </p>
      </div>
    </footer>
  );
}
