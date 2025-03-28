"use client";
import Image from "next/image";
import stevelabs from "@/public/image/stevelabs/stevelabs_logo.webp";
// import { wantedData } from "../assets/wantedData";
import { GiRollingDices } from "react-icons/gi";
// frmaer-motion
import { motion, useScroll } from "framer-motion";
import { variants, sliceRight } from "./motion";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React, { useMemo, useState } from "react";
import { ItabRef } from "./header";
import { AnimatePresence } from "framer-motion";
import CareerDetailModal from "./careerDetailModal";
import { careers } from "@/assets/careerData";

// 다음과 같이 동적으로 import

const Career: React.FC<ItabRef> = ({ tabRef }) => {
  const { scrollY } = useScroll();
  const [detail, setDetail] = useState<number>(-1);

  const handleDetail = (item: number) => {
    setDetail(item);
  };

  const reversedCareers = useMemo(() => [...careers].reverse(), [careers]);
  return (
    <section
      ref={(el) => {
        if (el) tabRef.current[3] = el;
      }}
      className="w-full overflow-hidden"
    >
      <motion.div
        variants={variants}
        initial="start"
        whileInView="end"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="justify-center py-5 m-auto my-16 flex w-full max-w-5xl flex-col items-center">
          <div className="flex items-center justify-center">
            <GiRollingDices size={34} />
            <h1 className="mr-9 mb-10 border-b-2 border-black text-4xl font-bold leading-[1.5]">
              CAREER
            </h1>
          </div>

          <motion.div
            variants={sliceRight}
            className="overflow-hidden lg:overflow-visible w-full"
          >
            <div className="flex items-center justify-center gap-4 lg:gap-6 mb-6">
              <div className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] relative">
                {/* <div className=" relative"> */}
                <Image
                  src={stevelabs}
                  alt="stevelabs_logo"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="py-2 px-5 text-2xl lg:text-3xl font-bold">
                  (주)스티브랩스
                </h1>
                <h3 className="px-5 text-gray-500 leading-6 text-sm lg:text-base">
                  2022.09 ~ 2024.10
                </h3>
                <p className="py-4 px-5 font-semibold text-sm lg:text-base">
                  웹 프론트엔드 개발자
                </p>
              </div>
            </div>

            {/* grid */}
            <AnimatePresence>
              {detail !== -1 && (
                <>
                  <CareerDetailModal
                    detail={detail}
                    setDetail={setDetail}
                    scrollYGet={scrollY.get()}
                  />
                </>
              )}
            </AnimatePresence>
            <AnimatePresence>
              <div className="grid grid-cols-auto-fill w-full gap-4 my-12 px-5 lg:px-0">
                {reversedCareers.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-lg bg-main11 shadow-xl flex flex-col justify-center items-center p-4`}
                  >
                    <span className="text-lg font-semibold text-center text-white whitespace-pre-line">
                      {item.basicInfo.title}
                    </span>
                    <span className="text-sm text-[#f5f6fa] mt-3 text-center">
                      {item.basicInfo.summary}
                    </span>

                    <div className="w-full mt-6 flex justify-center px-7">
                      <button
                        onClick={() => handleDetail(item.id)}
                        className="cursor-pointer w-full rounded-lg py-2 text-lg font-bold bg-transparent text-white transition-all duration-200 border-2 border-white/30 hover:bg-white/10 hover:border-white active:bg-white/20"
                      >
                        자세히 보기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Career;
