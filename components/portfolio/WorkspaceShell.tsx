"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { motion, stagger, useAnimate, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { FiArrowLeft } from "react-icons/fi";

type ReturnPoint = {
  trigger: HTMLAnchorElement;
  x: number;
  y: number;
  anchor: HTMLElement;
  offset: number;
  scene?: { container: HTMLElement; progress: number };
};

type DetailPosition = {
  panelY?: number;
  documentOffset?: number;
};

const detailTransition = {
  duration: 0.36,
  ease: [0.22, 1, 0.36, 1],
} as const;
const mobileQuery = "(max-width: 1279px)";

function settleLayout(
  main: HTMLElement,
  repair: () => void,
  anchor?: HTMLElement,
) {
  let frame = 0;
  let count = 0;
  let stable = 0;
  let previous = "";
  let stopped = false;
  function sceneLayoutChanged() {
    stable = 0;
    repair();
  }
  function stop() {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(frame);
    main.removeEventListener("portfolio:scene-layout", sceneLayoutChanged);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
  }
  function tick() {
    if (stopped) return;
    repair();
    const top = anchor
      ? anchor.getBoundingClientRect().top + window.scrollY
      : 0;
    const size = `${main.clientWidth}:${main.offsetHeight}:${Math.round(top)}`;
    stable = size === previous ? stable + 1 : 0;
    previous = size;
    if (stable >= 4 || ++count >= 60) stop();
    else frame = requestAnimationFrame(tick);
  }
  main.addEventListener("portfolio:scene-layout", sceneLayoutChanged);
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  repair();
  frame = requestAnimationFrame(tick);
  return stop;
}

export default function WorkspaceShell({
  children,
  detail,
}: {
  children: ReactNode;
  detail: ReactNode;
}) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments("detail");
  const workSegment = segments.indexOf("(.)work");
  const slug = workSegment >= 0 ? (segments[workSegment + 1] ?? null) : null;
  const isDetailOpen = slug !== null;
  const reducedMotion = useReducedMotion();
  const mainRef = useRef<HTMLDivElement>(null);
  const previousSlug = useRef<string | null>(null);
  const returnPoints = useRef(new Map<string, ReturnPoint>());
  const stopSettling = useRef<(() => void) | null>(null);
  const pendingNavigation = useRef<string | null>(null);
  const restoreMainOnClose = useRef(true);
  const detailPositions = useRef(new Map<string, DetailPosition>());
  const preparedSlug = useRef<string | null>(null);
  const detailPanel = useRef<HTMLElement>(null);
  const documentMode = useRef(false);
  const [detailScope, animate] = useAnimate<HTMLDivElement>();

  const saveDetailScroll = useCallback(() => {
    const activeSlug = preparedSlug.current;
    const panel = detailPanel.current;
    if (activeSlug && panel) {
      const saved = detailPositions.current.get(activeSlug);
      if (window.matchMedia(mobileQuery).matches !== documentMode.current)
        return;
      const position = documentMode.current
        ? { documentOffset: -panel.getBoundingClientRect().top }
        : { panelY: panel.scrollTop };
      detailPositions.current.set(activeSlug, { ...saved, ...position });
    }
  }, []);

  function rememberTrigger(event: MouseEvent<HTMLDivElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !(event.target instanceof Element)
    ) {
      return;
    }

    const trigger = event.target.closest<HTMLAnchorElement>("a[href]");
    if (
      !trigger ||
      trigger.target === "_blank" ||
      trigger.hasAttribute("download")
    ) {
      return;
    }

    const url = new URL(trigger.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    saveDetailScroll();
    if (url.pathname === "/") {
      restoreMainOnClose.current = false;
      if (isDetailOpen) {
        event.preventDefault();
        pendingNavigation.current = url.hash || "#top";
        router.push(`${url.pathname}${url.search}${url.hash}`, {
          scroll: false,
        });
      }
      return;
    }
    const match = url.pathname.match(/^\/work\/([^/]+)\/?$/);
    if (!match) return;

    restoreMainOnClose.current = true;
    const anchor = trigger.closest<HTMLElement>(".work-item") ?? trigger;
    const scene = trigger.closest<HTMLElement>(".capability-runway");
    const start = scene
      ? scene.getBoundingClientRect().top + window.scrollY
      : 0;
    const duration = scene ? scene.offsetHeight - window.innerHeight : 0;
    returnPoints.current.set(decodeURIComponent(match[1]), {
      trigger,
      x: window.scrollX,
      y: window.scrollY,
      anchor,
      offset: anchor.getBoundingClientRect().top,
      scene:
        scene && duration > 0
          ? {
              container: scene,
              progress: Math.max(
                0,
                Math.min(1, (window.scrollY - start) / duration),
              ),
            }
          : undefined,
    });
  }

  const restoreTrigger = useCallback((point: ReturnPoint) => {
    const trigger = point.trigger.isConnected
      ? point.trigger
      : mainRef.current?.querySelector<HTMLAnchorElement>(
          `a[href="${point.trigger.getAttribute("href")}"]`,
        );
    trigger?.focus({ preventScroll: true });
    preservePoint(point);
  }, []);

  function preservePoint(point: ReturnPoint) {
    const scene = point.scene?.container;
    const anchor = point.anchor.isConnected ? point.anchor : point.trigger;
    const top =
      scene?.isConnected && point.scene
        ? scene.getBoundingClientRect().top +
          window.scrollY +
          Math.max(0, scene.offsetHeight - window.innerHeight) *
            point.scene.progress
        : anchor.isConnected
          ? anchor.getBoundingClientRect().top + window.scrollY - point.offset
          : point.y;
    window.scrollTo({ left: point.x, top, behavior: "instant" });
  }

  function alignHash(hash: string) {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    const target = document.getElementById(id || "top");
    if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
  }

  useLayoutEffect(() => {
    const lastSlug = previousSlug.current;
    previousSlug.current = slug;
    preparedSlug.current = null;

    if (!slug) {
      const shouldRestore = restoreMainOnClose.current;
      restoreMainOnClose.current = true;
      stopSettling.current?.();
      if (!shouldRestore) {
        const hash = pendingNavigation.current ?? window.location.hash;
        pendingNavigation.current = null;
        if (mainRef.current)
          stopSettling.current = settleLayout(mainRef.current, () =>
            alignHash(hash),
          );
        return () => stopSettling.current?.();
      }
      const point = lastSlug ? returnPoints.current.get(lastSlug) : undefined;
      if (mainRef.current) {
        if (point) {
          stopSettling.current = settleLayout(
            mainRef.current,
            () => restoreTrigger(point),
            point.anchor,
          );
        } else if (window.location.hash) {
          stopSettling.current = settleLayout(mainRef.current, () =>
            alignHash(window.location.hash),
          );
        }
      }
      return () => stopSettling.current?.();
    }

    stopSettling.current?.();
    restoreMainOnClose.current = true;
    const currentSlug = slug;
    let frame = 0;
    let observer: MutationObserver | undefined;
    let animation: ReturnType<typeof animate> | undefined;
    documentMode.current = window.matchMedia(mobileQuery).matches;
    const point = returnPoints.current.get(currentSlug);
    if (point && !documentMode.current && mainRef.current) {
      stopSettling.current = settleLayout(
        mainRef.current,
        () => preservePoint(point),
        point.anchor,
      );
    }

    function prepareDetail() {
      const scope = detailScope.current;
      const title = scope?.querySelector<HTMLElement>(
        `[id="inline-case-title-${currentSlug}"]`,
      );
      if (!title || !scope) return false;

      observer?.disconnect();
      frame = requestAnimationFrame(() => {
        const container = scope.closest<HTMLElement>(".workspace-detail");
        const saved = detailPositions.current.get(currentSlug);
        const mobile = documentMode.current;
        const isRestoring = mobile
          ? saved?.documentOffset !== undefined
          : (saved?.panelY ?? 0) > 0;
        if (container && !mobile) container.scrollTop = saved?.panelY ?? 0;
        if (container && isRestoring) {
          container.focus({ preventScroll: true });
        } else {
          title.focus({ preventScroll: true });
        }
        if (mobile) {
          if (container && saved?.documentOffset !== undefined) {
            window.scrollTo({
              top:
                container.getBoundingClientRect().top +
                window.scrollY +
                saved.documentOffset,
              behavior: "instant",
            });
          } else {
            title.scrollIntoView({ block: "start", behavior: "instant" });
          }
        }
        preparedSlug.current = currentSlug;

        if (!reducedMotion) {
          const sections = scope.querySelectorAll(
            ".detail-title, .detail-meta, .detail-visual, .case-section, .detail-gallery, .detail-next",
          );
          if (sections.length > 0) {
            animation = animate(
              sections,
              { y: [8, 0] },
              {
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
                delay: stagger(0.02, { from: "first" }),
              },
            );
          }
        }
      });
      return true;
    }

    if (!prepareDetail() && detailScope.current) {
      observer = new MutationObserver(prepareDetail);
      observer.observe(detailScope.current, { childList: true, subtree: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      animation?.stop();
      stopSettling.current?.();
    };
  }, [slug, reducedMotion, detailScope, animate, restoreTrigger]);

  useEffect(() => {
    window.addEventListener("popstate", saveDetailScroll);
    return () => window.removeEventListener("popstate", saveDetailScroll);
  }, [saveDetailScroll]);

  useLayoutEffect(() => {
    if (!slug) return;
    const media = window.matchMedia(mobileQuery);
    let frame = 0;
    function convertPosition() {
      const panel = detailPanel.current;
      if (!panel) return;
      const saved = detailPositions.current.get(slug!);
      stopSettling.current?.();
      documentMode.current = media.matches;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const inset =
          parseFloat(
            getComputedStyle(document.documentElement).scrollPaddingTop,
          ) || 0;
        if (media.matches) {
          const offset = Math.max(0, saved?.panelY ?? 0);
          if (mainRef.current)
            stopSettling.current = settleLayout(mainRef.current, () => {
              window.scrollTo({
                top:
                  panel.getBoundingClientRect().top +
                  window.scrollY +
                  offset -
                  inset,
                behavior: "instant",
              });
            });
        } else {
          panel.scrollTop = Math.max(0, (saved?.documentOffset ?? 0) + inset);
          const point = returnPoints.current.get(slug!);
          if (point && mainRef.current) {
            stopSettling.current?.();
            stopSettling.current = settleLayout(
              mainRef.current,
              () => preservePoint(point),
              point.anchor,
            );
          }
        }
        saveDetailScroll();
      });
    }
    media.addEventListener("change", convertPosition);
    window.addEventListener("scroll", saveDetailScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", convertPosition);
      window.removeEventListener("scroll", saveDetailScroll);
    };
  }, [slug, saveDetailScroll]);

  useEffect(() => {
    if (!isDetailOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      saveDetailScroll();
      restoreMainOnClose.current = true;
      router.push("/#work", { scroll: false });
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isDetailOpen, router, saveDetailScroll]);

  return (
    <div
      className="portfolio-workspace"
      data-detail-open={isDetailOpen ? "true" : "false"}
    >
      <div
        ref={mainRef}
        className="workspace-main"
        onClickCapture={rememberTrigger}
      >
        {children}
      </div>
      {isDetailOpen ? (
        <motion.aside
          ref={detailPanel}
          className="workspace-detail"
          role="region"
          aria-label="사례 상세"
          tabIndex={-1}
          onScroll={() => {
            if (slug && preparedSlug.current === slug) {
              saveDetailScroll();
            }
          }}
          initial={reducedMotion ? false : { x: 16 }}
          animate={{ x: 0 }}
          transition={detailTransition}
        >
          <div className="workspace-detail-toolbar">
            <span>작업 상세</span>
            <Link
              href="/#work"
              scroll={false}
              className="workspace-close"
              onClick={() => {
                saveDetailScroll();
                restoreMainOnClose.current = true;
              }}
            >
              <FiArrowLeft aria-hidden="true" />
              상세 닫기
            </Link>
          </div>
          <div ref={detailScope} className="workspace-detail-content">
            {detail}
          </div>
        </motion.aside>
      ) : null}
    </div>
  );
}
