import type { NextPage } from "next";
import About from "../components/about";
import Skills from "../components/skills";
import Career from "../components/career";
import Projects from "../components/projects";
import Header from "../components/header";
import Footer from "../components/footer";
import Main from "../components/intro";
const Home: NextPage = () => {
  return (
    <div className="">
      <Header />
      <div className="flex w-full flex-col items-center justify-center bg-gray-100 text-gray-700">
        <section className="w-full bg-blue-400">
          <Main />
        </section>
        <section className="w-full">
          <About />
        </section>
        <section className="w-full bg-[#f9c51d]">
          <Skills />
        </section>
        <section className="w-full">
          <Career />
        </section>
        <section className="w-full bg-[#1d809f]">
          <Projects />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
