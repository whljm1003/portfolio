import type { NextPage } from "next";
import About from "../components/about";
import Skills from "../components/skills";
import Career from "../components/career";
import Projects from "../components/projects";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useViewportScroll } from "framer-motion";

const Home: NextPage = () => {
  const [yProgress, setYProgress] = useState<number>(0);
  const tabRef = useRef<Array<HTMLElement>>([]);
  //  Hook for scroll y
  const { scrollYProgress } = useViewportScroll();
  /* trigger when scroll is updated */
  useEffect(() => {
    return scrollYProgress.onChange((yScrollValue) =>
      setYProgress(yScrollValue)
    );
  }, [scrollYProgress]);

  return (
    <div className="relative">
      <Header tabRef={tabRef} yProgress={yProgress} />
      <div className="flex w-full flex-col items-center justify-center bg-gray-100 text-gray-700">
        <Main tabRef={tabRef} />
        <About tabRef={tabRef} />
        <Skills tabRef={tabRef} />
        <Career tabRef={tabRef} />
        <Projects tabRef={tabRef} />
      </div>
      <Footer />
      <button
        onClick={() => tabRef.current[0].scrollIntoView({ behavior: "smooth" })}
        className={`group fixed bottom-6 right-6 z-50 h-12 w-12 rounded-xl bg-slate-800 ${
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
};

export default Home;
