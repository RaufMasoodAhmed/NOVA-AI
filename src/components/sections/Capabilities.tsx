"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  BrainCircuit,
  Wand2,
  FileSearch,
  Cpu,
  Sparkles,
  ArrowUpRight,
  Workflow,
  Zap,
  CheckCircle2,
  Sliders,
  Terminal,
  Layers,
  Database,
  GitPullRequest,
  Gauge,
} from "lucide-react";

export default function Capabilities() {
  const [activeReasoningStep, setActiveReasoningStep] = useState(2);

  return (
    <section id="capabilities" className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 w-[600px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[140px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="CORE ARCHITECTURE"
          title="Engineered for frontier cognitive performance."
          description="A multi-agent cognitive fabric that elevates raw computational power into actionable enterprise-grade intelligence."
          align="center"
        />

        {/* Bento Grid: 2 Large cards + 2 Standard cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Think Faster (Large 7-col) */}
          <SpotlightCard className="md:col-span-7 flex flex-col justify-between p-6 sm:p-8 lg:p-10 min-h-[460px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-blue-400" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
                  Feature 01
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Think Faster
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed">
                  AI-powered research, deep inductive reasoning, and complex hypothesis testing. Break massive multidimensional problems into structured execution trees in milliseconds.
                </p>
              </div>
            </div>

            {/* Interactive Visual Simulation: Multi-Hop Reasoning Tree */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-white">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  Reasoning Verification Loop
                </span>
                <span className="text-emerald-400">Latent Tree: Active</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {[
                  { step: "01", label: "Deconstruct premise into 6 formal logic constraints", status: "Verified" },
                  { step: "02", label: "Cross-validate counter-examples across corpus", status: "Verified" },
                  { step: "03", label: "Synthesize optimal zero-loss solution graph", status: "Optimized" },
                ].map((item, idx) => (
                  <div
                    key={item.step}
                    onClick={() => setActiveReasoningStep(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                      activeReasoningStep === idx
                        ? "bg-white/[0.06] border-white/20 text-white"
                        : "bg-white/[0.02] border-white/[0.04] text-neutral-400 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-blue-400">{item.step}</span>
                      <span className="text-xs">{item.label}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 shrink-0 font-medium">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: Create Anything (5-col) */}
          <SpotlightCard className="md:col-span-5 flex flex-col justify-between p-6 sm:p-8 min-h-[460px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-violet-400" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-violet-400">
                  Feature 02
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Create Anything
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Generate written, visual, and creative content with uncompromised aesthetic precision and editorial tone.
                </p>
              </div>
            </div>

            {/* Visual Studio Layer Preview */}
            <div className="mt-6 rounded-2xl bg-gradient-to-b from-[#141418] to-[#0A0A0C] border border-white/10 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>Multi-Modal Synthesizer</span>
                <span className="text-violet-400">4K Vector Canvas</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300">
                  <span className="block text-[10px] text-neutral-500">FORMAT</span>
                  SVG / WebGL
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300">
                  <span className="block text-[10px] text-neutral-500">TONE</span>
                  Architectural
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-300">
                  <span className="block text-[10px] text-neutral-500">FIDELITY</span>
                  Lossless
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3: Understand Everything (5-col) */}
          <SpotlightCard className="md:col-span-5 flex flex-col justify-between p-6 sm:p-8 min-h-[460px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <FileSearch className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  Feature 03
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Understand Everything
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Analyze documents, massive datasets, audio recordings, and codebase graphs with multi-million token context recall.
                </p>
              </div>
            </div>

            {/* Ingestion Stream Visualization */}
            <div className="mt-6 p-4 rounded-2xl bg-[#0B0B0D] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Database className="w-3.5 h-3.5" />
                  Embedding Index
                </span>
                <span>2.0M Context Window</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono text-neutral-300">
                <div className="flex justify-between p-2 rounded bg-white/[0.02]">
                  <span>Vector Precision</span>
                  <span className="text-emerald-400">1536-dim Dense</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/[0.02]">
                  <span>Needle Retrieval Accuracy</span>
                  <span className="text-white font-semibold">99.94%</span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 4: Automate Your Work (Large 7-col) */}
          <SpotlightCard className="md:col-span-7 flex flex-col justify-between p-6 sm:p-8 lg:p-10 min-h-[460px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Workflow className="w-6 h-6 text-blue-400" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-400">
                  Feature 04
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Automate Your Work
                </h3>
                <p className="text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed">
                  Build self-governing intelligent workflows that handle repetitive data aggregation, client communications, system audits, and scheduled tasks 24/7.
                </p>
              </div>
            </div>

            {/* Workflow Pipeline Diagram */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#0B0B0D] border border-white/[0.08]">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">Trigger</div>
                  <div className="text-xs font-semibold text-white truncate">Event Ingestion</div>
                  <div className="text-[10px] text-blue-400 font-mono">Real-time Webhook</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">Evaluation</div>
                  <div className="text-xs font-semibold text-white truncate">Agent Reasoning</div>
                  <div className="text-[10px] text-violet-400 font-mono">Consensus Check</div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">Execution</div>
                  <div className="text-xs font-semibold text-white truncate">Target Dispatch</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Zero Human Bottleneck</div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
