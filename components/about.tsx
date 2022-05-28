import type { NextPage } from "next";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone, AiFillGithub } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";

const About: NextPage = () => {
  return (
    <div className="justify-centerpy-5 m-auto my-16 flex w-full max-w-5xl flex-col items-center">
      <h1 className="mb-5 border-b-2 border-black text-4xl font-bold leading-[1.5]">
        ABOUT ME
      </h1>
      <div className="flex w-full flex-wrap items-center space-y-3">
        <div className="flex w-1/2 items-center justify-center space-x-5">
          <BsFillPersonFill size={40} />
          <div className="w-1/2 space-y-2">
            <div className="text-2xl font-bold">이름</div>
            <div className="text-base">이정민</div>
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-center space-x-5">
          <AiFillPhone size={40} />
          <div className="w-1/2 space-y-2">
            <div className="text-2xl font-bold">연락처</div>
            <div className="text-base">010-4998-8965</div>
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-center space-x-5">
          <IoMdMail size={40} />
          <div className="w-1/2 space-y-2">
            <div className="text-2xl font-bold">이메일</div>
            <div className="text-base">whljm1003@gmail.com</div>
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-center space-x-5">
          <AiFillGithub size={40} />
          <div className="w-1/2 space-y-2">
            <div className="text-2xl font-bold">Github</div>
            <div className="text-base">whljm1003@github</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
