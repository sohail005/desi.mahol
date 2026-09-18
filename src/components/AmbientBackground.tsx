"use client";

import Image from "next/image";
import { useThemeContext } from "@/context/ThemeContext";

const DEFAULT_IMAGE = "/images/desimahol3.webp";

export default function AmbientBackground() {
  const { activeTheme } = useThemeContext();
  const imageSrc = activeTheme?.imageDesktop ?? DEFAULT_IMAGE;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <Image
        key={imageSrc}
        src={imageSrc}
        alt=""
        fill
        sizes="100vw"
        priority
        className="scale-110 object-cover opacity-90 blur-2xl"
      />
      <div className="absolute inset-0 bg-[#0d0503]/60" />
    </div>
  );
}
