import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone, AiFillGithub } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { GiRollingDices } from "react-icons/gi";
import { IoCopy } from "react-icons/io5";
import Link from "next/link";
import { RefObject, useRef } from "react";
// frmaer-motion
import { motion } from "framer-motion";
import { initialScreen } from "./motion";

const About: React.FC<any> = ({ tabRef }) => {
  const phoneInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);

  const copy = (target: RefObject<HTMLInputElement>) => {
    target.current?.select();
    document.execCommand("copy");
  };

  return (
    <section
      ref={(el) => (tabRef.current[1] = el)}
      className="w-full overflow-hidden"
    >
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
              <div className="flex items-center">
                <input
                  className="w-32 bg-inherit outline-none"
                  value="010-4998-8965"
                  readOnly
                  type="text"
                  ref={phoneInput}
                />
                <span>
                  <IoCopy
                    onClick={() => copy(phoneInput)}
                    className="cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center space-x-5 lg:w-1/2 ">
            <IoMdMail size={40} />
            <div className="w-1/3 space-y-2">
              <div className="text-2xl font-bold">이메일</div>
              <div className="flex items-center">
                <input
                  className="bg-inherit outline-none"
                  value="whljm1003@gmail.com"
                  readOnly
                  type="text"
                  ref={emailInput}
                />
                <span>
                  <IoCopy
                    onClick={() => copy(emailInput)}
                    className="cursor-pointer"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center space-x-5 lg:w-1/2 ">
            <AiFillGithub size={40} />
            <div className="w-1/3">
              <div className="mb-2 text-2xl font-bold">Github</div>
              <Link href="https://github.com/whljm1003">
                <a className="text-base">https://github.com/whljm1003</a>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
