"use client";
import { useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone, AiFillGithub } from "react-icons/ai";
import { SiVelog } from "react-icons/si";
import { IoMdMail } from "react-icons/io";
import { FaBirthdayCake } from "react-icons/fa";
import { GiRollingDices } from "react-icons/gi";
import { IoCopy } from "react-icons/io5";
import Link from "next/link";
import { motion } from "framer-motion";
import { initialScreen } from "../lib/motion";
import { ItabRef } from "./header";
import useCopyClipBoard from "../hooks/useCopyClipBoard";
import Toast from "./toast";

const AboutList = [
  {
    label: "이름",
    name: "이정민",
    icon: <BsFillPersonFill size={40} />,
    isCopy: false,
  },
  {
    label: "생년월일",
    name: "1990.10.03",
    icon: <FaBirthdayCake size={40} />,
    isCopy: false,
  },
  {
    label: "연락처",
    name: "010-4998-8965",
    icon: <AiFillPhone size={40} />,
    isCopy: true,
  },
  {
    label: "이메일",
    name: "whljm1003@gmail.com",
    icon: <IoMdMail size={40} />,
    isCopy: true,
  },
  {
    label: "깃허브",
    name: "https://github.com/whljm1003",
    icon: <AiFillGithub size={40} />,
    Link: "https://github.com/whljm1003",
    isCopy: false,
  },
  {
    label: "블로그",
    name: "https://velog.io/@whljm1003",
    icon: <SiVelog size={40} />,
    Link: "https://velog.io/@whljm1003",
    isCopy: false,
  },
];

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
        className="m-auto my-28 flex w-full max-w-5xl flex-col items-center"
      >
        <div className="flex items-center justify-center">
          <GiRollingDices size={34} />
          <h1 className="mb-10 mr-9 border-b-2 border-black text-5xl font-bold leading-[1.5]">
            ABOUT ME
          </h1>
        </div>
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-10 mt-8 lg:mt-16 px-4 lg:px-0">
          {AboutList.map((item) => (
            <div key={item.name} className="flex items-center">
              <label className="mr-5">{item.icon}</label>
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold">{item.label}</span>
                <div className="flex items-center space-x-2">
                  {item.Link ? (
                    <Link
                      href={item.Link}
                      target="_blank"
                      className=" cursor-pointer"
                    >
                      <span className="text-base">{item.Link}</span>
                    </Link>
                  ) : (
                    <span className="text-base">{item.name}</span>
                  )}
                  {item.isCopy ? (
                    <span>
                      <IoCopy
                        onClick={() => handleCopyClipBoard(item.name)}
                        className="cursor-pointer"
                      />
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
