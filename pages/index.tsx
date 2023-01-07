import type { NextPage } from "next";
import About from "../components/about";
import Skills from "../components/skills";
import Career from "../components/career";
import Projects from "../components/projects";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useViewportScroll } from "framer-motion";

const Home: NextPage = () => {
  const [yProgress, setYProgress] = useState<number>(0);
  const tabRef = useRef<Array<HTMLElement>>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  //  Hook for scroll y
  const { scrollYProgress } = useViewportScroll();
  /* trigger when scroll is updated */

  const makeSnowflake = useCallback(() => {
    const MIN_DURATION = 10;
    const snowflake = document.createElement("div");
    const delay = Math.random() * 10;
    const initialOpacity = Math.random().toString();
    const duration = Math.random() * 10 + MIN_DURATION;

    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random() * window.screen.width}px`;
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.opacity = initialOpacity;
    snowflake.style.animation = `fall ${duration}s linear`;
    snowflake.style.zIndex = "9999";

    // 사용법 익힌 후 다시 수정
    // snowflake.animate(
    //   [{ transform: "translateY(0)" }, { transform: "translateY(6822px)" }],
    //   {
    //     duration: duration,
    //     delay: delay,
    //   }
    // );

    bodyRef.current?.appendChild(snowflake);

    setTimeout(() => {
      bodyRef.current?.removeChild(snowflake);
      makeSnowflake();
    }, (duration + delay) * 1000);
  }, [bodyRef]);

  useEffect(() => {
    const length = Array.from({ length: 400 }, (_, i) => i);
    length.forEach((el, idx) => {
      setTimeout(makeSnowflake, 500 * idx);
    });
  }, []);

  useEffect(() => {
    return scrollYProgress.onChange((yScrollValue) =>
      setYProgress(yScrollValue)
    );
  }, [scrollYProgress]);

  return (
    <div id="proejct_body" ref={bodyRef} className="relative">
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
