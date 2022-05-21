import type { NextPage } from "next";
import About from "../components/about";
import Image from "next/image";
import img1 from "../image/AREmoji_20220111_135801_52.gif";
import { AiFillHome, AiFillGithub } from "react-icons/ai";
import { GrMail } from "react-icons/gr";
import { IoPersonSharp } from "react-icons/io5";
import { ImVimeo2 } from "react-icons/im";
import { FaFileMedicalAlt } from "react-icons/fa";
import { useState } from "react";
import Career from "../components/career";
import Contack from "../components/contack";
import Link from "next/link";
import Main from "../components/main";

interface Icomponents {
  [elemName: number]: JSX.Element;
}

const Home: NextPage = () => {
  const [tab, setTab] = useState(0);
  const components: Icomponents = {
    0: <Main />,
    1: <About />,
    2: <Career />,
    3: <Contack />,
  };
  const compoArr = Array.from(
    { length: Object.keys(components).length },
    (v, i) => i
  );

  return (
    <div className="col-auto flex ">
      <div className="flex h-screen w-1/12 flex-col items-center justify-between bg-gray-700 p-5 text-lg">
        <div className="mb-10">
          <Image
            src={img1}
            alt="test"
            width={50}
            height={50}
            className="rounded-md"
          />
        </div>
        <ul className="peer space-y-5">
          {compoArr.map((e, index) => (
            <li
              className={`hover:cursor-pointer hover:text-blue-300 ${
                tab === e && "text-blue-500"
              }`}
              onClick={() => setTab(e)}
              key={index}
            >
              {e === 0 && <AiFillHome size={32} />}
              {e === 1 && <IoPersonSharp size={32} />}
              {e === 2 && <FaFileMedicalAlt size={32} />}
              {e === 3 && <GrMail size={32} />}
            </li>
          ))}
        </ul>
        <ul className="space-y-5">
          <li className="hover:cursor-pointer hover:text-blue-300">
            <Link href="https://github.com/whljm1003">
              <a>
                <AiFillGithub size={26} />
              </a>
            </Link>
          </li>
          <li className="hover:cursor-pointer hover:text-blue-300">
            <Link href="https://velog.io/@whljm1003">
              <a>
                <ImVimeo2 size={26} />
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-11/12 ">
        <div className="h-10 w-10">{components[tab]}</div>
      </div>
    </div>
  );
};

export default Home;
