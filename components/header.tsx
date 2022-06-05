import { FC, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";

const variousMenu = ["About", "Skills", "Career", "Project"];

export interface ItabRef {
  tabRef: Icurrent;
  yProgress?: number;
}
interface Icurrent {
  current: Array<HTMLElement>;
}

const Header: FC<ItabRef> = ({ tabRef, yProgress }) => {
  const [isHambugger, setIsHambugger] = useState(false);

  const hambuggerHandler = () => setIsHambugger((prev) => !prev);

  return (
    <header
      className={`fixed z-40 w-full overflow-hidden bg-[#222] drop-shadow-2xl lg:h-12 lg:bg-inherit ${
        yProgress !== 0 && "lg:bg-[#222]"
      }`}
    >
      <div className="m-auto flex max-w-5xl flex-col justify-between px-5 py-2 font-bold text-gray-300 lg:flex-row">
        <div
          className="cursor-pointer hover:animate-pulse"
          onClick={() =>
            tabRef.current[0].scrollIntoView({ behavior: "smooth" })
          }
        >
          JM&apos;s Portfolio
        </div>
        <ul
          className={`relative mt-4 flex-col space-y-2 lg:mt-0 lg:flex lg:flex-row lg:space-y-0 lg:space-x-9 ${
            !isHambugger && "hidden"
          }`}
        >
          {variousMenu.map((menu, index) => (
            <li
              key={index}
              className="w-full cursor-pointer hover:animate-pulse hover:rounded-sm hover:bg-gray-700 lg:hover:border-b-2 lg:hover:bg-inherit"
              onClick={() =>
                tabRef.current[index + 1].scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>{menu}</span>
            </li>
          ))}
        </ul>
        <button
          className="absolute right-5 font-extrabold lg:hidden"
          onClick={hambuggerHandler}
        >
          <GiHamburgerMenu size={24} />
        </button>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-full origin-[0_0] bg-[#f9c51d]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: yProgress }}
        transition={{ ease: "easeOut", duration: 0.2 }}
      />
    </header>
  );
};

export default Header;
