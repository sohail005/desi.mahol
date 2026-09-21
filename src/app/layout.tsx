import type { Metadata, Viewport } from "next";
import { Dosis, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";
import AmbientBackground from "@/components/AmbientBackground";
import RootChrome from "@/components/RootChrome";

const dosis = Dosis({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desi Mahol — 90s Hindi Radio",
  description:
    "Desi Mahol is a nostalgic Hindi music experience featuring timeless Bollywood songs, curated rotations, and pure desi vibes.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
  openGraph: {
    title: "Desi Mahol — 90s Hindi Radio",
    description: "Old songs. Pure desi vibes. Timeless Hindi songs, playing all day.",
    siteName: "Desi Mahol",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#8E2F25",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${dosis.variable} ${notoSerifDevanagari.variable}`}>
      <body className="font-[family-name:var(--font-body)] antialiased">
        <PlayerProvider>
          <AmbientBackground />
          <RootChrome>{children}</RootChrome>
        </PlayerProvider>
      </body>
    </html>
  );
}
