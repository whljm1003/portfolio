import Image from "next/image";
import wanted from "../assets/image/icons/wanted.png";
import { wantedData } from "../assets/wantedData";
import { GiRollingDices } from "react-icons/gi";
// frmaer-motion
import { motion } from "framer-motion";
import { variants, sliceLeft, sliceRight } from "./motion";
// import Swiper core and required modules
import { EffectCards, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import React from "react";

const Career: React.FC<any> = ({ tabRef }) => {
  return (
    <section ref={(el) => (tabRef.current[3] = el)} className="w-full">
      <motion.div
        variants={variants}
        initial="start"
        whileInView="end"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="justify-centerpy-5 m-auto my-16 flex w-full max-w-5xl flex-col items-center">
          <div className="flex items-center justify-center">
            <GiRollingDices size={34} />
            <h1 className="mr-9 mb-10 border-b-2 border-black text-4xl font-bold leading-[1.5]">
              CAREER
            </h1>
          </div>
          <section className="flex flex-col items-center lg:flex-row lg:items-start">
            <motion.div
              variants={sliceLeft}
              className="h-full lg:w-1/3 lg:pr-12"
            >
              <div className="border-1 rounded-ful relative my-10 h-48 w-48 lg:my-0">
                <Image
                  src={wanted}
                  alt="wanted"
                  layout="fill"
                  className="rounded-full "
                />
              </div>
            </motion.div>

            <motion.div
              variants={sliceRight}
              className=" overflow-hidden lg:overflow-visible lg:border-l-2 lg:pl-12"
            >
              <h1 className="py-2 px-5 text-2xl font-bold lg:px-0">
                프리온보딩 프론트엔드 코스
              </h1>
              <h3 className="px-5 text-sm leading-6 lg:px-0">
                2022.02 ~ 2022.04
              </h3>
              <p className="py-4 px-5 font-semibold lg:px-0">
                다양한 기술 스택을 사용하여 8개의 프로젝트를 진행하였습니다.
              </p>

              <Swiper
                effect={"cards"}
                grabCursor={true}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[EffectCards, Pagination, Navigation]}
                className="h-[35rem] w-[20rem]  lg:w-[30rem]"
              >
                {wantedData.map((data) => (
                  <SwiperSlide
                    key={data.id}
                    className="flex items-center rounded-2xl bg-white p-4 odd:bg-[#ffffff] even:bg-[#5352ed] even:text-slate-100"
                  >
                    <div>
                      <h2 className="py-3 text-2xl font-bold group-odd:text-gray-600 group-even:text-white">
                        {data.title}
                      </h2>
                      <h3 className="list-square opacity-80">{`# ${data.remark}`}</h3>
                      <h3 className="mt-5 text-xl font-bold group-odd:text-gray-600 group-even:text-white">
                        구현기능/역할
                      </h3>
                      <ul className="mt-2 list-square pl-4 opacity-80">
                        {data.methods.map((method) => (
                          <li key={method.id}>{method.contents}</li>
                        ))}
                      </ul>

                      <h3 className="mt-5 text-xl font-bold group-odd:text-gray-600 group-even:text-white">
                        기술 스택
                      </h3>
                      <ul className="mt-2 list-square pl-4 opacity-80">
                        {data.skills.map((skill) => (
                          <li key={skill.id}>{skill.name}</li>
                        ))}
                      </ul>
                      <h3 className="mt-5 text-xl font-bold group-odd:text-gray-600 group-even:text-white ">
                        관련 링크
                      </h3>
                      <ul className="mt-2 list-square pl-4 opacity-80">
                        <li className="hover:opacity-60">
                          <Link href={data.link.github}>
                            <a className="border-b-2"> Github</a>
                          </Link>
                        </li>
                        <li className="hover:opacity-60">
                          <Link href={data.link.deploy}>
                            <a className="border-b-2 "> 배포링크</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </section>
        </div>
      </motion.div>
    </section>
  );
};

export default Career;
