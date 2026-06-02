import type { Metadata } from "next";

export const siteConfig = {
  name: "Sazi Balasingam",
  title: "Sazi Balasingam | Graphic Designer & Brand Identity Portfolio",
  description:
    "Portfolio of Sazi Balasingam, a graphic designer creating brand identity, logo design, poster design, social media graphics, UI/UX systems, and bold digital experiences.",
  url: "https://sazibalasingam.com",
  email: "hello@sazibalasingam.com",
  phone: "+15551234567",
  location: "Los Angeles, CA",
  socialHandle: "@sazibalasingam",
  // Absolute OG image — must be full URL for social crawlers
  ogImage: "https://sazibalasingam.com/portrait.png",
  // sameAs links used in Person JSON-LD structured data
  sameAs: [
    "https://www.instagram.com/sazibalasingam",
    "https://www.behance.net/sazibalasingam",
    "https://www.linkedin.com/in/sazibalasingam",
  ],
  keywords: [
    "graphic designer",
    "brand identity designer",
    "logo designer",
    "poster designer",
    "social media poster design",
    "UI UX designer",
    "visual identity design",
    "creative direction",
    "digital design portfolio",
  ],
};

type SeoMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  /** og:type — use 'profile' for About, 'article' for blog posts, default 'website' */
  type?: "website" | "article" | "profile";
  /** Override the default og:image with a specific absolute URL */
  ogImage?: string;
};

export function createSeoMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
  ogImage,
}: SeoMetadataOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  // Always use absolute URLs — relative paths are ignored by social crawlers
  const imageUrl = ogImage ?? siteConfig.ogImage;

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_US",
      images: [
        {
          url: imageUrl,          // ← absolute URL
          width: 1200,
          height: 1200,
          alt: `${siteConfig.name} — Graphic Designer & Brand Identity Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: siteConfig.socialHandle,
      site: siteConfig.socialHandle,
      images: [imageUrl],         // ← absolute URL
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
