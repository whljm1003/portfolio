import type { NextPage } from "next";
import Image from "next/image";

const Header: NextPage = () => {
  return (
    <header className=" bg-gray-700">
      <div className="m-auto flex max-w-5xl items-center justify-between px-5 py-2 font-bold text-gray-300">
        <div className="text-center">logo</div>
        <ul className="flex space-x-9 ">
          <li className="cursor-pointer hover:text-gray-100">About</li>
          <li className="cursor-pointer hover:text-gray-100">Skills</li>
          <li className="cursor-pointer hover:text-gray-100">Career</li>
          <li className="cursor-pointer hover:text-gray-100">Project</li>
          <li className="cursor-pointer hover:text-gray-100">Contack</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
