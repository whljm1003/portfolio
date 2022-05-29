import type { NextPage } from "next";

const variousMenu = ["About", "Skills", "Career", "Project", "Contack"];

const Header: NextPage = () => {
  return (
    <header className="h-12 bg-gray-700">
      <div className="m-auto flex max-w-5xl justify-between px-5 py-2 font-bold text-gray-300">
        <div className="">logo</div>
        <ul className="relative flex space-x-9">
          {variousMenu.map((menu, index) => (
            <li
              key={index}
              className="cursor-pointer hover:animate-pulse hover:border-b-2"
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
