"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Upload", href: "/upload" },
  { label: "Analysis", href: "/analysis" },
  { label: "History", href: "/history" },
  { label: "Dataset", href: "/dataset" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${
            scrolled
              ? "glass-dense shadow-lg shadow-black/20"
              : "bg-transparent"
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-amber to-accent-saffron shadow-lg shadow-accent-amber/20">
                <Flame className="h-5 w-5 text-bg-primary" />
              </span>
              <span className="heading-playfair text-xl font-bold tracking-tight text-text-primary">
                Cook
                <span className="gradient-text-amber">Lens</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-text-secondary
                    hover:text-text-primary transition-colors duration-200 group rounded-lg"
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0
                    bg-gradient-to-r from-accent-amber to-accent-saffron
                    group-hover:w-4/5 transition-all duration-300 rounded-full"
                  />
                </Link>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                href="/upload"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-gradient-to-r from-accent-amber to-accent-saffron
                  text-bg-primary text-sm font-semibold
                  shadow-[0_0_15px_rgba(245,158,11,0.25)]
                  hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]
                  transition-shadow duration-300"
              >
                Get Started
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary
                  hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass-dense md:hidden"
            >
              <div className="flex flex-col p-6 pt-20 gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl
                        text-text-secondary hover:text-text-primary
                        hover:bg-accent-amber/5 transition-all duration-200
                        text-base font-medium"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="mt-4 pt-4 border-t border-border-glass">
                  <Link
                    href="/upload"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                      bg-gradient-to-r from-accent-amber to-accent-saffron
                      text-bg-primary font-semibold
                      shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
