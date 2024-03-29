import Image from "next/image";
import Img from "../assets/image/img.gif";
import bg from "../assets/image/developer_background.jpeg";
import TypeIt from "typeit-react";
// frmaer-motion
import { motion } from "framer-motion";
import { initialScreen } from "./motion";
import { ItabRef } from "./header";
import Model from "./model";

const Main: React.FC<ItabRef> = ({ tabRef }) => {
  return (
    <div
      ref={(el) => {
        if (el) tabRef.current[0] = el;
      }}
      className="w-full overflow-hidden"
    >
      <div className="relative">
        <Image
          priority={true}
          src={bg}
          className="opacity-80 blur-sm"
          layout="fill"
        />
        <motion.div
          variants={initialScreen}
          initial="start"
          animate="end"
          className="justify-cente m-auto flex w-full max-w-5xl flex-col pt-24 pb-10"
        >
          <div className="flex justify-center">
            <Model />
            {/* <Image
              className=" rounded-full"
              src={Img}
              width={200}
              height={200}
              priority={true}
            /> */}
          </div>
          <div className="z-10 flex flex-col items-center justify-center">
            <h1 className="my-8 text-xl text-gray-100 lg:text-5xl">
              <TypeIt
                options={{
                  strings: ["Hello, I&apos;m an Front-end Developer."],
                  speed: 80,
                  waitUntilVisible: true,
                }}
              />
            </h1>
            <p className="p-2 text-center text-base font-extrabold text-white lg:text-lg">
              안녕하세요. <br />
              포기하지 않고 끈기 있게 도전하는 개발자 이정민입니다.
              <br />
              웹 서비스로 사용자들에게 편리함을 더해주고, <br />
              고객 UI/UX에 대해 한번 더 생각하는 개발자가 되고싶습니다. <br />
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
        </motion.div>
      </div>
    </div>
  );
};

export default Main;
