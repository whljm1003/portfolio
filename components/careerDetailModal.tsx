"use client";
import React from "react";
import Image from "next/image";
import { FaLink, FaTools } from "react-icons/fa";
import { MdPeopleAlt, MdDescription } from "react-icons/md";
// frmaer-motion
import { motion } from "framer-motion";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { careers } from "@/assets/careerData";
import { sliceUp, variants } from "./motion";
type Props = {
  detail: number;
  setDetail: (detail: number) => void;
  scrollYGet: number;
};

export default function CareerDetailModal({
  detail,
  setDetail,
  scrollYGet,
}: Props) {
  const career = careers.find((career) => career.id === detail);

  if (!career) return null;
  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 w-screen h-screen opacity-0 bg-black/50"
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setDetail(-1)}
      />
      <motion.div
        layoutId={`career-${detail}`}
        style={{ top: scrollYGet + 25 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute left-0 right-0 mx-auto my-0 h-[90vh] overflow-y-auto rounded-lg bg-white z-50 max-w-7xl"
      >
        <motion.div
          variants={variants}
          initial="start"
          whileInView="end"
          viewport={{ once: true, amount: 0.1 }}
          className="justify-center m-auto flex w-full flex-col items-center"
        >
          <motion.div
            variants={sliceUp}
            initial="start"
            whileInView="end"
            viewport={{ once: true, amount: 0.2 }}
            className="flex w-full flex-col items-center space-y-3 rounded-xl bg-slate-50 py-5"
          >
            <h1 className="text-4xl font-extrabold">{career.projectTitle}</h1>
            <h2 className="text-2xl font-semibold text-gray-400">
              {career.projectPeriod}
            </h2>
            <section className="w-full">
              <div className="h-[30rem] w-full">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="swiper h-full w-full"
                >
                  {career.imgs.map((img) => (
                    <SwiperSlide key={img.id}>
                      <div
                        key={img.id}
                        className="relative m-auto lg:w-[90%] aspect-video"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt}
                          className="object-contain"
                          // placeholder="blur"
                          fill
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className=" w-full space-y-3 p-5">
                <h3 className="mb-3 flex items-center text-2xl font-bold">
                  <MdDescription />
                  <span className="pl-2">Description</span>
                </h3>
                <p className="border-b-2 border-black pb-10">
                  {career.description}
                </p>

                <div className="flex w-full flex-wrap justify-between">
                  <div className="w-full lg:w-1/2">
                    <h3 className="mb-3 flex items-center text-2xl font-bold">
                      <MdPeopleAlt />
                      <span className="pl-2">주요 역할 및 기여</span>
                    </h3>
                    <ul className="list-square pl-5">
                      {career.contributions.map((contribution) => (
                        <li key={contribution.id}>{contribution.contents}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10 w-full lg:mt-0 lg:w-1/2">
                    <h3 className="mb-3 flex items-center text-2xl font-bold">
                      <FaTools />
                      <span className="pl-2">기술 스택</span>
                    </h3>
                    <ul className="list-square pl-5">
                      {career.skills.map((skill) => (
                        <li key={skill.id}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                  {career.problemSolving.length > 0 ? (
                    <div className="mt-10">
                      <h3 className="mb-6 flex items-center text-2xl font-bold">
                        <FaLink />
                        <span className="pl-2">문제 해결</span>
                      </h3>
                      <ul className="list-square pl-5">
                        {career.problemSolving.map((problem) => (
                          <li key={problem.id} className="mb-5">
                            <h4 className="text-lg font-semibold">
                              {problem.title}
                            </h4>
                            <p className="text-sm whitespace-pre-line">
                              {problem.issue}
                            </p>
                            <p className="text-sm whitespace-pre-line">
                              {problem.solution}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
