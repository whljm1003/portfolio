import Image from "next/image";
import { FaLink, FaTools } from "react-icons/fa";
import { MdPeopleAlt, MdDescription } from "react-icons/md";
import { projects } from "../assets/projectData";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

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
        {projects
          .slice(0)
          .reverse()
          .map((project) => (
            <div
              key={project.id}
              className="my-10 flex w-full flex-col items-center space-y-3 rounded-xl bg-slate-50 py-5"
            >
              <h1 className="text-4xl font-extrabold">{project.title}</h1>
              <p className="text-gray-400">
                {`${project.turm} (${project.member}인)`}
              </p>
              <section className="w-full">
                <div className="h-[30rem] w-full">
                  <Swiper
                    style={{
                      "--swiper-pagination-color": "black",
                      "--swiper-navigation-color": "black",
                    }}
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="h-full w-full"
                  >
                    {project.imgs.map((img) => (
                      <SwiperSlide>
                        <div
                          key={img.id}
                          className="relative m-auto h-full w-[90%] "
                        >
                          <Image src={img.url} alt={img.name} layout="fill" />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className=" w-full space-y-3 p-5">
                  <h3 className="mb-3 flex items-center text-2xl font-bold">
                    <MdDescription />
                    <span className="pl-2">Description</span>
                  </h3>
                  <p className="border-b-2 border-black pb-10">
                    {project.description}
                  </p>

                  <div className="flex w-full flex-wrap items-center justify-between ">
                    <div className="w-1/2">
                      <h3 className="mb-3 flex items-center text-2xl font-bold">
                        <MdPeopleAlt />
                        <span className="pl-2">역할</span>
                      </h3>
                      <ul className="list-square pl-5">
                        {project.methods.map((method) => (
                          <li key={method.id}>{method.contents}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-1/2">
                      <h3 className="mb-3 flex items-center text-2xl font-bold">
                        <FaTools />
                        <span className="pl-2">기술 스택</span>
                      </h3>
                      <ul className="list-square pl-5">
                        {project.skills.map((skill) => (
                          <li key={skill.id}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-10">
                      <h3 className="mb-3 flex items-center text-2xl font-bold">
                        <FaLink />
                        <span className="pl-2">참고 링크</span>
                      </h3>
                      <ul className="list-square pl-5">
                        <li className="hover:opacity-70">
                          <Link href={project.link.github}>
                            <a className="border-b-2 border-gray-600">
                              {" "}
                              Github
                            </a>
                          </Link>
                        </li>
                        <li className="hover:opacity-70">
                          <Link href={project.link.deploy}>
                            <a className="border-b-2 border-gray-600">
                              배포링크
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Project;