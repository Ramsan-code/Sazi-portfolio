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
  type?: "website" | "article";
};

export function createSeoMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
}: SeoMetadataOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

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
      images: [
        {
          url: "/portrait.png",
          width: 1200,
          height: 1200,
          alt: "Sazi Balasingam graphic designer portrait",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: siteConfig.socialHandle,
      images: ["/portrait.png"],
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
