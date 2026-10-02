"use client";

import Link from "next/link";
import {
  easeInOut,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import useScrollScene from "@/hooks/useScrollScene";

const capabilities = [
  {
    word: "INTERFACE",
    title: "사용자 경험을 완성합니다.",
    description:
      "방문자 예약의 다단계 입력과 검증을 구성합니다. 폼 로직을 공유하며 모바일·데스크톱 UI와 웹·앱 이동을 연결합니다.",
    skills: ["React", "Next.js", "TypeScript"],
    slug: "officener-web",
    tone: "olive",
  },
  {
    word: "SYSTEM",
    title: "복잡한 흐름을 정리합니다.",
    description:
      "WebView의 뒤로가기 요청·응답과 키보드·스크롤을 다룹니다. 로그아웃·다운로드·캐시 오류도 원인을 따라 수정합니다.",
    skills: ["React Query", "React Native", "테스트"],
    slug: "officener-app",
    tone: "paper",
  },
  {
    word: "DELIVERY",
    title: "출시 이후까지 이어갑니다.",
    description:
      "운영 앱의 RN 업그레이드에 기여하고, 테스트·빌드 절차와 Sentry 오류 분석 정보를 보강하는 작업에 참여합니다.",
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
  artwork,
}: {
  item: (typeof capabilities)[number];
  index: number;
  progress: MotionValue<number>;
  enhanced: boolean;
  onFocus: (index: number) => void;
  artwork: ReactNode;
}) {
  const scale = useTransform(
    progress,
    (value) =>
      1 -
      easeInOut(
        Math.min(1, Math.abs(value * (capabilities.length - 1) - index)),
      ) *
        0.12,
  );

  return (
    <motion.article
      className={`capability-card capability-card--${item.tone}`}
      style={enhanced ? { scale } : { scale: 1 }}
      onFocusCapture={(event) => {
        if (
          event.target instanceof HTMLElement &&
          event.target.matches(":focus-visible")
        )
          onFocus(index);
      }}
    >
      <span className="capability-word" aria-hidden="true">
        {item.word}
      </span>
      <div className="capability-body">
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
        <div className="capability-visual">{artwork}</div>
      </div>
    </motion.article>
  );
}

export default function CapabilityScene({
  artworks,
}: {
  artworks: ReactNode[];
}) {
  const runway = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const preserveFocus = useRef(false);
  const enhanced = useScrollScene();
  const distance = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: runway,
    offset: ["start start", "end end"],
  });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  const showFocusedCard = useCallback(
    (index: number) => {
      const container = runway.current;
      if (!container) return;
      preserveFocus.current = true;
      if (!enhanced) {
        const focused = document.activeElement;
        if (focused instanceof HTMLElement && container.contains(focused)) {
          focused.scrollIntoView({
            block: "nearest",
            inline: "nearest",
            behavior: "instant",
          });
        }
        return;
      }
      const start = container.getBoundingClientRect().top + window.scrollY;
      const duration = Math.max(0, container.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: start + (duration * index) / (capabilities.length - 1),
        behavior: "instant",
      });
    },
    [enhanced],
  );

  useEffect(() => {
    const frame = viewport.current;
    const container = runway.current;
    if (!frame || !container) return;
    let focusFrame: number | undefined;
    let measuredWidth = 0;
    let measuredHeight = 0;
    function rememberVisibleFocus() {
      if (!frame || focusFrame !== undefined) return;
      if (
        frame.clientWidth !== measuredWidth ||
        frame.clientHeight !== measuredHeight
      ) {
        return;
      }
      const focused = document.activeElement;
      if (!focused || !frame.contains(focused)) {
        preserveFocus.current = false;
        return;
      }
      const frameBounds = frame.getBoundingClientRect();
      // 모션 적용 전 링크 좌표 대신 장면이 보이는지 확인한다.
      preserveFocus.current =
        frameBounds.bottom > 0 && frameBounds.top < window.innerHeight;
    }
    function measure() {
      if (!frame || !container) return;
      measuredWidth = frame.clientWidth;
      measuredHeight = frame.clientHeight;
      const travel = enhanced ? measuredWidth * (capabilities.length - 1) : 0;
      distance.set(travel);
      container.style.setProperty("--scene-travel", `${travel}px`);
      // 상위 크기를 중복 관찰하지 않고 같은 프레임에서 읽기 위치를 보정한다.
      container.dispatchEvent(
        new Event("portfolio:scene-layout", { bubbles: true }),
      );
      if (focusFrame !== undefined) cancelAnimationFrame(focusFrame);
      focusFrame = requestAnimationFrame(() => {
        focusFrame = undefined;
        if (!preserveFocus.current) return;
        const focused = document.activeElement;
        if (!focused || !frame.contains(focused)) return;
        const cards = Array.from(frame.querySelectorAll(".capability-card"));
        const index = cards.findIndex((card) => card.contains(focused));
        if (index >= 0) showFocusedCard(index);
      });
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    window.addEventListener("scroll", rememberVisibleFocus, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", rememberVisibleFocus);
      if (focusFrame !== undefined) cancelAnimationFrame(focusFrame);
    };
  }, [distance, enhanced, showFocusedCard]);

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
      <div
        className="capability-runway"
        ref={runway}
        data-scroll-scene={enhanced}
      >
        <div className="capability-viewport" ref={viewport}>
          <motion.div
            className="capability-track"
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
                artwork={artworks[index]}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
