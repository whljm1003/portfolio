import { FaSignLanguage } from "react-icons/fa"; // Language
import { TbFileTypeHtml } from "react-icons/tb"; // Front
import { FaServer } from "react-icons/fa"; // Server
import { IoServerSharp } from "react-icons/io5"; // DB
import {
  LanguageSkills,
  FrontEndSkills,
  BackEndSkills,
  DatabaseSkills,
} from "../assets/skillsData";
import { GiRollingDices } from "react-icons/gi";
import { motion } from "framer-motion";
import { variants, sliceLeft, sliceUp } from "../lib/motion";
import { ItabRef } from "./header";

const Skills = [
  {
    list: LanguageSkills,
    name: "Language",
    label: <FaSignLanguage className="text-yellow-800" />,
  },
  {
    list: FrontEndSkills,
    name: "Frontend",
    label: <TbFileTypeHtml className="text-yellow-800" />,
  },
  {
    list: BackEndSkills,
    name: "Backend",
    label: <FaServer className="text-yellow-800" />,
  },
  {
    list: DatabaseSkills,
    name: "Database",
    label: <IoServerSharp className="text-yellow-800" />,
  },
];

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
            <h1 className="mr-9 mb-10 border-b-2 border-white text-5xl font-bold leading-[1.5]">
              SKILLS
            </h1>
          </div>
          <div className="space-y-5 lg:space-y-10 p-6 rounded-xl bg-[#f5ca72] shadow-xl">
            {Skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={sliceUp}
                className="flex lg:items-center flex-col lg:flex-row"
              >
                <strong className="flex items-center text-xl mb-4 lg:mb-0 kg:text-2xl font-bold w-[150px]">
                  <span className="mr-3">{skill.label}</span>
                  <span className="text-black">{skill.name}</span>
                </strong>
                <div className="flex flex-wrap gap-1">
                  {skill.list.map((skill) => (
                    <div
                      key={skill.name}
                      style={{ backgroundColor: skill.backgroundColor }}
                      className="p-2 border border-white rounded-lg"
                    >
                      <span
                        key={skill.name}
                        style={{ color: skill.textColor }}
                        className="text-xs lg:text-sm font-bold"
                      >
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
