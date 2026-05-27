import { HomeClient } from "@/app/HomeClient";
import { JsonLd, createSeoMetadata, siteConfig } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Graphic Designer & Brand Identity Portfolio",
  description:
    "Explore Sazi Balasingam's graphic design portfolio featuring brand identity, logo design, poster design, social media graphics, UI/UX systems, and digital experiences.",
  path: "/",
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
          image: `${siteConfig.url}/portrait.png`,
          jobTitle: "Graphic Designer",
          email: siteConfig.email,
          telephone: siteConfig.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Los Angeles",
            addressRegion: "CA",
            addressCountry: "US",
          },
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
        }}
      />
      <HomeClient />
    </>
  );
}
