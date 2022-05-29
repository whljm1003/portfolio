import type { NextPage } from "next";

const Project: React.FC<any> = ({ tabRef }) => {
  return (
    <section
      ref={(el) => (tabRef.current[4] = el)}
      className="w-full bg-[#1d809f]"
    >
      <div className="justify-centerpy-5 m-auto mt-16 flex w-full max-w-5xl flex-col items-center">
        <h1 className="mb-5 border-b-2 border-black text-4xl font-bold leading-[1.5]">
          PROJECTS
        </h1>
      </div>
    </section>
  );
};

export default Project;
