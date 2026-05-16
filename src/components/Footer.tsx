"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export function Footer({ showContact = true }: { showContact?: boolean }) {
  const pathname = usePathname();
  // Override showContact to false if we are on the dedicated contact page
  const displayContact = pathname === "/contact" ? false : showContact;

  return (
    <footer className="w-full bg-obsidian flex flex-col relative z-20">


      <div className="w-full max-w-7xl mx-auto py-16 px-8 flex flex-col items-center justify-center gap-6 border-t-4 border-white/10 text-center">
        <div className="font-heading font-black text-5xl md:text-6xl uppercase">
          Sazi <span className="text-mint">Balasingam</span>
        </div>

        <p className="font-mono text-sm md:text-base text-gray-400 max-w-lg mt-2">
          Forging high-impact visual identities and digital experiences. Let's create something amazing together.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-mono text-xs md:text-sm tracking-widest uppercase mt-6 text-gray-200">
          <a href="tel:+1234567890" className="hover:text-mint transition-colors duration-300">
            +1 (234) 567-890
          </a>
          <span className="hidden md:block text-gray-600">|</span>
          <a href="https://yourwebsite.com" target="_blank" rel="noreferrer" className="hover:text-peri transition-colors duration-300">
            WWW.YOURWEBSITE.COM
          </a>
          <span className="hidden md:block text-gray-600">|</span>
          <span className="hover:text-white transition-colors duration-300">
            123 CREATIVE STUDIO, DESIGN CITY, NY 10001
          </span>
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="w-full overflow-hidden border-t-4 border-obsidian py-2 bg-peri text-obsidian z-50 flex items-center">
        <div className="font-mono font-bold text-xs md:text-sm tracking-widest uppercase items-center whitespace-nowrap flex gap-4 md:gap-8 animate-marquee">
          <span>Brand Identity</span><span className="text-white">•</span>
          <span>Web Design</span><span className="text-white">•</span>
          <span>UX/UI</span><span className="text-white">•</span>
          <span>Typography</span><span className="text-white">•</span>
          <span>Creative Direction</span><span className="text-white">•</span>

          <span>Brand Identity</span><span className="text-white">•</span>
          <span>Web Design</span><span className="text-white">•</span>
          <span>UX/UI</span><span className="text-white">•</span>
          <span>Typography</span><span className="text-white">•</span>
          <span>Creative Direction</span><span className="text-white">•</span>

          <span>Brand Identity</span><span className="text-white">•</span>
          <span>Web Design</span><span className="text-white">•</span>
          <span>UX/UI</span><span className="text-white">•</span>
          <span>Typography</span><span className="text-white">•</span>
          <span>Creative Direction</span>
        </div>
      </div>
    </footer>
  );
}
