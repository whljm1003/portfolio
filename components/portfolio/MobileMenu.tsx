"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { portfolioNavigation } from "@/lib/portfolio-navigation";
import useActiveSection from "@/hooks/useActiveSection";

export default function MobileMenu() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
      </button>
      <nav id="mobile-navigation" aria-label="모바일 내비게이션" hidden={!open}>
        {portfolioNavigation.map(([id, label]) => (
          <Link
            key={id}
            href={`/#${id}`}
            onClick={() => setOpen(false)}
            aria-current={active === id ? "location" : undefined}
          >
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
