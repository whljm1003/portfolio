"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { ReactNode } from "react";

export default function WorkTilt({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 170, damping: 24 });
  const springY = useSpring(rotateY, { stiffness: 170, damping: 24 });

  return (
    <div
      className="work-tilt-frame"
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        rotateX.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 5);
        rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 7);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      <motion.div
        className="work-tilt"
        style={
          reduced
            ? { rotateX: 0, rotateY: 0 }
            : { rotateX: springX, rotateY: springY, transformPerspective: 1100 }
        }
        whileHover={reduced ? undefined : { y: -8 }}
        transition={{ type: "spring", stiffness: 180, damping: 24 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
