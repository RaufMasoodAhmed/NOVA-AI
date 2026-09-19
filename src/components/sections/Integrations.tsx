"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import {
  HardDrive,
  MessageSquare,
  ArrowUpRight,
  Zap,
} from "lucide-react";

// Linear SVG icon component
function LinearIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M3.24 3.24a3 3 0 0 1 4.24 0l13.28 13.28a3 3 0 0 1-4.24 4.24L3.24 7.48a3 3 0 0 1 0-4.24Z" />
      <path d="m14.9 3.24 5.86 5.86a3 3 0 0 1 0 4.24L10.3 23.8a3 3 0 0 1-4.24 0L3.24 20.98a3 3 0 0 1 0-4.24L13.7 6.28a3 3 0 0 1 1.2-3.04Z" />
    </svg>
  );
}

// Notion SVG icon
function NotionIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.458-.84c1.12-.094 1.306-.514.84-1.12L17.728 1.13C17.261.57 16.515.243 15.395.336L3.937 1.176c-.933.093-1.306.606-.84 1.213zm.84 4.571v13.527c0 .933.56 1.306 1.493 1.213l13.527-.933c.933-.093 1.12-.746 1.12-1.68V7.381c0-.933-.373-1.4-1.307-1.307l-13.527.933c-.84.094-1.306.747-1.306 1.774zm11.755 1.586c.094.466 0 .933-.466.98l-.747.14c-.466.093-.606.326-.606.746v8.49c0 .793-.373 1.166-1.166 1.213l-1.913.093c-.653 0-.84-.28-.933-.746l-3.36-5.32v4.807c0 .653-.28.933-.84.98l-.793.046c-.466.047-.653-.233-.653-.746V9.992c0-.56.28-.84.84-.886l2.1-.14c.793-.047 1.073.187 1.306.7l3.033 4.807v-4.2c0-.56.28-.84.84-.887l1.96-.14c.466 0 .746.28.793.607z" />
    </svg>
  );
}

// GitHub SVG icon
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// Figma SVG icon
function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4h4V2H8ZM12 10a4 4 0 0 0 4-4 4 4 0 0 0-4-4v8ZM4 10a4 4 0 0 0 4 4h4v-8H8a4 4 0 0 0-4 4ZM12 14v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4h4ZM16 10a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4Z" />
    </svg>
  );
}

const INTEGRATIONS = [
  {
    name: "Google Drive",
    icon: HardDrive,
    description: "Real-time bidirectional document vectorization across Google Docs, Sheets, and shared enterprise drives.",
    protocol: "Drive API v3 • Live Webhook",
    latency: "Under 120ms",
  },
  {
    name: "Notion",
    icon: NotionIcon,
    description: "Index workspaces, databases, and company wikis into an automated high-recall memory graph.",
    protocol: "Notion Enterprise Sync",
    latency: "Realtime Continuous",
  },
  {
    name: "Slack",
    icon: MessageSquare,
    description: "Autonomous assistant dispatch in team channels with thread memory, command mentions, and action links.",
    protocol: "Slack Bolt Engine",
    latency: "Instant Socket",
  },
  {
    name: "GitHub",
    icon: GitHubIcon,
    description: "Deep codebase AST comprehension, automatic PR review comments, security audits, and issue generation.",
    protocol: "GitHub App • Webhook v4",
    latency: "Per-commit Sentinel",
  },
  {
    name: "Figma",
    icon: FigmaIcon,
    description: "Translate visual design systems, component tokens, and artboards into production-ready frontend code.",
    protocol: "Figma REST & Plugins",
    latency: "Vector Streamed",
  },
  {
    name: "Linear",
    icon: LinearIcon,
    description: "Convert customer feedback and system alerts into prioritized backlog tickets with auto-assigned engineers.",
    protocol: "GraphQL Realtime",
    latency: "Bi-directional Sync",
  },
];

export default function Integrations() {
  return (
    <section id="integrations" className="relative py-24 sm:py-32 bg-[#050505] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="ECOSYSTEM COMPATIBILITY"
          title="Works with the tools you already use."
          description="Seamlessly bridge your existing tech stack into NOVA's multi-agent runtime with zero reconfiguration required."
          align="center"
        />

        {/* 6 Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {INTEGRATIONS.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.08 * idx }}
              >
                <SpotlightCard className="flex flex-col justify-between h-full p-6 sm:p-7 group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-neutral-400 group-hover:text-emerald-400 transition-colors">
                        Verified Connection
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white tracking-tight flex items-center justify-between">
                        <span>{tool.name}</span>
                        <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>{tool.protocol}</span>
                    <span className="text-neutral-400">{tool.latency}</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* Security and Custom Webhook Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl bg-[#0B0B0D] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Need a proprietary or on-premise integration?</div>
              <div className="text-xs text-neutral-400">NOVA supports custom OpenAPI 3.1 endpoints, webhooks, and private VPC agent peering.</div>
            </div>
          </div>
          <a
            href="#pricing"
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-white transition-colors shrink-0"
          >
            Explore API Docs →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
