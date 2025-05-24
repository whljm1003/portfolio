"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import wantedLogo from "@/public/image/icons/wanted.png";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import { sliceLeft, sliceRight } from "../../lib/motion";
import { wantedData } from "@/assets/career";

export default function Wanted() {
  const swiperRef = useRef<SwiperClass>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
    setCurrentIndex(swiperRef.current?.realIndex!);
  };
  const handleNext = () => {
    swiperRef.current?.slideNext();
    setCurrentIndex(swiperRef.current?.realIndex!);
  };

  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-start">
      <motion.div
        variants={sliceLeft}
        className="h-full lg:pr-12 pt-10 lg:pt-20"
      >
        <div className="border-1 rounded-ful relative my-10 h-48 w-48 lg:my-0">
          <Image
            src={wantedLogo}
            alt="wanted-logo"
            fill
            sizes="48px"
            priority
            className="rounded-full"
          />
        </div>
      </motion.div>
      <motion.div
        variants={sliceRight}
        className=" overflow-hidden lg:overflow-visible lg:border-l-2 lg:pl-12 pt-10 lg:pt-20"
      >
        <div className="px-5 lg:px-0">
          <h1 className="py-2 text-2xl font-bold">
            프리온보딩 프론트엔드 코스
          </h1>
          <h3 className="text-sm leading-6">2022.02 ~ 2022.04</h3>
          <p className="py-4 font-semibold">
            다양한 기술 스택을 사용하여 8개의 프로젝트를 진행하였습니다.
          </p>
        </div>

        <div
          className="flex items-center justify-center relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            className={`absolute top-[50%] -left-5 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center z-50 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
            onClick={currentIndex !== 0 ? handlePrev : undefined}
          >
            <MdOutlineArrowBackIosNew
              size={50}
              color={currentIndex !== 0 ? "black" : "gray"}
            />
          </button>

          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="w-[90vw] max-w-[500px]"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 25,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
            }}
          >
            {wantedData.map((data) => (
              <SwiperSlide
                key={data.id}
                className="flex items-center rounded-2xl px-5 bg-white p-4 even:bg-[#ffffff] odd:bg-[#5352ed] odd:text-slate-100"
              >
                <div className="">
                  <h2 className="py-3 text-2xl font-bold group-even:text-gray-600 group-odd:text-white">
                    {data.title}
                  </h2>
                  <h3 className="list-square opacity-80">{`# ${data.remark}`}</h3>
                  <h3 className="mt-5 text-xl font-bold group-even:text-gray-600 group-odd:text-white">
                    구현기능/역할
                  </h3>
                  <ul className="mt-2 list-square pl-4 opacity-80">
                    {data.methods.map((method) => (
                      <li key={method}>{method}</li>
                    ))}
                  </ul>

                  <h3 className="mt-5 text-xl font-bold group-even:text-gray-600 group-odd:text-white">
                    기술 스택
                  </h3>
                  <ul className="mt-2 list-square pl-4 opacity-80">
                    {data.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                  <h3 className="mt-5 text-xl font-bold group-even:text-gray-600 group-odd:text-white ">
                    관련 링크
                  </h3>
                  <ul className="mt-2 list-square pl-4 opacity-80">
                    <li className="hover:opacity-60">
                      <Link href={data.link.github}>
                        <span className="border-b-2"> Github</span>
                      </Link>
                    </li>
                    <li className="hover:opacity-60">
                      <Link href={data.link.deploy}>
                        <span className="border-b-2 "> 배포링크</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className={`absolute top-[50%] -right-20 -translate-x-[50%] -translate-y-[50%] flex justify-center items-center z-50 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
            onClick={
              currentIndex !== wantedData.length - 1 ? handleNext : undefined
            }
          >
            <MdOutlineArrowForwardIos
              size={50}
              color={currentIndex !== wantedData.length - 1 ? "black" : "gray"}
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
