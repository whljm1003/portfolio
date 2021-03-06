import Image from "next/image";
import { FaRegSmileWink, FaRegSmileBeam } from "react-icons/fa";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { MainSkills, SubSkills, InterestedSkills } from "../assets/skillsData";
import { GiRollingDices } from "react-icons/gi";
// frmaer-motion
import { motion } from "framer-motion";
import { variants, sliceLeft, sliceRight } from "./motion";
import { ItabRef } from "./header";

const About: React.FC<ItabRef> = ({ tabRef }) => {
  return (
    <section
      ref={(el) => {
        if (el) tabRef.current[2] = el;
      }}
      className="w-full overflow-hidden bg-[#f9c51d]"
    >
      <motion.div
        variants={variants}
        initial="start"
        whileInView="end"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="justify-centerpy-5 m-auto my-16 flex w-full max-w-5xl flex-col items-center px-5 lg:px-0">
          <div className="flex items-center justify-center">
            <GiRollingDices size={34} />
            <h1 className="mr-9 mb-10 border-b-2 border-black text-4xl font-bold leading-[1.5]">
              SKILLS
            </h1>
          </div>
          <div className="space-y-10">
            <motion.div variants={sliceLeft} className="space-y-6">
              <h2 className="flex items-center space-x-3 text-2xl font-bold">
                <FaRegSmileBeam />
                <span>메인 기술 스택</span>
              </h2>
              <div className="flex w-full flex-wrap justify-around gap-4">
                {MainSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex flex-col items-center justify-center space-y-3 drop-shadow-xl hover:scale-110"
                  >
                    <Image
                      src={skill.img}
                      alt={skill.name}
                      width={70}
                      height={70}
                      className="rounded-full"
                    />
                    <span className="text-xs font-semibold">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={sliceRight} className="space-y-6">
              <h2 className="flex items-center space-x-3 text-2xl font-bold ">
                <FaRegSmileWink />
                <span>사용해본 기술 스택</span>
              </h2>
              <div className="flex w-full flex-wrap justify-around gap-4">
                {SubSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex flex-col items-center justify-center space-y-3 drop-shadow-xl hover:scale-110"
                  >
                    <Image
                      src={skill.img}
                      alt={skill.name}
                      width={70}
                      height={70}
                      className="rounded-full"
                    />
                    <span className="text-xs font-semibold">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={sliceLeft} className="space-y-6">
              <h2 className="flex items-center space-x-3 text-2xl font-bold">
                <BsEmojiSmileUpsideDown />
                <span>관심있는 기술 스택</span>
              </h2>
              <div className="flex w-full flex-wrap justify-around gap-4">
                {InterestedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex flex-col items-center justify-center space-y-3 drop-shadow-xl hover:scale-110"
                  >
                    <Image
                      src={skill.img}
                      alt={skill.name}
                      width={70}
                      height={70}
                      className="rounded-full"
                    />
                    <span className="text-xs font-semibold">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
