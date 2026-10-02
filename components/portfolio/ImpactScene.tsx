"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

export default function ImpactScene({ children }: { children: ReactNode }) {
  const target = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const x = useTransform(progress, [0, 1], ["8%", "-8%"]);
  const y = useTransform(progress, [0, 1], [70, -35]);

  return (
    <section
      id="impact"
      className="impact-section"
      aria-labelledby="impact-title"
      ref={target}
    >
      <motion.span
        className="impact-word"
        aria-hidden="true"
        style={reduced ? { x: 0 } : { x }}
      >
        IMPACT
      </motion.span>
      <div className="impact-heading">
        <p className="chapter-label">성과</p>
        <h2 id="impact-title">
          경험을 개선하고,
          <br />
          <span>결과로 연결합니다.</span>
        </h2>
        <p>
          사용자 경험, 서비스 안정성, 개발 생산성.
          <br />
          제품을 더 좋게 만드는 세 가지 관점입니다.
        </p>
      </div>
      <motion.div className="impact-board" style={reduced ? { y: 0 } : { y }}>
        {children}
      </motion.div>
      <p className="impact-note">
        성과 수치는 측정 근거를 확인한 뒤 공개합니다.
      </p>
    </section>
  );
}
