"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Layers,
  Terminal,
  Cpu,
  Workflow,
  Search,
  CheckCircle2,
  ChevronRight,
  Code2,
  FileText,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const PROMPT_PRESETS = [
  {
    label: "Synthesize Q4 Strategy",
    query: "Analyze our competitive landscape, Q3 pipeline delta, and build a 90-day expansion playbook.",
    response:
      "Synthesizing 42 document vectors and cross-referencing Q3 pipeline data. Generated 3-tier expansion playbook with 88.4% predictive confidence.",
    metric: "+32.4% Est. Velocity",
  },
  {
    label: "Generate Microservice",
    query: "Implement a fault-tolerant event broker worker using TypeScript with exponential backoff.",
    response:
      "Constructed async resilient worker pipeline with automatic dead-letter queue routing and OpenTelemetry trace propagation.",
    metric: "0.4ms In-Memory Loop",
  },
  {
    label: "Audit Smart Contract",
    query: "Run symbolic execution scan on liquidity pool reentrancy vectors and gas optimizations.",
    response:
      "Identified 0 critical vulnerabilities. Applied storage slot packing saving 14,200 gas per settlement transaction.",
    metric: "99.98% Verification",
  },
];

export default function Hero() {
  const [activePreset, setActivePreset] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectPreset = (index: number) => {
    if (index === activePreset) return;
    setIsGenerating(true);
    setActivePreset(index);
    setTimeout(() => setIsGenerating(false), 300);
  };

  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 pb-20 sm:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[550px] bg-gradient-to-b from-blue-600/10 via-violet-600/08 to-transparent rounded-full blur-[140px] -z-10 animate-aurora"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Centered Hero Content */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-6 sm:mb-8 text-xs font-mono uppercase tracking-[0.25em] text-neutral-300 shadow-[0_0_20px_rgba(255,255,255,0.03)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>THE INTELLIGENT WORKSPACE</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.04]"
          >
            Your entire AI workflow.{" "}
            <span className="text-gradient-silver block sm:inline">
              In one place.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-[#A1A1AA] max-w-2xl font-normal leading-relaxed"
          >
            Create, think, analyze, and automate with a powerful AI workspace
            designed to move at the speed of your ideas.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <MagneticButton size="lg" variant="primary" href="#workspace">
              <span>Start Creating</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton size="lg" variant="outline" href="#capabilities">
              <span>Explore NOVA</span>
            </MagneticButton>
          </motion.div>

          {/* Micro Trust Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#71717A]"
          >
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              Sub-90ms latency
            </span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              SOC2 Type II Certified
            </span>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              Enterprise Reasoning Models
            </span>
          </motion.div>
        </div>

        {/* HERO INTERACTION: Animated NOVA AI Workspace Interface */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-20 relative max-w-6xl mx-auto"
        >
          {/* Ambient Glow behind workspace */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500/15 via-violet-500/10 to-blue-500/15 rounded-3xl blur-2xl opacity-75 -z-10" />

          {/* SaaS Interface Shell */}
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B0B0D] shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden">
            {/* Window Chrome / Header */}
            <div className="h-12 border-b border-white/[0.08] px-4 sm:px-6 flex items-center justify-between bg-[#111113]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/15" />
                  <div className="w-3 h-3 rounded-full bg-white/15" />
                  <div className="w-3 h-3 rounded-full bg-white/15" />
                </div>
                <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 text-xs font-mono text-neutral-400">
                  <span className="text-white font-medium">nova-workspace</span>
                  <span className="text-neutral-600">/</span>
                  <span className="text-neutral-400">autonomous-thread-09</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Center Model Indicator */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-[11px]">NOVA-4 Omni • 84ms</span>
              </div>

              {/* Right Tools */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-neutral-400 font-mono text-[11px]">
                  <Search className="w-3 h-3" />
                  <span>Cmd + K</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-[10px] text-white font-bold">
                  N
                </div>
              </div>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px] sm:min-h-[540px]">
              {/* Left Workspace Sidebar */}
              <aside className="hidden md:flex md:col-span-3 border-r border-white/[0.08] bg-[#0E0E10] p-4 flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase px-2">
                    Active Spaces
                  </div>
                  <nav className="space-y-1">
                    {[
                      { icon: Bot, label: "AI Reasoning", active: true },
                      { icon: Layers, label: "Generative Canvas", active: false },
                      { icon: Workflow, label: "Automated Flows", active: false },
                      { icon: Code2, label: "Code & APIs", active: false },
                      { icon: FileText, label: "Knowledge Vault", active: false },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                          item.active
                            ? "bg-white/[0.08] text-white border border-white/10"
                            : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                        }`}
                      >
                        <item.icon className="w-4 h-4 text-blue-400" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>

                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase px-2 mb-2">
                      Recent Pipelines
                    </div>
                    <div className="space-y-1 text-xs text-neutral-400">
                      <div className="px-3 py-1.5 rounded hover:bg-white/[0.03] cursor-pointer flex items-center justify-between">
                        <span className="truncate">Q4_forecast_model</span>
                        <span className="text-[10px] text-emerald-400 font-mono">98%</span>
                      </div>
                      <div className="px-3 py-1.5 rounded hover:bg-white/[0.03] cursor-pointer flex items-center justify-between">
                        <span className="truncate">agent_memory_sync</span>
                        <span className="text-[10px] text-blue-400 font-mono">Idle</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compute Resource Status */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-violet-400" />
                      Inference Engine
                    </span>
                    <span className="text-white font-mono">Normal</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-violet-500 h-full w-[64%]" />
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono flex justify-between">
                    <span>148 tokens/s</span>
                    <span>H100 Node 04</span>
                  </div>
                </div>
              </aside>

              {/* Main Interactive AI Canvas */}
              <main className="md:col-span-6 p-4 sm:p-6 flex flex-col justify-between bg-[#0B0B0D]">
                <div className="space-y-4">
                  {/* Preset Selector Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase pr-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-400" /> Try:
                    </span>
                    {PROMPT_PRESETS.map((preset, idx) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleSelectPreset(idx)}
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                          activePreset === idx
                            ? "bg-white text-black font-semibold shadow-sm"
                            : "bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/[0.1] border border-white/[0.06]"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Simulated Conversation Thread */}
                  <div className="space-y-4 pt-2">
                    {/* User Prompt Box */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-neutral-200">
                      <div className="flex items-center gap-2 mb-1.5 text-[11px] font-mono text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>USER PROMPT</span>
                      </div>
                      <p className="leading-relaxed">
                        {PROMPT_PRESETS[activePreset].query}
                      </p>
                    </div>

                    {/* AI Response Card */}
                    <div className="p-4 sm:p-5 rounded-xl bg-[#111113] border border-white/10 space-y-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                          <Bot className="w-4 h-4 text-blue-400" />
                          <span className="text-white font-medium">NOVA Intelligence</span>
                          <span className="text-neutral-600">•</span>
                          <span className="text-emerald-400">Thought process complete</span>
                        </div>
                        <span className="text-[11px] font-mono text-neutral-400 px-2 py-0.5 rounded bg-white/[0.04]">
                          {PROMPT_PRESETS[activePreset].metric}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                        {isGenerating ? (
                          <div className="flex items-center gap-2 text-neutral-400 py-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                            <span>Computing multi-step reasoning vectors...</span>
                          </div>
                        ) : (
                          <p>{PROMPT_PRESETS[activePreset].response}</p>
                        )}
                      </div>

                      {/* Micro Action Cards */}
                      <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-neutral-300">
                          <span>Confidence Score</span>
                          <span className="text-emerald-400 font-semibold">99.4%</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-neutral-300">
                          <span>Verification Chain</span>
                          <span className="text-blue-400">Zero Anomalies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Interactive Prompt Input */}
                <div className="mt-4 pt-3 border-t border-white/[0.08]">
                  <div className="relative flex items-center rounded-xl bg-white/[0.04] border border-white/10 p-2 sm:p-2.5 focus-within:border-white/25 transition-colors">
                    <input
                      type="text"
                      readOnly
                      value="Ask NOVA to write, research, generate or automate..."
                      className="w-full bg-transparent text-xs sm:text-sm text-neutral-400 focus:outline-none pl-2 pr-10 cursor-pointer"
                    />
                    <div className="absolute right-2 flex items-center gap-1.5">
                      <button
                        type="button"
                        aria-label="Send prompt"
                        className="w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </main>

              {/* Right Telemetry & Workflow Panel */}
              <aside className="hidden lg:flex lg:col-span-3 border-l border-white/[0.08] bg-[#0E0E10] p-4 flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
                    <span>Live Telemetry</span>
                    <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
                  </div>

                  {/* Real-time stats */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-1">
                      <div className="text-[10px] font-mono text-neutral-400">SYNAPSE RESPONSE TIME</div>
                      <div className="text-lg font-semibold text-white font-mono">72.4 ms</div>
                      <div className="text-[10px] text-emerald-400 font-mono">Optimal latency range</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] space-y-1">
                      <div className="text-[10px] font-mono text-neutral-400">ACTIVE CONTEXT WINDOW</div>
                      <div className="text-lg font-semibold text-white font-mono">2,000,000</div>
                      <div className="text-[10px] text-blue-400 font-mono">Deep memory enabled</div>
                    </div>
                  </div>

                  {/* Autonomous Workers status */}
                  <div className="pt-3 border-t border-white/[0.06] space-y-2">
                    <div className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
                      Active Agents
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { name: "Code Synthesizer", status: "Active", dot: "bg-emerald-400" },
                        { name: "Doc Vectorizer", status: "Indexing", dot: "bg-blue-400" },
                        { name: "Continuous Red-Team", status: "Listening", dot: "bg-violet-400" },
                      ].map((agent) => (
                        <div
                          key={agent.name}
                          className="flex items-center justify-between p-2 rounded bg-white/[0.02] text-xs"
                        >
                          <span className="text-neutral-300 truncate">{agent.name}</span>
                          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                            <span className={`w-1.5 h-1.5 rounded-full ${agent.dot}`} />
                            {agent.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Model Security Seal */}
                <div className="p-2.5 rounded-xl bg-blue-500/[0.04] border border-blue-500/15 text-[11px] text-neutral-400 font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Zero Data Retention • E2E Encrypted</span>
                </div>
              </aside>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
