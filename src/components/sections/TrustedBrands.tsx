"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Orbit,
  Zap,
  Shield,
  Layers,
  Compass,
  Box,
  Cpu,
  Feather,
} from "lucide-react";

const BRANDS = [
  { name: "ORBIT", icon: Orbit, descriptor: "AEROSPACE LABS" },
  { name: "LUMA", icon: Zap, descriptor: "CREATIVE STUDIOS" },
  { name: "VANTA", icon: Shield, descriptor: "SECURITY PROTOCOLS" },
  { name: "NEXUS", icon: Layers, descriptor: "DATA FABRIC" },
  { name: "ARC", icon: Compass, descriptor: "VENTURE ENGINES" },
  { name: "VECTOR", icon: Box, descriptor: "SYNTHETIC INTELLIGENCE" },
  { name: "CYPHER", icon: Cpu, descriptor: "QUANTUM HARDWARE" },
  { name: "AURA", icon: Feather, descriptor: "COGNITIVE SYSTEMS" },
];

export default function TrustedBrands() {
  return (
    <section className="relative py-12 sm:py-16 border-y border-white/[0.06] overflow-hidden bg-[#070709]">
      {/* Edge Gradient Mask Overlays */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono uppercase tracking-[0.25em] text-[#71717A]"
        >
          POWERING NEXT-GENERATION TEAMS AT INDUSTRY FRONTIERS
        </motion.p>
      </div>

      {/* Infinite Logo Marquee Container */}
      <div className="flex select-none">
        <div className="animate-marquee flex items-center gap-12 sm:gap-20 pr-12 sm:pr-20">
          {[...BRANDS, ...BRANDS].map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center gap-3 text-neutral-500 hover:text-white transition-all duration-300 cursor-default group"
            >
              <brand.icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110 text-neutral-500 group-hover:text-blue-400" />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-[0.2em] font-mono text-neutral-400 group-hover:text-white transition-colors">
                  {brand.name}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  {brand.descriptor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
