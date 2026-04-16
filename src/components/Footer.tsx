"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactForm } from "./ContactForm";

export function Footer({ showContact = true }: { showContact?: boolean }) {
  const pathname = usePathname();
  // Override showContact to false if we are on the dedicated contact page
  const displayContact = pathname === "/contact" ? false : showContact;

  return (
    <footer className="w-full bg-obsidian flex flex-col relative z-20">
      {/* Conditionally render Contact Form before footer ticker */}
      {displayContact && <ContactForm />}

      {/* Social Links & Meta */}
      <div className="w-full max-w-7xl mx-auto py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t-4 border-white/10">
        <div className="font-heading font-black text-4xl uppercase">
          Sazi <span className="text-mint">Balasingam</span>
        </div>
        
        <div className="flex gap-6 font-mono font-bold text-sm tracking-widest uppercase">
          <Link href="https://linkedin.com" target="_blank" className="hover:text-peri transition-colors">LinkedIn</Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-mint transition-colors">Twitter</Link>
          <Link href="https://instagram.com" target="_blank" className="hover:text-peri transition-colors">Instagram</Link>
          <Link href="https://github.com" target="_blank" className="hover:text-mint transition-colors">GitHub</Link>
        </div>
        
        <div className="font-mono text-xs text-gray-500">
          © {new Date().getFullYear()} ALL RIGHTS RESERVED.
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
