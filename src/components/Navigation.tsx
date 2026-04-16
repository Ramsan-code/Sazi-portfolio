"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 bg-obsidian/80 backdrop-blur-md border-b-4 border-obsidian mix-blend-normal">
      <Link href="/" className="font-heading font-black text-2xl tracking-tighter uppercase hover:text-mint transition-colors">
        Sazi Stark
      </Link>
      
      <div className="flex gap-4 md:gap-8 font-mono text-xs md:text-sm tracking-widest uppercase">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`relative px-2 py-1 transition-all duration-150 active:translate-y-0 active:translate-x-0 ${
                isActive ? "text-mint underline decoration-mint decoration-4 underline-offset-4" : "text-white hover:text-peri hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_var(--color-peri)]"
              }`}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute -inset-2 border-2 border-mint rounded-none -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
