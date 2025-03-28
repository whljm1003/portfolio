"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaGlobe, FaLink, FaPlay, FaTools } from "react-icons/fa";
import { MdPeopleAlt, MdDescription } from "react-icons/md";
import { motion } from "framer-motion";
import { careers, Media, VideoType } from "@/assets/careerData";
import { sliceUp } from "./motion";
import { FaWindowClose } from "react-icons/fa";
import { MdRoomPreferences } from "react-icons/md";
import Link from "next/link";
import MediaModal from "./MediaModal";
import Image from "next/image";

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
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  useEffect(() => {
    if (isMobile) {
      const body = document.querySelector("body");
      if (body) {
        body.style.overflow = "hidden";
      }
    }

    return () => {
      const body = document.querySelector("body");
      if (body) {
        body.style.overflow = "";
      }
    };
  }, [isMobile]);

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
        style={{ top: topOffset }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`absolute left-0 right-0 mx-auto my-0 h-screen lg:h-[70vh] overflow-y-auto lg:rounded-lg bg-slate-50 z-50 max-w-5xl`}
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

          {/* 1. 프로젝트명, 2. 기간, 3. 간단설명 */}
          <div className="flex flex-col justify-center items-center gap-2 mb-6">
            <h1 className="text-2xl lg:text-4xl font-extrabold">
              {career.basicInfo.title}
            </h1>
            <h2 className="text-xl font-semibold text-gray-400">
              {career.basicInfo.period}
            </h2>
            <p className="text-lg text-gray-600 mt-2 ">
              {career.basicInfo.summary}
            </p>

            {/* 기술 스택 아이콘들 */}
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {Object.entries(career.skills).map(([category, skills]) =>
                skills?.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2 py-1 rounded-full text-sm font-medium transition-colors
                      ${
                        category === "frontend"
                          ? "bg-sky-100 text-sky-700 hover:bg-sky-200"
                          : category === "backend"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : category === "database"
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                              : category === "devops"
                                ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>

          <section className="w-full">
            <div className="flex flex-col gap-10 w-full p-5">
              {/* 4. 프로젝트 개요 */}
              <div className="w-full">
                <h3 className="mb-3 flex items-center text-xl lg:text-2xl font-bold">
                  <MdDescription />
                  <span className="pl-2">프로젝트 개요</span>
                </h3>
                <p className="whitespace-pre-line">
                  {career.basicInfo.description}
                </p>
              </div>

              {/* 5. 주요 기여 및 성과 */}
              <div>
                <h3 className="mb-3 flex items-center text-xl lg:text-2xl font-bold">
                  <MdPeopleAlt />
                  <span className="pl-2">주요 기여 및 성과</span>
                </h3>
                <ul className="list-square pl-5">
                  {career.keyContributions.map((item) => (
                    <li
                      key={item.id}
                      dangerouslySetInnerHTML={{
                        __html: item.content.replace(
                          /<highlight>(.*?)<\/highlight>/g,
                          '<span class="font-semibold text-blue-600">$1</span>'
                        ),
                      }}
                      className="leading-relaxed"
                    />
                  ))}
                </ul>
              </div>

              {/* 6. 주요 이슈 및 해결 방법 */}
              {career.problemSolving.length > 0 && (
                <div>
                  <h3 className="mb-4 flex items-center text-xl lg:text-2xl font-bold">
                    <FaTools />
                    <span className="pl-2">주요 이슈 및 해결 방법</span>
                  </h3>
                  <ul className="list-square pl-5 flex flex-col gap-6">
                    {career.problemSolving.map((problem) => (
                      <li key={problem.id}>
                        <h4 className="text-base font-bold mb-3 text-gray-800">
                          {problem.title}
                        </h4>
                        <div className="space-y-4 text-base">
                          <div>
                            <p className="font-semibold text-gray-500 mb-2">
                              이슈
                            </p>
                            <p className="whitespace-pre-line leading-relaxed pl-2">
                              {problem.issue}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-500 mb-2">
                              해결 방법
                            </p>
                            <p className="whitespace-pre-line leading-relaxed pl-2">
                              {problem.solution}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 7. 관련 링크 */}
              {Object.values(career.links).some((link) => link) && (
                <div>
                  <h3 className="mb-3 flex items-center text-xl lg:text-2xl font-bold">
                    <FaLink />
                    <span className="pl-2">관련 링크</span>
                  </h3>
                  <div className="flex gap-4">
                    {career.links.github && (
                      <Link
                        href={career.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-500"
                      >
                        <FaGithub />
                        GitHub
                      </Link>
                    )}
                    {career.links.deploy && (
                      <Link
                        href={career.links.deploy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-500"
                      >
                        <FaGlobe />
                        Deploy
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* 8. 관련 이미지 또는 영상 */}
              {career.media.length > 0 && (
                <div>
                  <h3 className="mb-3 flex items-center text-xl lg:text-2xl font-bold">
                    <MdRoomPreferences />
                    <span className="pl-2">미디어</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {career.media.map((item) => (
                      <div
                        key={item.id}
                        className="relative cursor-pointer"
                        onClick={() => {
                          item.type === "video" ? setSelectedMedia(item) : "";
                        }}
                      >
                        {item.type === "image" ? (
                          <Image
                            src={item.url}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded"
                            width={150}
                            height={150}
                          />
                        ) : (
                          <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
                            <FaPlay className="text-gray-500" size={24} />
                          </div>
                        )}
                        <p className="mt-2 text-sm text-center">{item.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 미디어 모달 */}
          {selectedMedia && (
            <MediaModal
              media={selectedMedia}
              onClose={() => setSelectedMedia(null)}
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
