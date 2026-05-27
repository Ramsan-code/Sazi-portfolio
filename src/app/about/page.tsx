import { AboutClient } from "@/app/about/AboutClient";
import { JsonLd, createSeoMetadata, siteConfig } from "@/lib/seo";

const description =
  "Learn about Sazi Balasingam's graphic design approach, brand identity philosophy, logo design process, poster design work, UI/UX systems, and creative direction.";

export const metadata = createSeoMetadata({
  title: "About The Graphic Designer",
  description,
  path: "/about",
  keywords: [
    "about graphic designer",
    "brand identity design philosophy",
    "logo designer services",
    "creative direction portfolio",
  ],
});

export default function About() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Sazi Balasingam",
          url: `${siteConfig.url}/about`,
          description,
          mainEntity: {
            "@type": "Person",
            name: siteConfig.name,
            jobTitle: "Graphic Designer",
            url: siteConfig.url,
          },
        }}
      />
      <AboutClient />
    </>
  );
}
