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
        <p className="chapter-label">개발 경험</p>
        <h2 id="impact-title">
          웹에서 앱까지,
          <br />
          <span>개발 범위를 넓혔습니다.</span>
        </h2>
        <p>
          여러 도메인의 웹 개발과 운영 앱의 유지보수.
          <br />
          실제 작업 기록으로 확인할 수 있는 개발 경험입니다.
        </p>
      </div>
      <motion.div className="impact-board" style={reduced ? { y: 0 } : { y }}>
        {children}
      </motion.div>
      <p className="impact-note">참여 프로젝트 수와 코드 변경 범위입니다.</p>
    </section>
  );
}
