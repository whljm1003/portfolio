"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import WorkTilt from "./WorkTilt";

type Category = "app" | "web" | "operations" | "archive";
interface WorkItem {
  slug: string;
  category: Category;
  content: ReactNode;
}
const filters = [
  { id: "all", label: "전체" },
  { id: "app", label: "앱 개발" },
  { id: "web", label: "웹 개발" },
  { id: "operations", label: "업데이트·운영" },
] as const;

export default function WorkExplorer({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");
  const reduced = useReducedMotion();
  const visible =
    active === "all" ? items : items.filter((item) => item.category === active);

  return (
    <>
      <div className="work-toolbar">
        <div className="work-filters" role="group" aria-label="작업 필터">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={active === filter.id}
              aria-controls="work-results"
              onClick={() => setActive(filter.id)}
            >
              {filter.label}
              <span className="filter-count" aria-hidden="true">
                {filter.id === "all"
                  ? items.length
                  : items.filter((item) => item.category === filter.id).length}
              </span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {filters.find((filter) => filter.id === active)?.label} 작업{" "}
          {visible.length}개
        </p>
      </div>
      <div
        id="work-results"
        className={`work-grid ${active !== "all" ? "is-filtered" : ""}`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((item) => (
            <motion.div
              key={item.slug}
              className={`work-item work-item-${item.category}`}
              data-testid="project-card"
              data-category={item.category}
              layout={reduced ? false : "position"}
              layoutDependency={active}
              initial={reduced ? false : { y: 28, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: reduced ? 0 : -16, scale: reduced ? 1 : 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              <WorkTilt>{item.content}</WorkTilt>
            </motion.div>
          ))}
        </AnimatePresence>
        {visible.length === 0 ? (
          <p className="empty-state">
            이 분류의 작업은 아직 없습니다. 전체 작업을 확인해 주세요.
          </p>
        ) : null}
      </div>
    </>
  );
}
