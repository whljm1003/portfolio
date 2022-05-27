import next from "next";
import Image from "next/image";
import wanted from "../image/icons/wanted.png";

function Modal() {
  return (
    <div className="flex h-full w-full justify-center rounded-lg bg-[#eeeeee] p-5">
      <section className="m-10 flex w-[20%] justify-center border-r-[2px] border-[#ccc] pr-5">
        <div className="relative h-[200px] w-[200px] rounded-full border-2 border-[#ccc]">
          <Image
            className="  rounded-full"
            layout="fill"
            src={wanted}
            alt="wanted"
          />
        </div>
      </section>
      <section className="flex w-[60%] flex-col justify-center space-y-3 p-5">
        <h1 className=" mb-2 text-3xl font-bold">프리온보딩 프론트엔드 코스</h1>
        <span>2022-02-04</span>
        <p>다양한 기술 스택을 이용하여 8개의 프로젝트 완성하기!</p>
        <div className="space-y-2 rounded-xl border border-[#ccc] bg-white p-3">
          <h1 className="mb-2 text-2xl font-bold">프로젝트 주요 내용</h1>
          <label className="font-bold text-gray-400">구현기능/역할</label>
          <ul className="list-square pl-4">
            <li>구현을 했습니다.</li>
            <li>구현을 했습니다.</li>
            <li>구현을 했습니다.</li>
          </ul>
          <div>
            <label className=" font-bold text-gray-400">기술 스택</label>
            <ul className="list-square pl-4">
              <li>html</li>
              <li>css</li>
              <li>react</li>
            </ul>
          </div>
          <div>
            <label className="font-bold text-gray-400">관련 링크</label>
            <ul className="mt-2 list-square pl-4">
              <li>Github</li>
              <li>배포주소</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Modal;
