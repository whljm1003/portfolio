import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/assets/portfolio";
import ProjectDetail from "@/components/portfolio/ProjectDetail";
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

export default async function InlineWorkPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return <ProjectDetail project={project} mode="inline" />;
}
