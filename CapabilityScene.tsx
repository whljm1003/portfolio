"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef } from "react";
import useScrollScene from "@/hooks/useScrollScene";

const capabilities = [
  {
    word: "INTERFACE",
    title: "사용자 경험을 완성합니다.",
    description:
      "화면의 구성부터 입력, 상태, 다음 행동까지. React와 TypeScript로 사용자가 자연스럽게 이어갈 수 있는 흐름을 만듭니다.",
    skills: ["React", "Next.js", "TypeScript"],
    slug: "officener-web",
    tone: "olive",
  },
  {
    word: "SYSTEM",
    title: "복잡한 흐름을 정리합니다.",
    description:
      "인증과 캐시, 웹과 네이티브의 경계에서 원인을 찾습니다. 반복되는 문제를 구조와 테스트로 풀어냅니다.",
    skills: ["React Query", "React Native", "테스트"],
    slug: "officener-app",
    tone: "paper",
  },
  {
    word: "DELIVERY",
    title: "출시 이후까지 이어갑니다.",
    description:
      "버전과 배포 절차를 정리하고, 오류를 다음 개선의 단서로 남깁니다. 제품이 계속 좋아질 수 있는 기반을 다집니다.",
    skills: ["fastlane", "OTA", "Sentry"],
    slug: "app-release",
    tone: "brick",
  },
];

function CapabilityCard({
  item,
  index,
  progress,
  enhanced,
  onFocus,
}: {
  item: (typeof capabilities)[number];
  index: number;
  progress: MotionValue<number>;
  enhanced: boolean;
  onFocus: (index: number) => void;
}) {
  const scale = useTransform(progress, (value) =>
    Math.max(0.88, 1 - Math.abs(value * (capabilities.length - 1) - index) * 0.12),
  );

  return (
    <motion.article
      className={`capability-card capability-card--${item.tone}`}
      style={enhanced ? { scale } : { scale: 1 }}
      onFocusCapture={() => onFocus(index)}
    >
      <span className="capability-word" aria-hidden="true">
        {item.word}
      </span>
      <div className="capability-copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="capability-skills" aria-label="관련 역량">
          {item.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        <Link
          href={`/work/${item.slug}`}
          scroll={false}
          className="text-link"
          aria-label={`${item.title} 관련 사례 보기`}
        >
          관련 사례 보기
        </Link>
      </div>
    </motion.article>
  );
}

export default function CapabilityScene() {
  const runway = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const enhanced = useScrollScene();
  const distance = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: runway,
    offset: ["start start", "end end"],
  });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  useEffect(() => {
    const frame = viewport.current;
    const container = runway.current;
    if (!frame || !container) return;
    function measure() {
      if (!frame || !container) return;
      const travel = enhanced ? frame.clientWidth * (capabilities.length - 1) : 0;
      distance.set(travel);
      container.style.setProperty("--scene-travel", `${travel}px`);
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [distance, enhanced]);

  function showFocusedCard(index: number) {
    if (!enhanced || !runway.current) return;
    const container = runway.current;
    const start = container.getBoundingClientRect().top + window.scrollY;
    const duration = Math.max(0, container.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: start + (duration * index) / (capabilities.length - 1),
      behavior: "instant",
    });
  }

  return (
    <section
      id="capabilities"
      className="capability-section"
      aria-labelledby="capability-title"
    >
      <div className="capability-heading">
        <p className="chapter-label">역량</p>
        <h2 id="capability-title">
          제품의 처음부터,
          <br />
          다음 변화까지.
        </h2>
      </div>
      <div className="capability-runway" ref={runway} data-scroll-scene={enhanced}>
        <div className="capability-viewport" ref={viewport}>
          <motion.div
            className="capability-track"
            ref={track}
            style={enhanced ? { x } : { x: 0 }}
          >
            {capabilities.map((item, index) => (
              <CapabilityCard
                key={item.word}
                item={item}
                index={index}
                progress={scrollYProgress}
                enhanced={enhanced}
                onFocus={showFocusedCard}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
