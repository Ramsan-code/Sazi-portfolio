import { ContactForm } from "@/components/ContactForm";
import { JsonLd, createSeoMetadata, siteConfig } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "Contact A Graphic Designer",
  description:
    "Contact Sazi Balasingam for brand identity design, logo design, poster design, social media graphics, UI/UX systems, packaging, and creative direction projects.",
  path: "/contact",
  keywords: [
    "hire graphic designer",
    "contact brand identity designer",
    "logo design inquiry",
    "poster design services",
    "UI UX design inquiry",
  ],
});

export default function Contact() {
  return (
    <main className="w-full bg-obsidian min-h-screen pt-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Sazi Balasingam",
          url: `${siteConfig.url}/contact`,
          description:
            "Contact Sazi Balasingam for brand identity, logo design, poster design, social media graphics, UI/UX, and creative direction projects.",
          mainEntity: {
            "@type": "Person",
            name: siteConfig.name,
            email: siteConfig.email,
            telephone: siteConfig.phone,
            jobTitle: "Graphic Designer",
          },
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 mb-16 text-white text-center">
        <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-8xl uppercase mb-6 relative">
          Hire A{" "}
          <span className="text-mint inline-block relative -z-10 before:content-[''] before:absolute before:-inset-2 before:bg-white before:-z-10 before:translate-x-2 before:translate-y-2 text-obsidian px-2">
            Graphic Designer.
          </span>
        </h1>
        <p className="font-mono text-base sm:text-lg text-gray-300 max-w-3xl w-full mx-auto">
          Currently taking on select brand identity, logo design, poster
          design, social media graphics, packaging, and UI/UX projects. Share
          the shape of your design challenge below or reach out directly.
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-12 font-mono text-xs sm:text-sm uppercase font-bold text-peri">
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-mint transition-colors break-all"
          >
            {siteConfig.email}
          </a>
          <span className="hidden sm:inline">•</span>
          <span>{siteConfig.location}</span>
          <span className="hidden sm:inline">•</span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="hover:text-mint transition-colors"
          >
            +1 (555) 123-4567
          </a>
        </div>
      </div>

      <ContactForm />
    </main>
  );
}
