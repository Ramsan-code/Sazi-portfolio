"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 transition-colors duration-300 ${
          isScrolled 
            ? "bg-obsidian/90 backdrop-blur-md border-b-4 border-obsidian" 
            : "bg-transparent border-b-4 border-transparent"
        }`}
      >
        <Link href="/" className="font-heading font-black text-xl md:text-2xl uppercase hover:text-mint transition-colors relative z-50">
          Sazi Balasingam
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-mono text-sm tracking-widest uppercase">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative px-2 py-1 transition-all duration-150 active:translate-y-0 active:translate-x-0 ${
                  isActive ? "text-mint font-bold" : "text-white hover:text-peri hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_var(--color-peri)]"
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

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-obsidian z-[45] flex flex-col items-center justify-center gap-8 p-8 md:hidden"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-heading font-black text-5xl uppercase tracking-tighter ${
                    pathname === link.href ? "text-mint underline decoration-8 underline-offset-8" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex gap-6"
            >
              <div className="w-12 h-12 bg-mint rotate-45" />
              <div className="w-12 h-12 bg-peri -rotate-12" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
