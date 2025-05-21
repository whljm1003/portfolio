import { motion } from "framer-motion";
import { variants } from "@/lib/motion";
import React from "react";
import { ItabRef } from "./header";
import EducationDetail from "@/components/educationDetail";
import { GiRollingDices } from "react-icons/gi";
import { educationData } from "@/assets/educateData";

const Education: React.FC<ItabRef> = ({ tabRef }) => {
  return (
    <section
      ref={(el) => {
        if (el) tabRef.current[4] = el;
      }}
      className="w-full overflow-hidden bg-[#38ada9]"
    >
      <motion.div
        variants={variants}
        initial="start"
        whileInView="end"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="justify-center py-5 m-auto my-16 flex w-full max-w-5xl flex-col items-center  lg:gap-16">
          <div className="flex items-center justify-center">
            <GiRollingDices size={34} color="white" />
            <h1 className="mr-9 mb-10 border-b-2 text-white border-white text-4xl font-bold leading-[1.5]">
              EDUCATION
            </h1>
          </div>
          {educationData.map((data) => (
            <EducationDetail key={data.id} data={data} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
