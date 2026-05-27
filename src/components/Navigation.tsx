"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navigation() {
  const pathname = usePathname();

  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  // Hide navbar on scroll down
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

  // Prevent background scroll when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Work" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          px-4 py-3
          sm:px-6 sm:py-4
          md:px-8 md:py-5
          ${
            isScrolled
              ? "bg-obsidian/90 backdrop-blur-md border-b border-white/10"
              : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="font-heading font-black text-lg sm:text-xl md:text-2xl uppercase hover:text-mint transition-colors relative z-50"
          >
            Sazi Balasingam
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-5 lg:gap-8 font-mono text-sm tracking-widest uppercase">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-2 py-1 transition-all duration-200
                    ${
                      isActive
                        ? "text-mint font-bold"
                        : "text-white hover:text-peri hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_var(--color-peri)]"
                    }`}
                >
                  {link.label}

                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute -inset-2 border-2 border-mint -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            aria-label="Toggle Menu"
            className="md:hidden text-white p-3 rounded-lg active:scale-95 transition-transform z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 22,
              stiffness: 180,
            }}
            className="fixed inset-0 bg-obsidian z-[45]
              flex flex-col items-center justify-center
              gap-8 p-8 md:hidden"
          >
            {/* MOBILE LINKS */}
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
                  className={`font-heading font-black
                    text-3xl sm:text-4xl md:text-5xl
                    uppercase tracking-tighter text-center transition-colors
                    ${
                      pathname === link.href
                        ? "text-mint underline decoration-8 underline-offset-8"
                        : "text-white hover:text-peri"
                    }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* DECORATION */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex gap-6"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-mint rotate-45" />
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-peri -rotate-12" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}