import type { NextPage } from "next";
import Link from "next/link";
const Header: React.FC<any> = ({ tabRef }) => {
  const variousMenu = ["About", "Skills", "Career", "Project"];
  return (
    <header className="fixed z-10 h-12 w-full bg-gray-700">
      <div className="m-auto flex max-w-5xl justify-between px-5 py-2 font-bold text-gray-300">
        <div
          className="cursor-pointer hover:animate-pulse "
          onClick={() =>
            tabRef.current[0].scrollIntoView({ behavior: "smooth" })
          }
        >
          LJM's Portfolio
        </div>
        <ul className="relative flex space-x-9">
          {variousMenu.map((menu, index) => (
            <li
              key={index}
              className="cursor-pointer hover:animate-pulse hover:border-b-2"
              onClick={() =>
                tabRef.current[index + 1].scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>{menu}</span>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
