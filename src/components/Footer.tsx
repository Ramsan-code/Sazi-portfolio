"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/seo";

type FooterProps = {
  showContact?: boolean;
};

export function Footer({ showContact = true }: FooterProps) {
  const pathname = usePathname();

  // Hide CTA on contact page
  const shouldShowContact =
    pathname !== "/contact" && showContact;

  const tickerItems = [
    "Brand Identity",
    "Web Design",
    "UX/UI",
    "Typography",
    "Creative Direction",
    "Graphic Design",
    "Frontend Development",
    "Motion Design",
  ];

  return (
    <footer className="relative z-20 w-full overflow-hidden bg-obsidian">
      {/* MAIN FOOTER */}
      <div
        className="
          mx-auto flex w-full max-w-7xl flex-col items-center justify-center
          border-t border-white/10
          px-4 py-12
          text-center
          sm:px-6 sm:py-14
          md:px-8 md:py-16
          lg:py-20
        "
      >
        {/* BRAND */}
        <div
          className="
            font-heading font-black uppercase leading-none
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            break-words
          "
        >
          Sazi <span className="text-mint">Balasingam</span>
        </div>

        {/* DESCRIPTION */}
        <p
          className="
            mt-5 max-w-2xl
            px-2
            font-mono leading-relaxed text-gray-400
            text-xs
            sm:text-sm
            md:text-base
          "
        >
          Forging high-impact visual identities and digital experiences.
          Creating brand identity systems, logo design, poster design, social
          media graphics, modern websites, and user experiences that help
          businesses stand out across digital platforms.
        </p>

        {/* CONTACT DETAILS */}
        <div
          className="
            mt-8
            flex w-full flex-col items-center justify-center
            gap-4
            font-mono uppercase tracking-widest text-gray-200
            text-[10px]
            sm:text-xs
            md:text-sm
            lg:flex-row lg:gap-6
          "
        >
          {/* PHONE */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="
              break-all transition-colors duration-300
              hover:text-mint
            "
          >
            +1 (555) 123-4567
          </a>

          <span className="hidden lg:block text-gray-600">|</span>

          {/* WEBSITE */}
          <a
            href={siteConfig.url}
            target="_blank"
            rel="noreferrer"
            className="
              break-all transition-colors duration-300
              hover:text-peri
            "
          >
            sazibalasingam.com
          </a>

          <span className="hidden lg:block text-gray-600">|</span>

          {/* ADDRESS */}
          <p
            className="
              max-w-md
              leading-relaxed
              text-center
              text-gray-300
            "
          >
            {siteConfig.location}
          </p>
        </div>

        {/* CTA BUTTON */}
        {shouldShowContact && (
          <div className="mt-8">
            <Link
              href="/contact"
              className="
                inline-flex items-center justify-center
                border-2 border-white
                px-5 py-3
                font-mono font-bold uppercase tracking-widest
                transition-all duration-300
                hover:bg-white hover:text-obsidian
                active:scale-95
                text-[10px]
                sm:px-6 sm:text-xs
                md:text-sm
              "
            >
              Start A Design Project
            </Link>
          </div>
        )}
      </div>

      {/* RESPONSIVE MARQUEE */}
      <div
        className="
          relative flex w-full items-center overflow-hidden
          border-t border-white/10
          bg-peri
          py-3
          text-obsidian
        "
      >
        <div
          className="
            animate-marquee
            flex min-w-max items-center
            gap-4
            whitespace-nowrap
            font-mono font-bold uppercase tracking-widest
            text-[10px]
            sm:gap-6 sm:text-xs
            md:gap-8 md:text-sm
          "
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map(
            (item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center gap-4 md:gap-6"
              >
                <span>{item}</span>
                <span className="text-white">•</span>
              </div>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
