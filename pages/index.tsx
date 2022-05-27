import type { NextPage } from "next";
import About from "../components/about";
import Skills from "../components/skills";
import Career from "../components/career";
import Contack from "../components/contack";
import Header from "../components/header";
import Footer from "../components/footer";
const Home: NextPage = () => {
  return (
    <div className="">
      <Header />
      <div className="flex w-full flex-col items-center justify-center bg-gray-800">
        <About />
        {/* <Skills />
        <Career />
        <Contack /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
