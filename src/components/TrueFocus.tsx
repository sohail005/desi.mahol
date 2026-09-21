"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import "./TrueFocus.css";

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * The literal rendered ink box of `el`'s text, via Range.getBoundingClientRect()
 * on its text node — the same primitive the browser uses for text-selection
 * highlighting, so it hugs the actual glyph pixels. More reliable than
 * font-metric tricks (canvas metrics, `vertical-align: text-top/bottom`):
 * those measure the font's ascent/descent design metrics, which for a
 * script-spanning font like this one (tuned to fit tall Devanagari glyphs)
 * can sit well above the true Latin cap-height.
 */
function measureGlyphBox(el: HTMLElement): { top: number; height: number } | null {
  if (typeof document === "undefined") return null;
  const textNode = el.firstChild;
  if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return null;

  const range = document.createRange();
  range.selectNodeContents(textNode);
  const rect = range.getBoundingClientRect();
  if (rect.height <= 0) return null;
  return { top: rect.top, height: rect.height };
}

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export default function TrueFocus({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.5,
  className = "",
}: TrueFocusProps) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (manualMode) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    const activeEl = wordRefs.current[currentIndex];
    if (!activeEl || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    const glyphBox = measureGlyphBox(activeEl);

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: (glyphBox?.top ?? activeRect.top) - parentRect.top,
      width: activeRect.width,
      height: glyphBox?.height ?? activeRect.height,
    });
  }, [currentIndex, words.length]);

  function handleMouseEnter(index: number) {
    if (!manualMode) return;
    setLastActiveIndex(index);
    setCurrentIndex(index);
  }

  function handleMouseLeave() {
    if (!manualMode) return;
    if (lastActiveIndex !== null) setCurrentIndex(lastActiveIndex);
  }

  return (
    <div className={`focus-container ${className}`} ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={`focus-word ${manualMode ? "manual" : ""} ${isActive && !manualMode ? "active" : ""}`}
            style={
              {
                filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
                "--border-color": borderColor,
                "--glow-color": glowColor,
                transition: `filter ${animationDuration}s ease`,
              } as CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height/1.5,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={
          {
            "--border-color": borderColor,
            "--glow-color": glowColor,
          } as CSSProperties
        }
      >
        <span className="corner top-left" />
        <span className="corner top-right" />
        <span className="corner bottom-left" />
        <span className="corner bottom-right" />
      </motion.div>
    </div>
  );
}
