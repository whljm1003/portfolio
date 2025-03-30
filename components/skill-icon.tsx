import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  skills: {
    id: number;
    name: string;
    img: string;
  }[];
};

export default function SkillIcon({ skills }: Props) {
  return (
    <div className="flex w-full flex-wrap justify-around gap-4">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="flex flex-col items-center justify-center space-y-3 drop-shadow-xl hover:scale-110 "
        >
          <Image
            src={skill.img}
            alt={skill.name}
            className="rounded-full w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] object-cover ring-2 ring-gray-200 bg-white p-[5px]"
            width={80}
            height={80}
          />
          <span className="text-xs font-bold">{skill.name}</span>
        </div>
      ))}
    </div>
  );
}
