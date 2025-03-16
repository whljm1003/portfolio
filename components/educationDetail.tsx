"use client";
import Image from "next/image";
// frmaer-motion
import { motion } from "framer-motion";
import { sliceLeft, sliceRight } from "./motion";
// import Swiper core and required modules
import { Parallax, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import React from "react";
import { EducationData } from "@/assets/educateData";

type Props = {
  data: EducationData;
};

export default function EducationDetail({ data }: Props) {
  return (
    <section className="flex flex-col items-center lg:flex-row lg:items-start">
      <motion.div variants={sliceLeft} className="h-full lg:pr-12">
        <div className=" rounded-full relative my-10 h-48 w-48 lg:my-0">
          <Image
            src={data.image}
            alt="wanted"
            fill
            sizes="(max-width: 768px) 192px, 192px" // 48rem = 192px
            className="rounded-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        variants={sliceRight}
        className=" overflow-hidden lg:overflow-visible lg:border-l-2 lg:pl-12"
      >
        <h1 className="py-2 px-5 text-2xl font-bold text-white lg:px-0">
          {data.title}
        </h1>
        <h3 className="px-5 text-sm leading-6 text-white lg:px-0">
          {data.date}
        </h3>
        <p className="py-4 px-5 font-semibold text-white lg:px-0">
          {data.description}
        </p>

        <Swiper
          speed={600}
          grabCursor={true}
          parallax={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[Parallax, Pagination, Navigation]}
          spaceBetween={20}
          className="h-[35rem] w-[20rem] lg:w-[30rem] gap-10"
        >
          <SwiperSlide className="flex items-center rounded-2xl bg-white p-4 odd:bg-[#ffffff] even:bg-[#5352ed] even:text-slate-100">
            <div>
              <h3
                className="mt-5 text-xl font-bold group-odd:text-gray-600 group-even:text-white"
                data-swiper-parallax="-250"
              >
                학습 내용
              </h3>
              <ul className="mt-3 list-square pl-4 opacity-80">
                {data.learning.map((learning) => (
                  <li
                    key={learning.id}
                    data-swiper-parallax="-225"
                    className="mb-1"
                  >
                    {learning.content}
                  </li>
                ))}
              </ul>
            </div>
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </section>
  );
}
