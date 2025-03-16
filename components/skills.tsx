import { FaRegSmileWink, FaRegSmileBeam } from "react-icons/fa";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { MainSkills, SubSkills, InterestedSkills } from "../assets/skillsData";
import { GiRollingDices } from "react-icons/gi";
// frmaer-motion
import { motion } from "framer-motion";
import { variants, sliceLeft, sliceRight } from "./motion";
import { ItabRef } from "./header";
import SkillIcon from "./skill-icon";

const About: React.FC<ItabRef> = ({ tabRef }) => {
  return (
    <section
      ref={(el) => {
        if (el) tabRef.current[2] = el;
      }}
      className="w-full overflow-hidden bg-[#f6b93b]"
    >
      <motion.div
        variants={variants}
        initial="start"
        whileInView="end"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="justify-center py-5 m-auto my-16 flex w-full max-w-5xl flex-col items-center px-5 lg:px-0 *:text-white">
          <div className="flex items-center justify-center">
            <GiRollingDices size={34} color="white" />
            <h1 className="mr-9 mb-10 border-b-2 border-white text-4xl font-bold leading-[1.5]">
              SKILLS
            </h1>
          </div>
          <div className="space-y-10">
            <motion.div variants={sliceLeft} className="space-y-6">
              <h2 className="flex items-center space-x-3 text-2xl font-bold">
                <FaRegSmileBeam />
                <span>메인 기술 스택</span>
              </h2>
              <SkillIcon skills={MainSkills} />
            </motion.div>
            <motion.div variants={sliceRight} className="space-y-6">
              <h2 className="flex items-center space-x-3 text-2xl font-bold ">
                <FaRegSmileWink />
                <span>사용해본 기술 스택</span>
              </h2>
              <SkillIcon skills={SubSkills} />
            </motion.div>
            <motion.div variants={sliceLeft} className="space-y-6">
              <h2 className="flex items-center space-x-3 text-2xl font-bold">
                <BsEmojiSmileUpsideDown />
                <span>관심있는 기술 스택</span>
              </h2>
              <SkillIcon skills={InterestedSkills} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
