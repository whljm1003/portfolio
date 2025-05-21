import { GiRollingDices } from "react-icons/gi";
import { motion } from "framer-motion";
import { variants } from "../lib/motion";
import { ItabRef } from "./header";
import Stevelabs from "./Company/Stevelabs";
import Wanted from "./Company/Wanted";

export default function Career({ tabRef }: ItabRef) {
  return (
    <section
      ref={(el) => {
        if (el) tabRef.current[3] = el;
      }}
      className="w-full overflow-hidden"
    >
      <motion.div
        variants={variants}
        initial="start"
        whileInView="end"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="justify-center py-5 m-auto my-16 flex w-full max-w-5xl flex-col items-center">
          <div className="flex items-center justify-center">
            <GiRollingDices size={34} />
            <h1 className="mr-9 mb-10 border-b-2 border-black text-5xl font-bold leading-[1.5]">
              CAREER
            </h1>
          </div>

          <section className="flex flex-col gap-10 lg:gap-20">
            {/* 스티브랩스 */}
            <Stevelabs />
            {/* 원티드 */}
            <Wanted />
          </section>
        </div>
      </motion.div>
    </section>
  );
}
