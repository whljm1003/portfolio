import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { featuredProjects, projects } from "@/assets/portfolio";
import ProjectDetail from "@/components/portfolio/ProjectDetail";
import SiteHeader from "@/components/portfolio/SiteHeader";
import SiteFooter from "@/components/portfolio/SiteFooter";
import { createProjectMetadata } from "@/lib/portfolio-metadata";

export const dynamic = "force-static";
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return createProjectMetadata(project);
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = featuredProjects.findIndex((item) => item.slug === slug);
  const next =
    index >= 0
      ? featuredProjects[(index + 1) % featuredProjects.length]
      : undefined;

  return (
    <div id="top">
      <SiteHeader />
      <main id="main-content" className="shell">
        <div className="detail-header">
          <Link className="back-link" href="/#work">
            <FiArrowLeft aria-hidden="true" />
            작업 목록으로
          </Link>
        </div>
        <ProjectDetail project={project} />
        <div className="detail-next">
          <Link className="text-link" href="/#career">
            경력·이전 작업 보기
          </Link>
          {next ? (
            <a href={`/work/${next.slug}`}>
              <div>
                <p>다음 사례</p>
                <h2>{next.title}</h2>
              </div>
            </a>
          ) : (
            <Link className="text-link" href="/#contact">
              연락하기
            </Link>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
