"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`relative z-10 mb-12 sm:mb-16 md:mb-20 ${
        isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl"
      } ${className}`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-4 sm:mb-6 text-[11px] uppercase tracking-[0.2em] font-mono text-neutral-300 shadow-sm ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-white"
      >
        {title}{" "}
        {highlight && (
          <span className="text-gradient-silver inline-block">{highlight}</span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[#A1A1AA] font-normal leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
