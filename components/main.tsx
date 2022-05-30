import Image from "next/image";
import Img from "../assets/image/img.gif";
import bg from "../assets/image/developer_background.jpeg";

const Main: React.FC<any> = ({ tabRef }) => {
  return (
    <div ref={(el) => (tabRef.current[0] = el)} className="w-full">
      <div className="relative">
        <Image src={bg} className="opacity-80 blur-sm" layout="fill" />
        <div className="justify-cente m-auto flex w-full max-w-5xl flex-col pt-24 pb-10">
          <div className="flex justify-center">
            <Image
              className=" rounded-full"
              src={Img}
              width={200}
              height={200}
            />
          </div>
          <div className="z-10 flex flex-col items-center justify-center">
            <h1 className="my-8 text-xl text-gray-100 lg:text-5xl">
              Hello, I'm an Front-end Developer.
            </h1>
            <p className="p-2 text-center text-base font-extrabold text-white lg:text-lg">
              안녕하세요. 프론트엔드 개발자 이정민입니다. <br />
              배포를 통한 사용자 피드백과 비즈니스적 관점에서 고객 UI/UX에 대해
              한번 더 생각하는 개발자입니다. <br />
            </p>
          </div>
          <button
            className="m-auto mt-10 animate-bounce rounded-2xl bg-[#45aaf2] px-10 text-lg font-semibold leading-10 text-white hover:opacity-80"
            onClick={() =>
              tabRef.current[1].scrollIntoView({ behavior: "smooth" })
            }
          >
            더 알아보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
