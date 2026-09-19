"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  MessageSquare,
  PenTool,
  FolderGit2,
  GitFork,
  Send,
  Sparkles,
  Bot,
  Image as ImageIcon,
  BarChart3,
  FileText,
  Play,
  CheckCircle2,
  Clock,
  ArrowRight,
  Code2,
  ChevronRight,
  Database,
  RefreshCw,
} from "lucide-react";

type TabKey = "chat" | "create" | "projects" | "workflows";

const TABS: { id: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "chat", label: "AI Chat", icon: MessageSquare },
  { id: "create", label: "Create Studio", icon: PenTool },
  { id: "projects", label: "Active Projects", icon: FolderGit2 },
  { id: "workflows", label: "Autonomous Workflows", icon: GitFork },
];

export default function WorkspaceShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>("chat");

  return (
    <section id="workspace" className="relative py-24 sm:py-32 overflow-hidden bg-[#050505]">
      {/* Subtle background ambient gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-600/08 via-violet-600/05 to-transparent rounded-full blur-[140px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="ONE WORKSPACE. EVERY POSSIBILITY."
          title="Everything you need to work with AI."
          description="Consolidate models, tools, datasets, and automations into an unified high-performance workspace engineered for clarity."
          align="center"
        />

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center justify-center mb-10 sm:mb-14">
          <div className="inline-flex p-1.5 rounded-full bg-[#111113] border border-white/10 max-w-full overflow-x-auto scrollbar-none shadow-xl">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeWorkspaceTab"
                      className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/20"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? "text-blue-400" : "text-neutral-500"}`} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Showcase Viewports */}
        <div className="relative min-h-[560px] rounded-3xl border border-white/10 bg-[#0B0B0D] p-4 sm:p-8 lg:p-10 shadow-[0_32px_80px_rgba(0,0,0,0.85)]">
          <AnimatePresence mode="wait">
            {/* TAB 1: AI CHAT */}
            {activeTab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full"
              >
                {/* Chat conversation area */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    {/* User message */}
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        U
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-neutral-400">Chief Strategy Officer</span>
                          <span className="text-[10px] text-neutral-600">Today at 10:14 AM</span>
                        </div>
                        <p className="text-sm text-neutral-200 leading-relaxed">
                          Analyze the impact of EU AI Act Article 50 on our multi-agent customer pipeline. Produce an executive risk assessment and automated mitigation blueprint.
                        </p>
                      </div>
                    </div>

                    {/* AI message */}
                    <div className="flex items-start gap-3 p-5 rounded-2xl bg-[#111113] border border-white/10">
                      <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="space-y-3 w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-white font-semibold">NOVA DeepReason-4</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Verified Compliance
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-neutral-500">Execution time: 1.14s</span>
                        </div>

                        {/* Collapsible thought chain preview */}
                        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs font-mono text-neutral-400 space-y-1.5">
                          <div className="text-[10px] uppercase tracking-wider text-neutral-500">Reasoning Chain</div>
                          <div className="flex items-center gap-2 text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Parsed 168 pages of regulatory statutes & technical annexes</span>
                          </div>
                          <div className="flex items-center gap-2 text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Audited system metadata watermarking & synthetic output logs</span>
                          </div>
                        </div>

                        {/* Formatted assessment cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <div className="text-xs font-semibold text-white mb-1">Obligation Index</div>
                            <div className="text-xl font-bold text-white font-mono">Tier 2 High-Risk</div>
                            <div className="text-[11px] text-neutral-400 mt-1">Requires human oversight logging & explainability artifacts</div>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                            <div className="text-xs font-semibold text-white mb-1">Automated Resolution</div>
                            <div className="text-xl font-bold text-emerald-400 font-mono">100% Patch Ready</div>
                            <div className="text-[11px] text-neutral-400 mt-1">Telemetry interceptors injected into pipeline middleware</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input row */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/[0.03] border border-white/10">
                      <input
                        type="text"
                        readOnly
                        value="Export full audit table to Linear ticket #ENG-4902..."
                        className="w-full bg-transparent px-3 text-sm text-neutral-400 focus:outline-none cursor-pointer"
                      />
                      <button
                        type="button"
                        aria-label="Send message"
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold flex items-center gap-1.5 hover:bg-neutral-200 transition-colors"
                      >
                        <span>Dispatch</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right context inspector */}
                <div className="lg:col-span-4 rounded-2xl bg-[#0E0E10] border border-white/[0.08] p-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Active Model Parameters
                    </div>
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                        <span className="text-neutral-400">Temperature</span>
                        <span className="font-mono text-white">0.15 (Deterministic)</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                        <span className="text-neutral-400">Grounding Source</span>
                        <span className="font-mono text-blue-400">Vector Knowledge Base</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                        <span className="text-neutral-400">Streaming Mode</span>
                        <span className="font-mono text-emerald-400">SSE Chunked</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06]">
                      <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Referenced Documents
                      </div>
                      <div className="space-y-1.5 text-xs text-neutral-300">
                        <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] truncate">
                          <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="truncate">EU_AI_Act_Consolidated_v2.pdf</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] truncate">
                          <Code2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                          <span className="truncate">agent_orchestrator.ts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-neutral-400 space-y-1">
                    <div className="text-white font-medium">Auto-Verification Active</div>
                    <div>Every token verified by cross-layer consistency monitors.</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: CREATE STUDIO */}
            {activeTab === "create" && (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {/* Write Card */}
                <SpotlightCard className="flex flex-col justify-between min-h-[340px]">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Write & Author</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Draft comprehensive architectural specifications, technical PRDs, executive whitepapers, and copy.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-neutral-300 space-y-1">
                    <span className="text-[10px] text-blue-400 uppercase">Preview</span>
                    <p className="line-clamp-3 text-neutral-400">
                      "Section 4: Multi-region consensus mechanism with optimistic read replicas..."
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Launch Writer</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </SpotlightCard>

                {/* Generate Image Card */}
                <SpotlightCard className="flex flex-col justify-between min-h-[340px]">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-blue-500/20 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Generate Imagery</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Synthesize ultra-high fidelity conceptual 3D renders, UI mockups, brand assets, and visual schemas.
                    </p>
                  </div>
                  <div className="h-24 rounded-xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-violet-950/40 border border-white/10 p-3 flex flex-col justify-end">
                    <span className="text-[10px] font-mono text-violet-300">Prompt: "Dark luxury obsidian crystal..."</span>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Create Canvas</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </SpotlightCard>

                {/* Analyze Card */}
                <SpotlightCard className="flex flex-col justify-between min-h-[340px]">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Deep Analysis</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Feed complex CSVs, database tables, financial statements, and telemetry streams for automated insight discovery.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono space-y-1">
                    <div className="flex justify-between text-neutral-400">
                      <span>Regression R²</span>
                      <span className="text-emerald-400">0.978</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Anomalies Detected</span>
                      <span className="text-white">0 found</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Run Telemetry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </SpotlightCard>

                {/* Summarize Card */}
                <SpotlightCard className="flex flex-col justify-between min-h-[340px]">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Multi-Doc Summary</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Distill thousands of customer calls, research papers, and audit logs into concise decision briefs.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono space-y-1 text-neutral-300">
                    <div className="text-[10px] text-amber-400 uppercase">Vector Density</div>
                    <div>12 Documents → 1 Page Executive Brief</div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Ingest Sources</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </SpotlightCard>
              </motion.div>
            )}

            {/* TAB 3: PROJECTS */}
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {[
                  {
                    title: "Autonomous Logistics Router v4",
                    description: "Global routing engine orchestrating fleet microservices with live satellite telemetry.",
                    status: "Production Live",
                    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                    tokens: "1.4M / 2.0M tokens used",
                    members: 8,
                    updated: "3 minutes ago",
                  },
                  {
                    title: "Financial Sentiment & Arbitrage Scanner",
                    description: "High-frequency news vectorizer running continuous sentiment extraction across 80+ sources.",
                    status: "Training Sweep",
                    statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                    tokens: "840K / 1.0M tokens used",
                    members: 4,
                    updated: "14 minutes ago",
                  },
                  {
                    title: "Developer Documentation Knowledge Agent",
                    description: "Self-healing documentation hub reading pull requests and synchronizing API reference guides.",
                    status: "Synchronized",
                    statusColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
                    tokens: "310K / 500K tokens used",
                    members: 12,
                    updated: "1 hour ago",
                  },
                ].map((proj) => (
                  <div
                    key={proj.title}
                    className="p-5 sm:p-6 rounded-2xl bg-[#111113] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-semibold text-white">{proj.title}</h4>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${proj.statusColor}`}>
                          {proj.status}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
                        {proj.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 pt-1">
                        <span>{proj.tokens}</span>
                        <span>•</span>
                        <span>{proj.members} Collaborators</span>
                        <span>•</span>
                        <span>Updated {proj.updated}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-white transition-colors flex items-center gap-1.5"
                      >
                        <span>Open Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 4: WORKFLOWS */}
            {activeTab === "workflows" && (
              <motion.div
                key="workflows"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  {
                    name: "Automated PR Code Reviewer",
                    trigger: "GitHub Webhook: On Pull Request Opened",
                    action: "NOVA Code Reasoner scans security vulnerabilities, runs test suite, and comments inline diffs.",
                    output: "Linear Ticket updated + Slack alert sent",
                    active: true,
                  },
                  {
                    name: "Executive Morning Intelligence",
                    trigger: "Cron: Daily at 06:00 AM UTC",
                    action: "Scrapes RSS feeds, competitors' release notes, and earnings transcripts; synthesizes bulleted digest.",
                    output: "Delivered to Notion Team Hub & Email",
                    active: true,
                  },
                  {
                    name: "Customer Churn Preventer",
                    trigger: "Intercom Event: High-risk conversation flag",
                    action: "Evaluates account health, analyzes customer pain points, and drafts high-touch retention offer.",
                    output: "Draft forwarded to Account Director",
                    active: true,
                  },
                ].map((flow) => (
                  <SpotlightCard key={flow.name} className="flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                          Active Loop
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-white">{flow.name}</h4>

                      <div className="space-y-2 pt-1 text-xs">
                        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                          <span className="text-[10px] font-mono uppercase text-neutral-500 block">Trigger</span>
                          <span className="text-neutral-300 font-mono">{flow.trigger}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                          <span className="text-[10px] font-mono uppercase text-neutral-500 block">Action</span>
                          <span className="text-neutral-400">{flow.action}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                          <span className="text-[10px] font-mono uppercase text-neutral-500 block">Dispatch</span>
                          <span className="text-blue-400 font-mono">{flow.output}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
                      <span className="text-neutral-500 font-mono">Runs: 2,490/mo</span>
                      <button
                        type="button"
                        className="text-neutral-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                      >
                        <span>Configure</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </SpotlightCard>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
