import type { NextPage } from "next";

const Contack: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center border border-red-500 bg-gray-800 p-10">
      <h1 className="text-white">contack Me!</h1>
      <form>
        <div>
          <label>이름</label>
          <input type="text" placeholder="이름을 입력해 주세요." />
        </div>
        <div>
          <label>이메일</label>
          <input type="text" placeholder="이메일을 입력해 주세요." />
        </div>
        <div>
          <label>내용</label>
          <textarea placeholder="내용을 입력해 주세요." />
        </div>
        <button>메일 보내기</button>
      </form>
    </div>
  );
};

export default Contack;
