"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import stevelabsLogo from "@/public/image/stevelabs/stevelabs_logo.webp";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { sliceLeft, sliceRight } from "../../lib/motion";
import { stevelabsData } from "@/assets/career";
import Link from "next/link";
import CareerDetail from "../CareerDetail";

export default function Stevelabs() {
  const swiperRef = useRef<SwiperClass>(null);
  const [isHovered, setIsHovered] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDetail, setIsDetail] = useState(false);

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
      {/* {isDetail && <CareerDetail handleCloseModal={() => setIsDetail(false)} />} */}
      <motion.div variants={sliceLeft} className="h-full lg:w-1/3 lg:pr-12">
        <div className="border-1 rounded-ful relative my-10 h-48 w-48 lg:my-0">
          <Image
            src={stevelabsLogo}
            alt="stevelabs-logo"
            fill
            sizes="48px"
            priority
            className="rounded-full "
          />
        </div>
      </motion.div>
      <motion.div
        variants={sliceRight}
        className=" overflow-hidden lg:overflow-visible lg:border-l-2 lg:pl-12"
      >
        <div className="px-5 lg:px-0">
          <h1 className="py-2 text-2xl font-bold">(주)스티브랩스</h1>
          <h3 className="text-sm leading-6">2022.09 ~ 2024.11 (2년 2개월)</h3>
          <h2 className="text-2xl lg:text-3xl font-semibold mt-4">
            개발팀 / 프론트엔드 개발자
          </h2>
          <ul className="py-4 px-4 lg:pl-4 lg:pr-0 font-semibold whitespace-pre-wrap flex flex-col gap-1 list-disc">
            <li>
              Next.js (React) 기반 커머스, 의료, 금융, 역경매 등 총 8개
              프로젝트의 개발 참여
            </li>
            <li>
              소셜 로그인, 본인인증, 전자계약, 결제 시스템 등 외부 API 연동 경험
            </li>
            <li>
              쇼핑몰 관리자용 NestJS + Prisma ORM 기반 API 개발 - 외부 고객사
            </li>
            <li>커뮤니케이션 및 사내 개발 프로젝트 일정 관리</li>
          </ul>
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
            className="w-[90vw] max-w-[640px]"
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
            {stevelabsData.map((data) => (
              <SwiperSlide
                key={data.title}
                className="flex items-center rounded-2xl px-5 bg-white p-4 odd:bg-[#ffffff] even:bg-[#5352ed] even:text-slate-100"
              >
                <div className="">
                  <h2 className="py-3 text-2xl font-bold group-odd:text-gray-600 group-even:text-white">
                    {data.title}
                  </h2>
                  <h3 className="list-square opacity-80">{`# ${data.period}`}</h3>
                  <h3 className="mt-5 text-xl font-bold group-odd:text-gray-600 group-even:text-white">
                    구현기능/역할
                  </h3>
                  <ul className="mt-2 list-square pl-4 opacity-80">
                    {data.works.map((work) => (
                      <li key={work}>{work}</li>
                    ))}
                  </ul>

                  <h3 className="mt-5 text-xl font-bold group-odd:text-gray-600 group-even:text-white">
                    기술 스택
                  </h3>
                  <ul className="mt-2 list-square pl-4 opacity-80">
                    {data.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                  <h3 className="mt-5 text-xl font-bold group-odd:text-gray-600 group-even:text-white ">
                    관련 링크
                  </h3>
                  <ul className="mt-2 list-square pl-4 opacity-80">
                    <li className="hover:opacity-60">
                      <Link href={data.links.notion} target="_blank">
                        <span className="border-b-2">상세내용</span>
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
              currentIndex !== stevelabsData.length - 1 ? handleNext : undefined
            }
          >
            <MdOutlineArrowForwardIos
              size={50}
              color={
                currentIndex !== stevelabsData.length - 1 ? "black" : "gray"
              }
            />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
