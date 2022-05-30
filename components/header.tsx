import { useEffect, useState } from "react";

const variousMenu = ["About", "Skills", "Career", "Project"];

const Header: React.FC<any> = ({ tabRef, mainRef }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    window.scrollY === 0 ? setScroll(true) : setScroll(false);
  };

  return (
    <header
      className={`fixed z-40 h-12 w-full drop-shadow-2xl ${
        !scroll && "bg-[#222]"
      }`}
    >
      <div className="m-auto flex max-w-5xl justify-between px-5 py-2 font-bold text-gray-300">
        <div
          className="cursor-pointer hover:animate-pulse "
          onClick={() =>
            tabRef.current[0].scrollIntoView({ behavior: "smooth" })
          }
        >
          JM's Portfolio
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
