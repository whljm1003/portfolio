"use client";
import React, { useEffect, useRef, useState } from "react";
import About from "../components/about";
import Skills from "../components/skills";
import Career from "../components/career";
import Projects from "../components/projects";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useScroll } from "framer-motion";
import Education from "@/components/education";

type Props = {};

export default function Home({}: Props) {
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
        <Main tabRef={tabRef} />
        <About tabRef={tabRef} />
        <Skills tabRef={tabRef} />
        <Career tabRef={tabRef} />
        <Projects tabRef={tabRef} />
        <Education tabRef={tabRef} />
      </div>
      <Footer />
      <button
        onClick={() => tabRef.current[0].scrollIntoView({ behavior: "smooth" })}
        className={`group fixed bottom-6 right-6 z-40 h-12 w-12 rounded-xl bg-slate-800 ${
          yProgress === 0 && "hidden"
        }`}
      >
        <FaAngleDoubleUp
          className="m-auto group-hover:animate-bounce"
          size={26}
          color="white"
        />
      </button>
    </div>
  );
}
