import type { NextPage } from "next";
import About from "../components/skills";
import Image from "next/image";
import j from "../image/letter-j.png";
import { AiFillGithub } from "react-icons/ai";
import { GrMail } from "react-icons/gr";
import { IoPersonSharp } from "react-icons/io5";
import { ImVimeo2 } from "react-icons/im";
import { IoDocumentText } from "react-icons/io5";
import { DiJavascript } from "react-icons/di";
import { useState } from "react";
import Career from "../components/career";
import Contack from "../components/contack";
import Link from "next/link";
import Main from "../components/about";

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
        <div className="mb-10 text-center">
          <Image
            src={j}
            alt="j"
            width={45}
            height={45}
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
              {e === 0 && <IoPersonSharp size={40} />}
              {e === 1 && <DiJavascript size={40} />}
              {e === 2 && <IoDocumentText size={40} />}
              {e === 3 && <GrMail size={40} />}
            </li>
          ))}
        </ul>
        <ul className="space-y-5">
          <li className="hover:cursor-pointer hover:text-blue-300">
            <Link href="https://github.com/whljm1003">
              <a>
                <AiFillGithub size={30} />
              </a>
            </Link>
          </li>
          <li className="hover:cursor-pointer hover:text-blue-300">
            <Link href="https://velog.io/@whljm1003">
              <a>
                <ImVimeo2 size={30} />
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-11/12 ">{components[tab]}</div>
    </div>
  );
};

export default Home;
