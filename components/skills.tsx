import type { NextPage } from "next";
import Image from "next/image";
import img1 from "../image/AREmoji_20220111_135801_52.gif";

const About: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center border border-red-500 bg-gray-800 p-10">
      <h1 className="text-white">skills</h1>
      <div className="">Frontend</div>
      <div className="">Backend</div>
      <div className="">Deployment</div>
      <div className="">Version Control</div>
    </div>
  );
};

export default About;
