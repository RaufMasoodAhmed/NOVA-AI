"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Volume2,
  VolumeX,
  Trash2,
  Sun,
  Moon,
  Laptop,
  Maximize2,
  Minimize2,
  Command,
  Lock,
  UserPlus,
  LogIn,
} from "lucide-react";
import { useTheme, Theme } from "@/context/ThemeContext";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  actionExecuted?: {
    type: "theme-change";
    target: Theme;
    label: string;
  };
  timestamp: string;
  isLimitNotice?: boolean;
}

const DEMO_MESSAGE_LIMIT = 3;

const generateId = () => {
  if (typeof window !== "undefined" && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "assistant",
    text: "Greetings! I am NOVA Copilot, your intelligent workspace assistant. Feel free to test out 3 free demo queries—ask me about features, theme controls, or workflow tips!",
    timestamp: "Just now",
  },
];

const PROMPT_SUGGESTIONS = [
  { label: "☀️ Switch to Light Mode", query: "Please switch to light mode" },
  { label: "🌙 Switch to Dark Mode", query: "Switch to dark mode" },
  { label: "⚡ What can NOVA AI do?", query: "What are the key features of NOVA AI?" },
  { label: "💳 View Pricing Plans", query: "Tell me about NOVA pricing plans" },
];

export default function NovaAssistant() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Demo limit state tracking
  const [userQueryCount, setUserQueryCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDark = resolvedTheme === "dark";

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Keyboard shortcut: Cmd/Ctrl + J to toggle assistant
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Audio feedback
  const playChime = (type: "send" | "action" | "open" | "limit") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioContext =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof window.AudioContext })
          .webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "action") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === "open") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === "limit") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.2);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch {
      // Ignore audio restriction errors
    }
  };

  // Simulated AI query response processor
  const processQuery = (rawQuery: string) => {
    const q = rawQuery.toLowerCase().trim();

    const isLightMode =
      q.includes("light") ||
      q.includes("bright") ||
      q.includes("white") ||
      q.includes("day mode");

    const isDarkMode =
      q.includes("dark") ||
      q.includes("night") ||
      q.includes("black") ||
      q.includes("stealth");

    const isSystemMode =
      q.includes("system") || q.includes("auto theme") || q.includes("os default");

    if (isLightMode && !isDarkMode) {
      setTheme("light");
      playChime("action");
      return {
        text: "Switched workspace to Light Mode. High-contrast typography and clear porcelain backgrounds activated.",
        actionExecuted: {
          type: "theme-change" as const,
          target: "light" as Theme,
          label: "Light Mode Activated",
        },
      };
    }

    if (isDarkMode && !isLightMode) {
      setTheme("dark");
      playChime("action");
      return {
        text: "Switched workspace to Dark Mode. Obsidian dark mode activated for low eye strain.",
        actionExecuted: {
          type: "theme-change" as const,
          target: "dark" as Theme,
          label: "Dark Mode Activated",
        },
      };
    }

    if (isSystemMode) {
      setTheme("system");
      playChime("action");
      return {
        text: "Theme synchronized with your operating system settings.",
        actionExecuted: {
          type: "theme-change" as const,
          target: "system" as Theme,
          label: "System Sync Active",
        },
      };
    }

    if (q.includes("feature") || q.includes("what can you do") || q.includes("nova")) {
      return {
        text: "NOVA Copilot features AI chat support, theme control, real-time code assistance, workspace workflow automation, and multi-modal intelligence.",
      };
    }

    if (q.includes("pricing") || q.includes("cost") || q.includes("plan")) {
      return {
        text: "NOVA offers Free Starter tiers, Pro plans at $39/mo for unlimited AI workflows, and Enterprise solutions with custom LLM deployment.",
      };
    }

    if (q.includes("time")) {
      return {
        text: `The current time is ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
      };
    }

    return {
      text: `Thanks for asking about "${rawQuery}". NOVA Copilot can assist with workspace automation, code debugging, and adaptive UI controls!`,
    };
  };

  const handleSend = async (textToSend?: string) => {
    if (isLimitReached) return;

    const query = textToSend || input;
    if (!query.trim()) return;

    const nextCount = userQueryCount + 1;
    setUserQueryCount(nextCount);
    setHasInteracted(true);

    const userMsg: Message = {
      id: generateId(),
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    playChime("send");

    // Simulated response delay (no external API needed)
    setTimeout(() => {
      const result = processQuery(query);
      id: typeof window !== "undefined" && window.crypto?.randomUUID
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        setMessages((prev) => {
          const updated: Message[] = [
            ...prev,
            {
              id: generateId(), // ✅ Fixed unused expression & impure call
              sender: "assistant",
              text: result.text,
              actionExecuted: result.actionExecuted,
              timestamp: "Just now",
            },
          ];
          // Enforce demo query limit
          if (nextCount >= DEMO_MESSAGE_LIMIT) {
            setIsLimitReached(true);
            playChime("limit");
            updated.push({
              id: "limit-reached-notice",
              sender: "assistant",
              text: "🔒 Free Demo Limit Reached! You have used all 3 demo queries. Please log in to continue.",
              timestamp: "Just now",
              isLimitNotice: true,
            });
          }

          return updated;
        });

      setIsTyping(false);
      if (!result.actionExecuted) {
        playChime("action");
      }
    }, 800);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "cleared-msg",
        sender: "assistant",
        text: "Chat history cleared. You can continue testing demo queries.",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative group"
            >
              <div
                className={`absolute -inset-2 rounded-full opacity-60 blur-lg transition-all duration-500 group-hover:opacity-100 ${isDark
                  ? "bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600"
                  : "bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400"
                  } animate-pulse`}
              />

              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  playChime("open");
                }}
                aria-label="Open NOVA AI Assistant"
                className={`relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isDark
                  ? "bg-[#0f0f12] text-white border border-white/20 hover:border-white/40"
                  : "bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-400"
                  }`}
              >
                <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center overflow-hidden shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-white animate-spin [animation-duration:8s]" />
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black" />
                </div>

                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  NOVA Copilot
                </span>

                <span
                  className={`hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${isDark
                    ? "bg-white/10 text-neutral-300 border-white/10"
                    : "bg-neutral-100 text-neutral-600 border-neutral-200"
                    }`}
                >
                  <Command className="w-2.5 h-2.5" />J
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide-out Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-50 transition-all duration-300 ${isExpanded
              ? "inset-4 sm:inset-10 md:inset-x-auto md:right-8 md:top-12 md:bottom-8 md:w-[680px]"
              : "bottom-5 right-5 sm:bottom-6 sm:right-6 w-[calc(100vw-40px)] sm:w-[420px] max-h-[82vh] sm:max-h-[640px] h-[580px]"
              } flex flex-col rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.45)] overflow-hidden border ${isDark
                ? "bg-[#0b0b0e] text-neutral-100 border-white/15"
                : "bg-white text-neutral-900 border-neutral-200"
              }`}
          >
            {/* Header */}
            <div
              className={`px-5 py-4 border-b flex items-center justify-between ${isDark
                ? "bg-[#121216] border-white/10"
                : "bg-neutral-50 border-neutral-200"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#0b0b0e]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm font-bold tracking-tight ${isDark ? "text-white" : "text-neutral-900"
                        }`}
                    >
                      NOVA Assistant
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-blue-500/20 text-blue-500 font-semibold border border-blue-500/30">
                      Demo Mode
                    </span>
                  </div>
                  <p
                    className={`text-[11px] flex items-center gap-1.5 ${isDark ? "text-neutral-400" : "text-neutral-500"
                      }`}
                  >
                    <span>Free Queries:</span>
                    <span
                      className={`font-semibold ${isLimitReached
                        ? "text-rose-500"
                        : isDark
                          ? "text-emerald-400"
                          : "text-emerald-600"
                        }`}
                    >
                      {userQueryCount} / {DEMO_MESSAGE_LIMIT} used
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  aria-label="Toggle sound"
                  className={`p-2 rounded-lg transition-colors ${isDark
                    ? "text-neutral-400 hover:text-white hover:bg-white/10"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200"
                    }`}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={clearChat}
                  aria-label="Clear chat"
                  className={`p-2 rounded-lg transition-colors ${isDark
                    ? "text-neutral-400 hover:text-white hover:bg-white/10"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200"
                    }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label="Toggle size"
                  className={`hidden sm:block p-2 rounded-lg transition-colors ${isDark
                    ? "text-neutral-400 hover:text-white hover:bg-white/10"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200"
                    }`}
                >
                  {isExpanded ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close assistant"
                  className={`p-2 rounded-lg transition-colors ${isDark
                    ? "text-neutral-400 hover:text-white hover:bg-white/10"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200"
                    }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Theme Switch Banner */}
            <div
              className={`px-5 py-2.5 border-b flex items-center justify-between gap-2 text-xs ${isDark
                ? "bg-[#14141a] border-white/10"
                : "bg-neutral-100/80 border-neutral-200"
                }`}
            >
              <span
                className={`font-medium ${isDark ? "text-neutral-400" : "text-neutral-600"
                  }`}
              >
                Quick Switch:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setTheme("light");
                    playChime("action");
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all text-[11px] font-medium ${theme === "light"
                    ? "bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40"
                    : isDark
                      ? "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
                    }`}
                >
                  <Sun className="w-3 h-3 text-amber-500" />
                  <span>Light</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTheme("dark");
                    playChime("action");
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all text-[11px] font-medium ${theme === "dark"
                    ? "bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/40"
                    : isDark
                      ? "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
                    }`}
                >
                  <Moon className="w-3 h-3 text-blue-500" />
                  <span>Dark</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTheme("system");
                    playChime("action");
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all text-[11px] font-medium ${theme === "system"
                    ? "bg-violet-500/20 text-violet-600 dark:text-violet-300 border border-violet-500/40"
                    : isDark
                      ? "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
                    }`}
                >
                  <Laptop className="w-3 h-3 text-violet-500" />
                  <span>Auto</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div
              className={`flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm ${isDark ? "bg-[#0b0b0e]" : "bg-white"
                }`}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-wrap ${msg.isLimitNotice
                      ? "bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-200"
                      : msg.sender === "user"
                        ? "bg-blue-600 text-white shadow-md rounded-br-none"
                        : isDark
                          ? "bg-[#18181d] border border-white/10 text-neutral-200 rounded-bl-none shadow-sm"
                          : "bg-neutral-100 border border-neutral-200 text-neutral-900 rounded-bl-none shadow-sm"
                      }`}
                  >
                    <p>{msg.text}</p>

                    {msg.actionExecuted && (
                      <div className="mt-2.5 pt-2 border-t border-black/10 dark:border-white/10 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          <Sparkles className="w-2.5 h-2.5" />
                          {msg.actionExecuted.label}
                        </span>
                      </div>
                    )}

                    {/* Limit CTA Buttons inside notice message */}
                    {msg.isLimitNotice && (
                      <div className="mt-3 pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={() => alert("Redirecting to login modal...")}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 transition-all"
                        >
                          <LogIn className="w-3.5 h-3.5" />
                          <span>Log In Now</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => alert("Redirecting to registration...")}
                          className="px-3.5 py-2 rounded-xl bg-white/10 dark:bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center justify-center gap-1.5 border border-amber-500/30 transition-all"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Create Free Account</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <span
                    className={`mt-1 text-[10px] px-1 ${isDark ? "text-neutral-500" : "text-neutral-400"
                      }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-neutral-400 text-xs px-2 py-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse [animation-delay:0.4s]" />
                  <span className="text-[11px] font-mono">
                    Generating response...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Suggestion Chips */}
            {!hasInteracted && !isLimitReached && (
              <div
                className={`px-4 pb-2 ${isDark ? "bg-[#0b0b0e]" : "bg-white"}`}
              >
                <p
                  className={`text-[10px] uppercase font-mono tracking-wider mb-1.5 ${isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                >
                  Suggested Queries ({DEMO_MESSAGE_LIMIT - userQueryCount} left)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PROMPT_SUGGESTIONS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleSend(item.query)}
                      className={`px-2.5 py-1 rounded-full text-[11px] border transition-colors ${isDark
                        ? "bg-white/[0.05] hover:bg-white/10 text-neutral-300 border-white/10 hover:border-white/20"
                        : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-300 hover:border-neutral-400"
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className={`p-3 sm:p-4 border-t ${isDark
                ? "bg-[#121216] border-white/10"
                : "bg-neutral-50 border-neutral-200"
                }`}
            >
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  disabled={isLimitReached}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isLimitReached
                      ? "Demo limit reached. Please log in to continue."
                      : "Ask NOVA (e.g. 'what can you do?')..."
                  }
                  className={`w-full rounded-2xl border px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 pr-12 transition-all ${isLimitReached
                    ? "bg-neutral-200/50 dark:bg-neutral-800/50 border-neutral-300 dark:border-neutral-700 text-neutral-500 cursor-not-allowed"
                    : isDark
                      ? "bg-[#1c1c22] border-white/15 text-white placeholder-neutral-400"
                      : "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500 shadow-sm"
                    }`}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLimitReached}
                  aria-label="Send query"
                  className="absolute right-2 p-2 rounded-xl bg-blue-600 text-white disabled:opacity-40 disabled:hover:bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  {isLimitReached ? (
                    <Lock className="w-3.5 h-3.5" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}