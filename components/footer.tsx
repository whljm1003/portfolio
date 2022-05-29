import type { NextPage } from "next";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { ImVimeo2 } from "react-icons/im";

const Footer: NextPage = () => {
  return (
    <footer className="bg-[#222] text-[#f9c51d]">
      <div className="h-34 flex flex-col items-center justify-center py-6">
        <div className="mb-3 flex space-x-5">
          <span className="hover:cursor-pointer">
            <Link href="https://github.com/whljm1003">
              <a>
                <AiFillGithub size={50} />
              </a>
            </Link>
          </span>
          <span className="hover:cursor-pointer">
            <Link href="https://velog.io/@whljm1003">
              <a>
                <ImVimeo2 size={50} />
              </a>
            </Link>
          </span>
        </div>
        <div>© 2022. Lee Jung Min. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
