import Image from "next/image";
import { motion } from "framer-motion";
import { Parallax, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { sliceLeft, sliceRight } from "@/lib/motion";
import { EducationData } from "@/assets/educateData";

type Props = {
  data: EducationData;
};

export default function EducationDetail({ data }: Props) {
  return (
    <section className="flex flex-col items-center lg:flex-row lg:items-start">
      <motion.div variants={sliceLeft} className="h-full lg:pr-12">
        <div className=" rounded-full relative my-10 h-[150px] w-[150px] lg:h-48 lg:w-48 lg:my-0">
          <Image
            src={data.image}
            alt="wanted"
            fill
            className="rounded-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        variants={sliceRight}
        className=" overflow-hidden lg:overflow-visible lg:border-l-2 lg:pl-12"
      >
        <div className="flex flex-col justify-center items-center lg:block">
          <h1 className="py-2 px-5 text-2xl font-bold text-white lg:px-0">
            {data.title}
          </h1>
          <h3 className="px-5 text-sm lg:text-base leading-6 text-white lg:px-0">
            {data.date}
          </h3>
          <p className="text-lg py-4 px-5 font-semibold text-white lg:px-0">
            {data.description}
          </p>
        </div>

        <Swiper
          speed={600}
          grabCursor={true}
          parallax={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[Parallax, Pagination, Navigation]}
          spaceBetween={30}
          className="w-[90vw] max-w-[500px] h-[500px]"
        >
          <SwiperSlide className="flex items-center rounded-2xl px-5 bg-white p-4 odd:bg-[#ffffff] even:bg-[#5352ed] even:text-slate-100">
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
