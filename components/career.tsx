import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import Modal from "./modal";
import wanted from "../image/icons/wanted.png";

const Career: NextPage = () => {
  const [isModal, setIsModal] = useState(false);

  const clickHandler = () => setIsModal((prev) => !prev);

  return (
    <div className="flex h-full w-full p-10">
      <div
        className={`${
          isModal ? "hidden" : "w-full"
        } flex flex-col items-center justify-center`}
      >
        <section className="flex h-1/2 w-full flex-col items-center justify-center text-white">
          <h1 className="mb-5 text-5xl">Education</h1>
          <ul className="flex h-2/3 w-full justify-center gap-5">
            <li className="relative h-full w-[300px]" onClick={clickHandler}>
              <Image
                src={wanted}
                alt="wanted"
                layout="fill"
                className="rounded-md "
              />
              <h1>프리온보딩 프론트엔드 코스</h1>
            </li>
            <li className="relative h-full w-[300px]" onClick={clickHandler}>
              <Image
                src={wanted}
                alt="wanted"
                layout="fill"
                className="rounded-md "
              />
              <h1>코드스테이츠 자바스크립트 풀스택 과정</h1>
            </li>
          </ul>
        </section>
        <section className="flex h-1/2 w-full flex-col items-center justify-center text-white">
          <h1 className="mb-5 text-5xl">Project</h1>
          <ul className="flex h-2/3 w-full justify-center gap-5">
            <li className="h-full w-[200px] rounded-md border border-white">
              portfolio
            </li>
            <li className="h-full w-[200px] rounded-md border border-white">
              OMOMO
            </li>
            <li className="h-full w-[200px] rounded-md border border-white">
              Pic, a note
            </li>
          </ul>
        </section>
      </div>
      {isModal && <Modal />}
    </div>
  );
};

export default Career;
