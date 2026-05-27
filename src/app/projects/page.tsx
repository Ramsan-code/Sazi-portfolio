import { PROJECTS } from "@/data/projects";
import { ProjectsClient } from "@/app/projects/ProjectsClient";
import { JsonLd, createSeoMetadata, siteConfig } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Graphic Design Portfolio & Case Studies",
  description:
    "Browse Sazi Balasingam's graphic design portfolio with brand identity, logo design, UI/UX, motion graphics, packaging, poster design, and social media creative case studies.",
  path: "/projects",
  keywords: [
    "graphic design case studies",
    "brand identity portfolio",
    "UI UX design portfolio",
    "packaging design portfolio",
    "motion graphics portfolio",
  ],
});

export default function Projects() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Graphic Design Portfolio",
          url: `${siteConfig.url}/projects`,
          description:
            "Selected brand identity, UI/UX, motion, packaging, and digital design case studies by Sazi Balasingam.",
          hasPart: PROJECTS.map((project) => ({
            "@type": "CreativeWork",
            name: project.title,
            url: `${siteConfig.url}/projects/${project.slug}`,
            genre: project.category,
            creator: {
              "@type": "Person",
              name: siteConfig.name,
            },
          })),
        }}
      />
      <ProjectsClient />
    </>
  );
}
