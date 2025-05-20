"use client";
import React, { useEffect, useRef, useState } from "react";
import About from "../components/about";
import Skills from "../components/skills";
import Career from "../components/career";
import Projects from "../components/projects";
import Header from "../components/header";
import Footer from "../components/footer";
import { useScroll } from "framer-motion";
import Introduction from "./Introduction";

export default function Home() {
  const [yProgress, setYProgress] = useState<number>(0);
  const tabRef = useRef<Array<HTMLElement>>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setYProgress(latest);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div id="proejct_body" ref={bodyRef} className="relative">
      <Header tabRef={tabRef} yProgress={yProgress} />
      <div className="flex w-full flex-col items-center justify-center bg-gray-100 text-gray-700">
        <Introduction tabRef={tabRef} />
        <About tabRef={tabRef} />
        <Skills tabRef={tabRef} />
        <Career tabRef={tabRef} />
        <Projects tabRef={tabRef} />
      </div>
      <Footer />
    </div>
  );
}
