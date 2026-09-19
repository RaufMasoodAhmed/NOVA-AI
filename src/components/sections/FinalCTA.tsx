"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function FinalCTA() {
  return (
    <section className="relative py-28 sm:py-40 overflow-hidden bg-[#050505] border-t border-white/[0.08]">
      {/* Slow Elegant Atmospheric Ambient Light Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-blue-600/15 via-violet-600/10 to-transparent rounded-full blur-[160px] -z-10 animate-aurora"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent -z-10"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Sleek Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-8 text-xs font-mono uppercase tracking-[0.25em] text-neutral-300 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>JOIN THE NEXT EVOLUTION</span>
        </motion.div>

        {/* Large Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.04]"
        >
          Build what’s{" "}
          <span className="text-gradient-silver block sm:inline">
            next.
          </span>
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-[#A1A1AA] font-normal leading-relaxed max-w-xl"
        >
          One workspace. Unlimited possibilities.
        </motion.p>

        {/* Magnetic CTA Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <MagneticButton size="lg" variant="primary" href="#workspace">
            <span>Start Creating</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton size="lg" variant="outline" href="#pricing">
            <span>Explore Pricing</span>
          </MagneticButton>
        </motion.div>

        {/* Guarantee notes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-6 text-xs font-mono text-neutral-500"
        >
          <span>14-day free trial</span>
          <span>•</span>
          <span>No credit card required</span>
          <span>•</span>
          <span>Instant setup</span>
        </motion.div>
      </div>
    </section>
  );
}
