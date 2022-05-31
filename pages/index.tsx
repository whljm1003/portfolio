import type { NextPage } from "next";
import About from "../components/about";
import Skills from "../components/skills";
import Career from "../components/career";
import Projects from "../components/projects";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/main";
import React, { useRef } from "react";

const Home: NextPage = () => {
  const tabRef = useRef<Array<number>>([]);

  return (
    <div>
      <Header tabRef={tabRef} />
      <div className="flex w-full flex-col items-center justify-center bg-gray-100 text-gray-700">
        <Main tabRef={tabRef} />
        <About tabRef={tabRef} />
        <Skills tabRef={tabRef} />
        <Career tabRef={tabRef} />
        <Projects tabRef={tabRef} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
