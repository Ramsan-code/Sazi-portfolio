import { HomeClient } from "@/app/HomeClient";
import { JsonLd, createSeoMetadata, siteConfig } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Graphic Designer & Brand Identity Portfolio",
  description:
    "Explore Sazi Balasingam's graphic design portfolio featuring brand identity, logo design, poster design, social media graphics, UI/UX systems, and digital experiences.",
  path: "/",
  type: "website",
  keywords: [
    "graphic design portfolio",
    "freelance graphic designer",
    "logo design portfolio",
    "poster design portfolio",
  ],
});

export default function Home() {
  return (
    <>
      {/* ── Person structured data ─────────────────────────────────── */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
          image: siteConfig.ogImage,
          jobTitle: "Graphic Designer",
          email: siteConfig.email,
          telephone: siteConfig.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Los Angeles",
            addressRegion: "CA",
            addressCountry: "US",
          },
          sameAs: siteConfig.sameAs,
          knowsAbout: [
            "Brand identity design",
            "Logo design",
            "Poster design",
            "Social media graphics",
            "UI/UX design",
            "Creative direction",
          ],
        }}
      />

      {/* ── WebSite structured data with SearchAction ──────────────── */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteConfig.url}/projects?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />

      <HomeClient />
    </>
  );
}
