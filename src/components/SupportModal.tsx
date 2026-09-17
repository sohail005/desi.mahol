"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface SupportModalProps {
  onClose: () => void;
}

export default function SupportModal({ onClose }: SupportModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Support Desi Mahol"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#1c0704] p-6 text-center shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>

        <h3 className="font-[family-name:var(--font-devanagari)] text-lg font-semibold text-white">
          No ads — just memories. Support the platform to stay forever.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          We promise never to put ads and ruin your experience. But web server costs are
          high to keep this website smooth — please send any amount you wish. Thank you
          in advance! ❤️
        </p>

        <div className="mx-auto mt-5 flex h-40 w-40 items-center justify-center rounded-xl border border-amber-500/30 bg-white/5">
          <svg viewBox="0 0 10 10" className="h-28 w-28 text-white/70" aria-hidden="true">
            {Array.from({ length: 100 }, (_, i) => {
              const x = i % 10;
              const y = Math.floor(i / 10);
              const filled = (x * 31 + y * 17 + x * y) % 5 === 0;
              return filled ? (
                <rect key={i} x={x} y={y} width={1} height={1} fill="currentColor" />
              ) : null;
            })}
          </svg>
        </div>
        <p className="mt-2 text-xs text-white/40">QR code to support Desi Mahol</p>

        <a
          href="#"
          onClick={(event) => event.preventDefault()}
          className="mt-4 inline-block text-xs font-semibold text-amber-400 underline decoration-amber-500/40 hover:text-amber-300"
        >
          Download QR Code
        </a>
        <p className="mt-1 text-[11px] text-white/40">Save it and scan with any UPI app.</p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 text-xs text-white/50 underline hover:text-white/80"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
