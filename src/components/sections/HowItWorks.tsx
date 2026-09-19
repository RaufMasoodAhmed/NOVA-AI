"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  Link2,
  Sparkles,
  Workflow,
  ArrowRight,
  Database,
  Terminal,
  Layers,
  CheckCircle2,
  Clock,
  Cpu,
} from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "CONNECT",
    subtitle: "Bring your work, ideas, and information into NOVA.",
    description:
      "Seamlessly unify your knowledge across Google Drive, Notion, Slack, GitHub, Linear, and internal data warehouses. NOVA indexes document semantics in real-time with continuous vectorization.",
    highlights: [
      "Zero-latency connector mesh",
      "Enterprise SOC2-compliant permissions",
      "Semantic real-time vector embeddings",
    ],
    icon: Link2,
    previewTitle: "Live Data Pipeline Ingestion",
    previewData: [
      { source: "Notion Knowledge Base", count: "482 pages indexed", time: "0.2s" },
      { source: "GitHub Monorepo", count: "14,800 LOC mapped", time: "0.5s" },
      { source: "Slack Channels", count: "Continuous listener active", time: "Live" },
    ],
  },
  {
    step: "02",
    title: "CREATE",
    subtitle: "Tell NOVA what you want to accomplish.",
    description:
      "Interact naturally with frontier reasoning models. Formulate architectural blueprints, write full-stack code, draft high-stakes strategic proposals, or synthesize complex research into actionable directives.",
    highlights: [
      "Dual-engine reasoning & synthesis",
      "Multi-modal generative visual canvas",
      "Deterministic code generation with auto-tests",
    ],
    icon: Sparkles,
    previewTitle: "Intelligent Synthesis Session",
    previewData: [
      { source: "Autonomous Plan Formulated", count: "5 milestones created", time: "0.3s" },
      { source: "Code Assets Synthesized", count: "12 files generated", time: "0.8s" },
      { source: "Automated Verification", count: "100% test coverage", time: "Verified" },
    ],
  },
  {
    step: "03",
    title: "AUTOMATE",
    subtitle: "Turn repetitive processes into intelligent workflows.",
    description:
      "Convert completed workflows into autonomous cron jobs and event-driven agents. Let NOVA monitor deployments, draft weekly reports, triage customer requests, and resolve edge cases without human intervention.",
    highlights: [
      "Event-driven webhook orchestrators",
      "Multi-agent consensus execution",
      "Self-healing error recovery loops",
    ],
    icon: Workflow,
    previewTitle: "Autonomous Operational Agent",
    previewData: [
      { source: "Continuous Pull Request Sentinel", count: "24/7 Active", time: "Active" },
      { source: "Weekly Executive Digest", count: "Next run in 4h", time: "Scheduled" },
      { source: "Anomaly Circuit Breaker", count: "0 incidents reported", time: "Healthy" },
    ],
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-[#070709] border-t border-white/[0.06] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="EXECUTION CYCLE"
          title="From concept to autonomous execution."
          description="A three-stage methodology engineered to eliminate cognitive friction and accelerate idea execution."
          align="center"
        />

        {/* Step Navigation & Progressive Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-12 sm:mt-16">
          {/* Left: Step Narratives (7 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {STEPS.map((s, idx) => {
              const isSelected = activeStep === idx;
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${isSelected
                    ? "bg-[#111113] border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/10"
                    }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className={`text-xs font-mono font-bold tracking-widest px-2.5 py-1 rounded-md border ${isSelected
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                        : "bg-white/[0.04] text-neutral-500 border-white/[0.06]"
                        }`}
                    >
                      {s.step}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                      <span>{s.title}</span>
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base font-medium text-neutral-200 mb-2">
                    {s.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {s.description}
                  </p>

                  {/* Feature Highlights on Active Step */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="pt-4 mt-4 border-t border-white/[0.08] space-y-2"
                    >
                      {s.highlights.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right: Dynamic Interactive Terminal / Visualizer (6 cols) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-white/10 bg-[#0B0B0D] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Corner decorative light */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
              />

              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <span className="ml-2 text-xs font-mono text-neutral-400">
                    STAGE {STEPS[activeStep].step} {"//"} {STEPS[activeStep].title}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  REALTIME TELEMETRY
                </span>
              </div>

              {/* Step Display Card */}
              <div className="py-6 space-y-4">
                <div className="text-sm font-semibold text-white">
                  {STEPS[activeStep].previewTitle}
                </div>

                <div className="space-y-2.5">
                  {STEPS[activeStep].previewData.map((row, i) => (
                    <div
                      key={row.source}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2 text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{row.source}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-400">{row.count}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-neutral-300">
                          {row.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Log Feed */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.05] font-mono text-[11px] text-neutral-400 space-y-1">
                  <div className="text-neutral-500">&gt; verifying node consensus...</div>
                  <div className="text-blue-400">&gt; state synced across 3 availability zones</div>
                  <div className="text-emerald-400">&gt; execution readiness: 100%</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-400">
                <span className="font-mono">NOVA Runtime 4.8-Enterprise</span>
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
                  className="text-white hover:text-blue-400 flex items-center gap-1 transition-colors font-medium cursor-pointer"
                >
                  <span>Next Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
