import type { Metadata } from "next";
import type { PortfolioProject } from "@/assets/portfolio";

export function createProjectMetadata(project: PortfolioProject): Metadata {
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | DEAN · 이정민`,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: "article",
      locale: "ko_KR",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "DEAN 이정민 프론트엔드 개발자 포트폴리오",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | DEAN · 이정민`,
      description: project.summary,
      images: ["/opengraph-image"],
    },
  };
}
