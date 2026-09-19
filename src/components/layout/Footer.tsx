"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "PRODUCT",
    links: [
      { label: "AI Workspace", href: "#workspace" },
      { label: "AI Chat", href: "#workspace" },
      { label: "Documents", href: "#capabilities" },
      { label: "Workflows", href: "#capabilities" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
  {
    title: "SOCIAL",
    links: [
      { label: "X", href: "https://x.com", external: true },
      { label: "LinkedIn", href: "https://linkedin.com", external: true },
      { label: "GitHub", href: "https://github.com", external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] text-neutral-400 border-t border-white/[0.08] pt-16 sm:pt-20 pb-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-14 border-b border-white/[0.08]">
          {/* Brand Col (4 cols) */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2 inline-flex">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-[0.2em] uppercase text-white font-mono">
                NOVA
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              The intelligent workspace for creators, developers, students, freelancers, and modern teams moving at the speed of thought.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational (99.99% Uptime)</span>
            </div>
          </div>

          {/* Nav Columns (8 cols) */}
          <div className="col-span-2 md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-3">
                <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-white font-semibold">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        <span>{link.label}</span>
                        {link.external && (
                          <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
          <div>
            © 2026 NOVA AI. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-neutral-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-neutral-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-neutral-400 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
