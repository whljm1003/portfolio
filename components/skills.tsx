import type { NextPage } from "next";
import Image from "next/image";

import { MainSkills, SubSkills, InterestedSkills } from "../assets/skillsData";

const About: NextPage = () => {
  return (
    <div className="justify-centerpy-5 m-auto my-16 flex w-full max-w-5xl flex-col items-center">
      <h1 className="mb-5 border-b-2 border-black text-4xl font-bold leading-[1.5]">
        SKILLS
      </h1>
      <div className="space-y-10">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">😃기술 스택</h2>
          <div className="flex w-full flex-wrap justify-around gap-4">
            {MainSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col items-center justify-center space-y-3"
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
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">😃사용해본 기술 스택</h2>
          <div className="flex w-full flex-wrap justify-around gap-4">
            {SubSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col items-center justify-center space-y-3"
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
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">😃관심있는 기술 스택</h2>
          <div className="flex w-full flex-wrap justify-around gap-4">
            {InterestedSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex flex-col items-center justify-center space-y-3"
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
        </div>
      </div>
    </div>
  );
};

export default About;
