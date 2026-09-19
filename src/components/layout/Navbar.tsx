"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { label: "Product", href: "#workspace" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-all duration-300 pointer-events-none">
        <nav
          aria-label="Main Navigation"
          className={`mx-auto max-w-7xl h-14 sm:h-16 px-4 sm:px-6 rounded-full flex items-center justify-between pointer-events-auto transition-all duration-500 ${
            scrolled
              ? "bg-[#0B0B0D]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          >
            <div className="relative w-8 h-8 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-violet-600/30 opacity-60 group-hover:opacity-100 transition-opacity" />
              <Sparkles className="w-4 h-4 text-white relative z-10" />
            </div>
            <span className="text-lg font-bold tracking-[0.2em] uppercase text-white">
              NOVA
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-neutral-400 hover:text-white rounded-full transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="#login"
              className="text-xs lg:text-sm font-medium text-neutral-400 hover:text-white px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
            >
              Log in
            </Link>
            <MagneticButton size="sm" variant="primary" href="#workspace">
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Hamburger & Theme Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#050505]/95 flex flex-col justify-between p-6 sm:p-10 md:hidden"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold tracking-[0.2em] uppercase text-white">
                  NOVA
                </span>
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 text-white flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links with Staggered Entrance */}
            <nav className="flex flex-col gap-6 my-auto py-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.06 * idx,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-300 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Actions & Theme Switcher */}
            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between px-2 py-1 mb-1">
                <span className="text-sm font-medium text-neutral-400">Interface Theme</span>
                <ThemeToggle showDropdown={true} />
              </div>
              <Link
                href="#workspace"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-6 rounded-full bg-white text-black font-semibold text-center flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="#login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-6 rounded-full bg-[#111113] border border-white/10 text-neutral-300 font-medium text-center hover:text-white transition-colors text-sm"
              >
                Log in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
