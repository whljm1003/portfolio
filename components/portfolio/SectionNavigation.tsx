"use client";

import Link from "next/link";
import { portfolioNavigation } from "@/lib/portfolio-navigation";
import useActiveSection from "@/hooks/useActiveSection";

export default function SectionNavigation() {
  const active = useActiveSection();

  return (
    <nav className="desktop-nav" aria-label="주 내비게이션">
      {portfolioNavigation.map(([id, label]) => (
        <Link
          key={id}
          href={`/#${id}`}
          aria-current={active === id ? "location" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
