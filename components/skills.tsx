import type { NextPage } from "next";
import Image from "next/image";
import front from "../image/css/front-end.png";
import git from "../image/css/git.png";
import deployment from "../image/css/deployment.png";

const About: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-5 md:flex-row md:p-16">
      <section className="text-red flex h-[100%] w-[100%] items-center md:mr-10 md:h-[80%]">
        <div className="h-full w-full rounded-xl bg-[#F5F5F5] p-3">
          <h1 className="inline-block border-b-4 border-black text-xl font-extrabold ">
            Frontend
          </h1>
          <div className="relative h-[90%] w-full ">
            <Image layout="fill" src={front} alt="html" />
          </div>
        </div>
      </section>
      <section className="text-blue md:1/2 mt-10 flex h-full w-full flex-col justify-between md:mt-0 md:h-[80%]">
        <div className=" mb-10 h-2/4 w-[100%] rounded-xl bg-[#F5F5F5] p-3">
          <h1 className="mb-2 inline-block border-b-4 border-black text-xl font-extrabold">
            Deployment
          </h1>
          <div className="relative h-[80%] w-[80%]  ">
            <Image layout="fill" src={deployment} alt="html" />
          </div>
        </div>
        <div className="h-2/4 w-full rounded-xl bg-[#F5F5F5] p-3">
          <h1 className="mb-2 inline-block border-b-4 border-black text-xl font-extrabold ">
            Version Control
          </h1>
          <div className="relative h-[80%] w-[80%] ">
            <Image layout="fill" src={git} alt="html" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
