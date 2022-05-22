import type { NextPage } from "next";
import Image from "next/image";
import img1 from "../image/AREmoji_20220111_135801_52.gif";

const About: NextPage = () => {
  return (
    <div className="flex h-full w-full max-w-7xl flex-col  justify-center ">
      <div className="mt-5 flex justify-center md:mt-0">
        <Image className=" rounded-full" src={img1} width={300} height={300} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-8 text-xl text-white md:text-5xl">
          Hello, I'm an Front-end Developer.
        </h1>
        <p className="p-2 text-[16px] text-white md:text-lg">
          안녕하세요. 프론트엔드 개발자 이정민입니다. <br />
          배포를 통한 사용자 피드백과 비즈니스적 관점에서 고객 UI/UX에 대해 한번
          더 생각하는 개발자입니다. <br />
          원티드 프리온보딩 프론트엔드를 하며 팀과제8개와 개인과제1개를
          하였습니다. <br />
          이러한 경험을 통해서 설계와 협업에 대해 배울 수 있었습니다. <br />
          서비스에 대해 생각하고 몰입하며 웹 표준과 접근성을 고려하며
          개발합니다. <br />
        </p>
        <button className="mt-5 w-40 bg-blue-600 font-bold leading-8 text-blue-200">
          Contack me!
        </button>
      </div>
    </div>
  );
};

export default About;
