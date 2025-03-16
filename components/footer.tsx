import type { NextPage } from "next";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { ImVimeo2 } from "react-icons/im";

const Footer: NextPage = () => {
  return (
    <footer className="overflow-hidden bg-[#222] text-[#f6b93b]">
      <div className="h-34 flex flex-col items-center justify-center py-6">
        <div className="mb-3 flex space-x-5">
          <span className="hover:cursor-pointer">
            <Link href="https://github.com/whljm1003">
              <span>
                <AiFillGithub size={50} />
              </span>
            </Link>
          </span>
          <span className="hover:cursor-pointer">
            <Link href="https://velog.io/@whljm1003">
              <span>
                <ImVimeo2 size={50} />
              </span>
            </Link>
          </span>
        </div>
        <div>© 2025. Lee Jung Min. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
