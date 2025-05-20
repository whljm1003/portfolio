"use client";
import Image from "next/image";
import Img from "@/public/image/img.gif";
import MyFace from "@/public/image/myFace.png";
import bg from "@/public/image/developer_background_02.png";
import TypeIt from "typeit-react";
import { motion } from "framer-motion";
import { initialScreen } from "../lib/motion";
import { ItabRef } from "./header";
import { introduction, typeItString } from "@/assets/about";

export default function Introduction({ tabRef }: ItabRef) {
  return (
    <div
      ref={(el) => {
        if (el) tabRef.current[0] = el;
      }}
      className="w-full overflow-hidden"
    >
      <div className="relative flex justify-center items-center w-full">
        <Image
          alt="background"
          priority
          loading="eager"
          src={bg}
          className="blur-sm object-cover"
          fill
        />
        <motion.div
          variants={initialScreen}
          initial="start"
          animate="end"
          className="justify-center m-auto flex w-full max-w-5xl flex-col pt-24 pb-10"
        >
          <div className="flex justify-center">
            <Image
              alt="profile"
              className="w-[220px] h-[220px] lg:w-[270px] lg:h-[270px] rounded-full z-10"
              src={MyFace}
              width={270}
              height={270}
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
}
