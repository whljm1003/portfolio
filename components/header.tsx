import type { NextPage } from "next";
import Image from "next/image";
import j from "../image/letter-j.png";

const Header: NextPage = () => {
  return (
    <header className="flex items-center justify-between bg-gray-700 px-5 py-2 font-bold text-gray-200">
      <div className="text-center">
        <Image src={j} alt="logo" width={45} height={45} />
      </div>
      <ul className="flex space-x-9 ">
        <li className="cursor-pointer hover:text-blue-200">About</li>
        <li className="cursor-pointer hover:text-blue-200">Skills</li>
        <li className="cursor-pointer hover:text-blue-200">Career</li>
        <li className="cursor-pointer hover:text-blue-200">Project</li>
        <li className="cursor-pointer hover:text-blue-200">Contack</li>
      </ul>
    </header>
  );
};

export default Header;
