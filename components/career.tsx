import type { NextPage } from "next";

const Career: NextPage = () => {
  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-center border  border-red-500 p-10">
      <section className="h-1/2 w-full border border-blue-500">
        <h1 className="text-white">경력 영역</h1>
      </section>
      <section className="h-1/2 w-full border border-blue-500">
        <h1 className="text-white">프로젝트 영역</h1>
      </section>
    </div>
  );
};

export default Career;
