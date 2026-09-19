"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  const TIERS = [
    {
      name: "FREE",
      price: "$0",
      cadence: "forever free",
      description: "Essential intelligence tools for individual creators, researchers, and students exploring AI.",
      features: [
        "AI workspace access",
        "Limited AI usage (100 daily queries)",
        "Basic projects & memory cache",
        "Standard reasoning latency",
        "Community support & docs",
      ],
      cta: "Start Free",
      variant: "secondary" as const,
      popular: false,
    },
    {
      name: "PRO",
      price: annual ? "$15" : "$19",
      cadence: annual ? "/ month, billed annually" : "/ month, billed monthly",
      description: "Uncapped frontier model compute for high-output power users, engineers, and founders.",
      features: [
        "Unlimited workspace access",
        "Advanced AI models (NOVA-4 Omni, Claude 3.5, GPT-4o)",
        "Generative 4K image & visual studio",
        "Document intelligence & 2M context recall",
        "Advanced autonomous workflows & background agents",
        "Priority API throughput & zero-queue guarantee",
      ],
      cta: "Start Pro",
      variant: "primary" as const,
      popular: true,
    },
    {
      name: "TEAMS",
      price: annual ? "$39" : "$49",
      cadence: annual ? "/ seat / month, billed annually" : "/ seat / month, billed monthly",
      description: "Collaborative cognitive infrastructure with role-based governance for modern high-velocity organizations.",
      features: [
        "Everything in Pro",
        "Shared organization workspace & asset vaults",
        "Real-time team collaboration & agent delegation",
        "Granular RBAC permissions & audit trails",
        "Shared workflows & central credential vaults",
        "Dedicated enterprise SLA & 24/7 Slack channel support",
      ],
      cta: "Build Your Team",
      variant: "secondary" as const,
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      {/* Background glow behind pricing cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/[0.05] rounded-full blur-[160px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="TRANSPARENT VALUE"
          title="Predictable investment. Boundless capability."
          description="Choose the plan that matches your ambition. Scale seamlessly from individual experiments to enterprise-wide adoption."
          align="center"
        />

        {/* Monthly / Annual Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12 sm:mb-16">
          <span
            className={`text-xs sm:text-sm font-medium transition-colors ${
              !annual ? "text-white" : "text-neutral-500"
            }`}
          >
            Monthly billing
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing discount"
            onClick={() => setAnnual(!annual)}
            className="relative w-12 h-6 rounded-full bg-neutral-800 border border-white/10 p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`w-5 h-5 rounded-full ${annual ? "bg-blue-400 translate-x-6" : "bg-neutral-400 translate-x-0"}`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs sm:text-sm font-medium transition-colors ${
                annual ? "text-white" : "text-neutral-500"
              }`}
            >
              Annual billing
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 font-semibold">
              SAVE 20%
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl transition-all duration-300 flex flex-col ${
                tier.popular
                  ? "border-2 border-blue-500/40 bg-[#0F0F12] shadow-[0_0_40px_rgba(59,130,246,0.15)] lg:-translate-y-2"
                  : "border border-white/10 bg-[#0B0B0D] hover:border-white/20"
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-[10px] font-mono uppercase tracking-[0.2em] font-bold shadow-md">
                  MOST POPULAR
                </div>
              )}

              <div className="p-7 sm:p-9 flex flex-col justify-between h-full space-y-8">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                      {tier.name}
                    </span>
                    {tier.popular && (
                      <Sparkles className="w-4 h-4 text-blue-400" />
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-mono">
                      {tier.price}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      {tier.cadence}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Features Divider */}
                  <div className="my-6 border-t border-white/[0.08]" />

                  {/* Features List */}
                  <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="pt-4">
                  <button
                    type="button"
                    className={`w-full py-3.5 px-6 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      tier.popular
                        ? "bg-white text-black hover:bg-neutral-200 shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                        : "bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Bottom Strip */}
        <div className="mt-16 text-center text-xs text-neutral-500 font-mono">
          <span>Enterprise air-gapped deployments & dedicated VPC instances available. </span>
          <a href="#contact" className="text-neutral-300 underline hover:text-white transition-colors">
            Contact Architecture Sales →
          </a>
        </div>
      </div>
    </section>
  );
}
