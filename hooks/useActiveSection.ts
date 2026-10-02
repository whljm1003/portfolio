"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { portfolioNavigation } from "@/lib/portfolio-navigation";

export default function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  const atEnd = useRef(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const end = progress >= 0.999;
    if (atEnd.current === end) return;
    atEnd.current = end;
    const marker = window.innerHeight * 0.3;
    const section = portfolioNavigation.find(([id]) => {
      const element = document.getElementById(id);
      if (!element) return false;
      if (end) return id === "contact";
      const bounds = element.getBoundingClientRect();
      return bounds.top <= marker && bounds.bottom > marker;
    });
    setActive(section?.[0] ?? null);
  });

  useEffect(() => {
    const sections = portfolioNavigation.flatMap(([id]) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        setActive(
          atEnd.current
            ? (sections.find((section) => section.id === "contact")?.id ?? null)
            : (sections.find((section) => visible.has(section.id))?.id ?? null),
        );
      },
      { rootMargin: "-30% 0px -69% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}
