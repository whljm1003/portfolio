'use client'
import { useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone, AiFillGithub } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { GiRollingDices } from "react-icons/gi";
import { IoCopy } from "react-icons/io5";
import Link from "next/link";
// frmaer-motion
import { motion } from "framer-motion";
import { initialScreen } from "./motion";
import { ItabRef } from "./header";
// ClipBoard && toast
import useCopyClipBoard from "../hooks/useCopyClipBoard";
import Toast from "./toast";

const About: React.FC<ItabRef> = ({ tabRef }) => {
  const [isCopy, setIsCopy, onCopy] = useCopyClipBoard();

  const handleCopyClipBoard = (text: string) => onCopy(text);
  // 클립보드 복사 후 Toast가 발생하면 1초 후 자동 닫기
  useEffect(() => {
    if (isCopy) {
      setTimeout(() => setIsCopy(false), 1000);
    }
  }, [isCopy]);

  return (
    <div
      ref={(el) => {
        if (el) tabRef.current[1] = el;
      }}
      className="w-full overflow-hidden"
    >
      {isCopy && <Toast msg="🎉&nbsp;복사 성공!!" />}
      <motion.div
        variants={initialScreen}
        initial="start"
        animate="end"
        className="m-auto my-16 flex w-full max-w-5xl flex-col items-center"
      >
        <div className="flex items-center justify-center">
          <GiRollingDices size={34} />
          <h1 className="mb-10 mr-9 border-b-2 border-black text-4xl font-bold leading-[1.5]">
            ABOUT ME
          </h1>
        </div>
        <div className="items-cente flex w-full flex-wrap space-y-6">
          <div className="flex w-full items-center justify-center space-x-5 lg:w-1/2">
            <BsFillPersonFill size={40} />
            <div className="w-2/4 space-y-2 md:w-1/3 ">
              <div className="text-2xl font-bold">이름</div>
              <div className="text-base">이정민</div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center space-x-5 lg:w-1/2">
            <AiFillPhone size={40} />
            <div className=" w-2/4 space-y-2 md:w-1/3">
              <div className="text-2xl font-bold ">연락처</div>
              {/* 태블릿 버전 부터 출력 */}
              <div className="hidden items-center space-x-2 sm:flex">
                <span className="sm: text-base">010-4998-8965</span>
                <span>
                  <IoCopy
                    onClick={() => handleCopyClipBoard("010-4998-8965")}
                    className="cursor-pointer"
                  />
                </span>
              </div>
              {/* 모바일 버전에만 출력 */}
              <div className="w-full space-y-2 sm:hidden">
                <Link href={"tel:010-4998-8965"}>
                  <span className="text-base">010-4998-8965</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center space-x-5 lg:w-1/2 ">
            <IoMdMail size={40} />
            <div className="w-2/4 space-y-2 md:w-1/3 ">
              <div className="text-2xl font-bold">이메일</div>
              <div className="flex items-center space-x-2">
                <span className="text-base">whljm1003@gmail.com</span>
                <span>
                  <IoCopy
                    onClick={() => handleCopyClipBoard("whljm1003@gmail.com")}
                    className="cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center space-x-5 lg:w-1/2 ">
            <AiFillGithub size={40} />
            <div className="w-2/4 md:w-1/3 ">
              <div className="mb-2 text-2xl font-bold">Github</div>
              <Link href="https://github.com/whljm1003">
                <span className="text-base">https://github.com/whljm1003</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
