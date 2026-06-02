import type { Metadata } from "next";
import { AboutClient } from "@/app/about/AboutClient";
import { JsonLd, createSeoMetadata, siteConfig } from "@/lib/seo";
import dbConnect from "@/lib/db";
import ProfileImage from "@/app/models/profileImg";

const description =
  "Learn about Sazi Balasingam's graphic design approach, brand identity philosophy, logo design process, poster design work, UI/UX systems, and creative direction.";

/**
 * generateMetadata: runs server-side so it can fetch the current
 * About image from MongoDB and inject it as the og:image.
 * This means every time the admin changes the About image,
 * the social share preview also updates automatically.
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    await dbConnect();
    const record = await ProfileImage.findOne({ page: "about" }).lean();
    const aboutImageUrl =
      (record as { url?: string } | null)?.url ?? siteConfig.ogImage;

    return createSeoMetadata({
      title: "About The Graphic Designer",
      description,
      path: "/about",
      type: "profile",          // ← correct og:type for a personal about page
      ogImage: aboutImageUrl,   // ← dynamically fetched from DB/Cloudinary
      keywords: [
        "about graphic designer",
        "brand identity design philosophy",
        "logo designer services",
        "creative direction portfolio",
      ],
    });
  } catch {
    // Fallback to static metadata if DB is unavailable
    return createSeoMetadata({
      title: "About The Graphic Designer",
      description,
      path: "/about",
      type: "profile",
      keywords: [
        "about graphic designer",
        "brand identity design philosophy",
        "logo designer services",
        "creative direction portfolio",
      ],
    });
  }
}

export default async function About() {
  // Fetch About image server-side for JSON-LD image field too
  let aboutImageUrl = siteConfig.ogImage;
  try {
    await dbConnect();
    const record = await ProfileImage.findOne({ page: "about" }).lean();
    aboutImageUrl = (record as { url?: string } | null)?.url ?? siteConfig.ogImage;
  } catch {
    /* use default */
  }

  return (
    <>
      {/* ── AboutPage structured data ──────────────────────────────── */}
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
            email: siteConfig.email,
            image: aboutImageUrl,
            sameAs: siteConfig.sameAs,
            knowsAbout: [
              "Brand identity design",
              "Logo design",
              "Poster design",
              "Social media graphics",
              "UI/UX design",
              "Creative direction",
            ],
          },
        }}
      />

      <AboutClient />
    </>
  );
}
