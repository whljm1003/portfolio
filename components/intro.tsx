import type { NextPage } from "next";
import Image from "next/image";
import img1 from "../image/AREmoji_20220111_135801_52.gif";

const Main: NextPage = () => {
  return (
    <div className="m-auto flex w-full max-w-5xl flex-col justify-center pt-20 pb-10">
      <div className="flex justify-center">
        <Image className=" rounded-full" src={img1} width={200} height={200} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="my-8 text-xl text-gray-100 md:text-5xl">
          Hello, I'm an Front-end Developer.
        </h1>
        <p className="p-2 text-center text-base text-gray-100 md:text-lg">
          안녕하세요. 프론트엔드 개발자 이정민입니다. <br />
          배포를 통한 사용자 피드백과 비즈니스적 관점에서 고객 UI/UX에 대해 한번
          더 생각하는 개발자입니다. <br />
        </p>
      </div>
    </div>
  );
};

export default Main;
