import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import {
  careers,
  education,
  featuredProjects,
  portfolioImpactMetrics,
  profile,
  projects,
} from "@/assets/portfolio";
import SiteHeader from "./portfolio/SiteHeader";
import SiteFooter from "./portfolio/SiteFooter";
import WorkExplorer from "./portfolio/WorkExplorer";
import CopyEmail from "./portfolio/CopyEmail";
import ProjectArtwork from "./portfolio/ProjectArtwork";
import HeroTitle from "./portfolio/HeroTitle";
import HeroScene from "./portfolio/HeroScene";
import MagneticLink from "./portfolio/MagneticLink";
import ImpactScene from "./portfolio/ImpactScene";
import ImpactMetrics from "./portfolio/ImpactMetrics";
import CapabilityScene from "./portfolio/CapabilityScene";
import Reveal from "./portfolio/Reveal";

const principles = [
  {
    title: "증상보다 원인에 집중합니다.",
    description:
      "로그아웃이 멈추면 SDK 응답을, 다운로드가 실패하면 네이티브 파일 경로까지 확인합니다. 화면 밖의 원인도 따라갑니다.",
  },
  {
    title: "바뀌는 경계를 함께 검증합니다.",
    description:
      "웹과 앱, JavaScript와 네이티브, 바이너리와 OTA. 한쪽의 변경이 다른 쪽에 미치는 영향을 살핍니다.",
  },
  {
    title: "출시 다음 날도 생각합니다.",
    description:
      "버전과 배포 절차를 정리하고, Sentry에 남는 오류를 다음 수정으로 연결합니다. 반복되는 일은 코드와 문서로 남깁니다.",
  },
];

export default function Home() {
  return (
    <div id="top">
      <SiteHeader />
      <main id="main-content" className="shell">
        <HeroScene>
          <p className="hero-label">
            <span>DEAN PORTFOLIO</span>
            <span>FRONTEND DEVELOPER</span>
          </p>
          <HeroTitle />
          <p className="hero-description">
            프론트엔드 개발자 이정민입니다.
            <br />
            사용자 경험과 제품의 완성도를 높이고,
            <br />
            제품을 꾸준히 개선합니다.
          </p>
          <div className="hero-actions">
            <MagneticLink href="/#work" className="button button--dark">
              작업 살펴보기
            </MagneticLink>
            <Link href="/#about" className="text-link">
              개발자 소개
            </Link>
          </div>
        </HeroScene>
        <ImpactScene>
          <ImpactMetrics metrics={portfolioImpactMetrics} />
        </ImpactScene>
        <CapabilityScene
          artworks={[
            <ProjectArtwork key="interface" diagram="web" />,
            <ProjectArtwork key="system" />,
            <ProjectArtwork key="delivery" diagram="release" />,
          ]}
        />

        <section
          id="work"
          className="work-section chapter-block"
          aria-labelledby="work-title"
        >
          <p className="chapter-label">대표 작업</p>
          <Reveal className="section-heading">
            <h2 id="work-title">만들고, 개선한 작업</h2>
          </Reveal>
          <p className="section-intro">
            오피스너에서 만든 웹과 앱, 그리고 기능을 개선하고 운영하며 해결한
            문제들입니다.
          </p>
          <WorkExplorer
            items={featuredProjects.map((project) => ({
              slug: project.slug,
              category: project.category,
              content: (
                <Link
                  href={`/work/${project.slug}`}
                  scroll={false}
                  className="work-card"
                  aria-label={`${project.title} 사례 보기`}
                >
                  <ProjectArtwork
                    diagram={project.diagram}
                    compact={project.category === "operations"}
                  />
                  <div className="card-content">
                    <div className="card-meta">
                      <span>{project.eyebrow}</span>
                    </div>
                    <div className="card-title">
                      <h3>{project.title}</h3>
                    </div>
                    <p className="card-summary">{project.summary}</p>
                    <div className="tech-tags" aria-label="사용 기술">
                      {project.stack.slice(0, 4).map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ),
            }))}
          />
        </section>

        <section
          id="about"
          className="about-section chapter-block"
          aria-labelledby="about-title"
        >
          <p className="chapter-label">소개</p>
          <Reveal className="about-layout">
            <div className="section-side">
              <h2 id="about-title">개발하는 방식</h2>
            </div>
            <div>
              <p className="about-statement">
                화면의 완성도부터
                <br />
                출시 이후의 안정성까지.
              </p>
              <p className="about-description">
                {profile.intro} 커머스, 의료, 금융 등 여러 서비스에서 쌓은 웹
                개발 경험을 바탕으로, 지금은 오피스너에서 웹과 네이티브 앱의
                경계를 함께 다루고 있습니다.
              </p>
              <div className="principles">
                {principles.map((principle) => (
                  <div className="principle" key={principle.title}>
                    <div>
                      <h3>{principle.title}</h3>
                      <p>{principle.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="tech-section" aria-label="주요 기술">
            <div className="tech-row">
              <h3>프론트엔드</h3>
              <div className="tech-list">
                <span>React / React Native</span>
                <span>Next.js</span>
                <span>TypeScript</span>
                <span>React Query</span>
                <span>Zustand</span>
              </div>
            </div>
            <div className="tech-row">
              <h3>업데이트·운영</h3>
              <div className="tech-list">
                <span>OTA / RevoPush</span>
                <span>fastlane</span>
                <span>Sentry</span>
                <span>iOS / Android</span>
              </div>
            </div>
            <div className="tech-row">
              <h3>서버·협업</h3>
              <div className="tech-list">
                <span>NestJS</span>
                <span>Prisma</span>
                <span>Git</span>
                <span>Figma</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="career"
          className="career-section chapter-block"
          aria-labelledby="career-title"
        >
          <p className="chapter-label">경력 · 교육</p>
          <Reveal className="section-heading">
            <h2 id="career-title">경험이 쌓인 과정</h2>
          </Reveal>
          <div className="career-list">
            {careers.map((career) => (
              <article className="career-entry" key={career.company}>
                <div className="career-company">
                  <h3>{career.company}</h3>
                  <p className="career-period">{career.period}</p>
                </div>
                <div>
                  <p className="career-role">{career.role}</p>
                  <p className="career-summary">{career.summary}</p>
                  <ul className="career-highlights">
                    {career.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  {career.company !== "오피스너" ? (
                    <div className="career-projects">
                      {career.projectSlugs.map((slug) => {
                        const project = projects.find(
                          (item) => item.slug === slug,
                        );
                        return project ? (
                          <Link
                            href={`/work/${slug}`}
                            key={slug}
                            scroll={false}
                          >
                            {project.title}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
          <div className="education-block">
            <h3>교육</h3>
            <div>
              {education.map((course) => (
                <div className="education-entry" key={course.title}>
                  <h4>{course.title}</h4>
                  <time>{course.period}</time>
                  <p>{course.summary}</p>
                  {course.projectSlugs.length > 1 ? (
                    <details className="course-projects">
                      <summary>
                        코스 프로젝트 보기 <FiPlus aria-hidden="true" />
                      </summary>
                      <div className="career-projects">
                        {course.projectSlugs.map((slug) => {
                          const project = projects.find(
                            (item) => item.slug === slug,
                          );
                          return project ? (
                            <Link
                              key={slug}
                              href={`/work/${slug}`}
                              scroll={false}
                            >
                              {project.title}
                            </Link>
                          ) : null;
                        })}
                      </div>
                    </details>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="contact-section chapter-block"
          aria-labelledby="contact-title"
        >
          <p className="chapter-label">연락</p>
          <Reveal className="contact-layout">
            <div className="contact-heading">
              <h2 id="contact-title">함께 이야기해요.</h2>
              <p>
                제품 개발과 새로운 기회에 대해
                <br />
                이야기를 나누고 싶다면 연락해 주세요.
              </p>
            </div>
            <div className="contact-information">
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <CopyEmail email={profile.email} />
              <div className="contact-social">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  블로그
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter topHref="/#top" />
    </div>
  );
}
