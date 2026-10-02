import Image from "next/image";
import type { PortfolioProject } from "@/assets/portfolio";
import ProjectArtwork from "./ProjectArtwork";
import ImpactMetrics from "./ImpactMetrics";
import Reveal from "./Reveal";

export default function ProjectDetail({
  project,
  mode = "page",
}: {
  project: PortfolioProject;
  mode?: "page" | "inline";
}) {
  const featured = project.category !== "archive";
  const Title = mode === "inline" ? "h2" : "h1";
  const SectionTitle = mode === "inline" ? "h3" : "h2";

  return (
    <article className="project-detail" data-project={project.slug}>
      <header className="detail-title">
        <div className="detail-category">{project.eyebrow}</div>
        <Title
          id={
            mode === "inline" ? `inline-case-title-${project.slug}` : undefined
          }
          tabIndex={mode === "inline" ? -1 : undefined}
        >
          {project.title}
        </Title>
        <p>{project.summary}</p>
      </header>
      <dl className="detail-meta">
        <div>
          <dt>기간</dt>
          <dd>{project.period}</dd>
        </div>
        <div>
          <dt>역할</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>주요 기술</dt>
          <dd>{project.stack.slice(0, 4).join(" · ")}</dd>
        </div>
      </dl>
      {project.impactMetrics?.length ? (
        <ImpactMetrics
          metrics={project.impactMetrics}
          headingLevel={mode === "inline" ? "h3" : "h2"}
        />
      ) : null}
      {featured ? (
        <figure className="detail-visual">
          <ProjectArtwork diagram={project.diagram} />
          <figcaption>
            {project.images[0]?.caption ??
              "구현 흐름을 설명하는 도식입니다. 실제 서비스 화면이 아닙니다."}
          </figcaption>
        </figure>
      ) : null}
      <div className="detail-content">
        <Reveal className="case-section">
          <SectionTitle>
            {featured ? "어떤 문제였나요" : "프로젝트 소개"}
          </SectionTitle>
          <p className="whitespace-pre-line">{project.problem}</p>
        </Reveal>
        {featured ? (
          <Reveal className="case-section">
            <SectionTitle>어떻게 접근했나요</SectionTitle>
            <ul>
              {project.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ) : null}
        <Reveal className="case-section">
          <SectionTitle>내가 맡은 작업</SectionTitle>
          <ul>
            {project.contributions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="case-section">
          <SectionTitle>작업을 마친 뒤</SectionTitle>
          <p>{project.outcome}</p>
        </Reveal>
        <Reveal className="case-section">
          <SectionTitle>사용한 기술</SectionTitle>
          <div className="tech-tags">
            {project.stack.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </Reveal>
        {project.links.length > 0 ? (
          <Reveal className="case-section">
            <SectionTitle>관련 링크</SectionTitle>
            <div>
              <p>
                당시 프로젝트의 저장소와 자료입니다. 기존 배포 주소는 운영
                상태에 따라 달라질 수 있습니다.
              </p>
              <div className="detail-links">
                {project.links.map((link) => (
                  <a
                    className="text-link"
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}
        {!featured && project.images.length > 0 ? (
          <section className="detail-gallery" aria-label="관련 프로젝트 화면">
            {project.images.map((picture) => (
              <figure key={`${picture.src}-${picture.alt}`}>
                <Image
                  src={picture.src}
                  alt={picture.alt}
                  width={picture.width}
                  height={picture.height}
                  sizes={
                    mode === "inline"
                      ? "(min-width: 1024px) 35vw, 90vw"
                      : "(max-width: 767px) 90vw, 950px"
                  }
                />
                <figcaption>
                  {picture.caption} · {picture.alt}
                </figcaption>
              </figure>
            ))}
          </section>
        ) : null}
      </div>
    </article>
  );
}
