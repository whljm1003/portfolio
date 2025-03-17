"use client";
import React, { useState } from "react";
import { FaLink, FaTools } from "react-icons/fa";
import { MdPeopleAlt, MdDescription } from "react-icons/md";
import { motion } from "framer-motion";
import { careers, VideoType } from "@/assets/careerData";
import { sliceUp, variants } from "./motion";
import { FaWindowClose } from "react-icons/fa";
import { DiCoda } from "react-icons/di";
import { MdRoomPreferences } from "react-icons/md";
import VideoModal from "./VideoModal";

type Props = {
  detail: number;
  setDetail: (detail: number) => void;
  scrollYGet: number;
};

export interface VideoState {
  id: number;
  title: string;
  url: string;
  videoType: VideoType;
}

export default function CareerDetailModal({
  detail,
  setDetail,
  scrollYGet,
}: Props) {
  const career = careers.find((career) => career.id === detail);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const topOffset = isMobile ? scrollYGet : scrollYGet + 200;
  const [selectedVideo, setSelectedVideo] = useState<VideoState | null>(null);

  if (!career) return null;
  return (
    <>
      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <motion.div
        className="fixed inset-0 z-40 w-screen h-screen opacity-0 bg-black/50"
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setDetail(-1)}
      />
      <motion.div
        layoutId={`career-${detail}`}
        style={{ top: topOffset }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute left-0 right-0 mx-auto my-0 h-screen lg:h-[70vh] overflow-y-auto lg:rounded-lg bg-slate-50 z-50 max-w-5xl"
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
            className="flex w-full flex-col items-center bg-slate-50 py-8"
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setDetail(-1)}
            >
              <FaWindowClose size={24} />
            </button>
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="text-2xl lg:text-4xl font-extrabold">
                {career.projectTitle}
              </h1>
              <h2 className="text-xl font-semibold text-gray-400">
                {career.projectPeriod}
              </h2>
            </div>
            <section className="w-full">
              <div className="flex flex-col gap-10 w-full p-5">
                {/* 개요 */}
                <div className="w-full">
                  <h3 className="mb-3 flex items-center text-xl lg:text-2xl font-bold">
                    <MdDescription />
                    <span className="pl-2">개요</span>
                  </h3>
                  <p className=" whitespace-pre-line">{career.description}</p>
                </div>

                {/* 주요 역할 및 기여 */}
                <div>
                  <h3 className="mb-3 flex items-center text-xl lg:text-2xl font-bold">
                    <MdPeopleAlt />
                    <span className="pl-2">주요 역할 및 기여</span>
                  </h3>
                  <ul className="list-square pl-5">
                    {career.contributions.map((contribution) => (
                      <li key={contribution.id}>{contribution.contents}</li>
                    ))}
                  </ul>
                </div>

                {/* 성과 */}
                <div>
                  <h3 className="mb-3 flex items-center text-xl lg:text-2xl font-bold">
                    <DiCoda />
                    <span className="pl-2">성과</span>
                  </h3>
                  <ul className="list-square pl-5">
                    {career.result.map((result) => (
                      <li key={result.id}>{result.content}</li>
                    ))}
                  </ul>
                </div>

                {/* 기술 스택 */}
                <div>
                  <h3 className="mb-3 flex items-center text-xl lg:text-2xl font-bold">
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
                  <div className="">
                    <h3 className="mb-3 flex items-center text-xl lg:text-2xl font-bold">
                      <FaLink />
                      <span className="pl-2">이슈</span>
                    </h3>
                    <ul className="list-square pl-5 flex flex-col gap-3">
                      {career.problemSolving.map((problem) => (
                        <li key={problem.id}>
                          <h4 className="text-lg font-semibold mb-2">
                            {problem.title}
                          </h4>
                          <span className="text-sm whitespace-pre-line">
                            <span className="font-semibold text-sm">내용</span>
                            <p>{problem.issue}</p>
                          </span>
                          <span className="text-sm whitespace-pre-line">
                            <span className="font-semibold text-sm">
                              해결 방법
                            </span>
                            <p>{problem.solution}</p>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* 참고 자료 */}
                {career.videos.length > 0 ? (
                  <div>
                    <h3 className="mb-3 flex items-center text-2xl font-bold">
                      <MdRoomPreferences />
                      <span className="pl-2">참고 자료</span>
                    </h3>
                    <ul className="list-square pl-5">
                      {career.videos.map((video) => (
                        <li key={video.id}>
                          <button
                            onClick={() => {
                              setSelectedVideo(video);
                            }}
                            className="text-blue-500 underline"
                          >
                            {video.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
