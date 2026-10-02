"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";

export default function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const frame = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <span
      className="magnetic-frame"
      ref={frame}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse" || !frame.current) return;
        const bounds = frame.current.getBoundingClientRect();
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.22);
      }}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <motion.span
        className="magnetic-target"
        style={reduced ? { x: 0, y: 0 } : { x: springX, y: springY }}
      >
        <Link href={href} className={className}>
          {children}
        </Link>
      </motion.span>
    </span>
  );
}
