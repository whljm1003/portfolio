"use client";

import {
  easeInOut,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import useScrollScene from "@/hooks/useScrollScene";

export default function HeroScene({ children }: { children: ReactNode }) {
  const target = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const enhanced = useScrollScene();
  const maximumScale = useMotionValue(1);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(() => {
    const progress = Math.max(0, Math.min(1, scrollYProgress.get()));
    return 1 + easeInOut(progress) * (maximumScale.get() - 1);
  });

  useEffect(() => {
    const frame = stage.current;
    const content = copy.current;
    if (!enhanced || !frame || !content) {
      maximumScale.set(1);
      return;
    }

    function measure() {
      if (!frame || !content || !content.offsetWidth || !content.offsetHeight)
        return;
      const inset = parseFloat(getComputedStyle(frame).top) || 0;
      const height = Math.min(frame.clientHeight, window.innerHeight - inset);
      const fit = Math.min(
        frame.clientWidth / content.offsetWidth,
        height / content.offsetHeight,
      );
      maximumScale.set(Math.max(1, Math.min(1.5, fit * 0.97)));
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(content);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enhanced, maximumScale]);

  return (
    <section
      id="intro"
      className="hero"
      aria-labelledby="hero-title"
      ref={target}
      data-scroll-scene={enhanced}
    >
      <div className="hero-stage" ref={stage}>
        <motion.div
          className="hero-copy"
          ref={copy}
          style={{ scale: enhanced ? scale : 1 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
