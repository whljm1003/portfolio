"use client";
import Image from "next/image";
import Img from "@/public/image/img.gif";
import bg from "@/public/image/developer_background.jpeg";
import TypeIt from "typeit-react";
// frmaer-motion
import { motion } from "framer-motion";
import { initialScreen } from "./motion";
import { ItabRef } from "./header";
import { introduction, typeItString } from "@/assets/about";
// import Model from "./model";

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
          alt="background"
          priority
          loading="eager"
          src={bg}
          className="opacity-85 blur-sm object-cover"
          fill
        />
        <motion.div
          variants={initialScreen}
          initial="start"
          animate="end"
          className="justify-cente m-auto flex w-full max-w-5xl flex-col pt-24 pb-10"
        >
          <div className="flex justify-center">
            {/* <Model /> */}
            <Image
              alt="profile"
              className=" rounded-full z-10"
              src={Img}
              width={200}
              height={200}
            />
          </div>
          <div className="z-10 flex flex-col items-center justify-center">
            <h1 className="my-8 text-xl text-white lg:text-5xl ">
              <TypeIt
                options={{
                  strings: typeItString,
                  speed: 80,
                  waitUntilVisible: true,
                }}
              />
            </h1>
            <p className="p-2 text-center text-base font-extrabold text-white lg:text-lg whitespace-pre-line">
              {introduction}
            </p>
          </div>
          <button
            className="m-auto mt-10 animate-bounce rounded-2xl bg-[#f6b93b] px-10 text-lg font-semibold leading-10 text-white hover:opacity-80"
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
