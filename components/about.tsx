import type { NextPage } from "next";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone, AiFillGithub } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";

const About: NextPage = () => {
  return (
    <div className="m-auto my-16 flex w-full max-w-5xl flex-col items-center">
      <h1 className="mb-10 border-b-2 border-black text-4xl font-bold leading-[1.5]">
        ABOUT ME
      </h1>
      <div className="items-cente flex w-full flex-wrap space-y-6">
        <div className="flex w-full items-center justify-center space-x-5 lg:w-1/2 ">
          <BsFillPersonFill size={40} />
          <div className="w-1/3 space-y-2">
            <div className="text-2xl font-bold">이름</div>
            <div className="text-base">이정민</div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center space-x-5 lg:w-1/2 ">
          <AiFillPhone size={40} />
          <div className="w-1/3 space-y-2">
            <div className="text-2xl font-bold">연락처</div>
            <div className="text-base">010-4998-8965</div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center space-x-5 lg:w-1/2 ">
          <IoMdMail size={40} />
          <div className="w-1/3 space-y-2">
            <div className="text-2xl font-bold">이메일</div>
            <div className="text-base">whljm1003@gmail.com</div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center space-x-5 lg:w-1/2 ">
          <AiFillGithub size={40} />
          <div className="w-1/3 space-y-2">
            <div className="text-2xl font-bold">Github</div>
            <div className="text-base">whljm1003@github</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
