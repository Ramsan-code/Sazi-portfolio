import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { ProjectDetailClient } from "@/app/projects/[slug]/ProjectDetailClient";
import { JsonLd, createSeoMetadata, siteConfig } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return createSeoMetadata({
    title: `${project.title} ${project.category} Case Study`,
    description: project.metaDescription,
    path: `/projects/${project.slug}`,
    keywords: project.keywords,
    type: "article",
  });
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          headline: `${project.title} ${project.category} Case Study`,
          url: `${siteConfig.url}/projects/${project.slug}`,
          description: project.summary,
          dateCreated: project.year,
          genre: project.category,
          keywords: project.keywords.join(", "),
          creator: {
            "@type": "Person",
            name: siteConfig.name,
            jobTitle: "Graphic Designer",
            url: siteConfig.url,
          },
        }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
