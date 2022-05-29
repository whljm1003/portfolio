const Project: React.FC<any> = ({ tabRef }) => {
  return (
    <section
      ref={(el) => (tabRef.current[4] = el)}
      className="w-full bg-[#1d809f]"
    >
      <div className="justify-centerpy-5 m-auto my-16 flex w-full max-w-5xl flex-col items-center">
        <h1 className="mb-5 border-b-2 text-4xl font-bold leading-[1.5] text-zinc-100">
          PROJECTS
        </h1>
        <div className="h-[60vh] w-full rounded-xl bg-slate-50">
          <h1>Pic a, note</h1>
          <div>2022.02 (4인)</div>
          <div></div>

          <div>
            <h3>Description</h3>
            <p>프로젝트 설명</p>
            <div>
              <div>
                <h3>역할</h3>
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                </ul>
              </div>
              <div>
                <h3>기술 스택</h3>
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                </ul>
              </div>
            </div>
            <div>
              <h3>참고 링크</h3>
              <ul>
                <li>Github</li>
                <li>배포링크</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
