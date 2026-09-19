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
  ArrowRight,
  Maximize2,
  Minimize2,
  HelpCircle,
  Command,
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
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "assistant",
    text: "Greetings! I am NOVA Copilot, your intelligent workspace and interface assistant. You can ask me to change the theme (Light or Dark mode), adjust display preferences, or explore the workspace.",
    timestamp: "Just now",
  },
];

const PROMPT_SUGGESTIONS = [
  { label: "☀️ Switch to Light Mode", query: "Please switch to light mode" },
  { label: "🌙 Switch to Dark Mode", query: "Switch to dark mode" },
  { label: "💻 Sync System Theme", query: "Set theme to match my system" },
  { label: "🧠 Best theme for focus?", query: "Which theme is best for late night deep work?" },
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Synthesize gentle futuristic audio feedback using Web Audio API
  const playChime = (type: "send" | "action" | "open") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "action") {
        // High futuristic two-tone chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
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
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // Natural language intent understanding & theme execution
  const processQuery = (rawQuery: string) => {
    const q = rawQuery.toLowerCase().trim();

    // Light mode intents
    const isLightMode =
      q.includes("light") ||
      q.includes("bright") ||
      q.includes("white") ||
      q.includes("turn on the light") ||
      q.includes("turn on light") ||
      q.includes("day mode") ||
      q.includes("daylight");

    // Dark mode intents
    const isDarkMode =
      q.includes("dark") ||
      q.includes("night") ||
      q.includes("black") ||
      q.includes("stealth") ||
      q.includes("turn off light") ||
      q.includes("lights off") ||
      q.includes("midnight");

    // System mode intents
    const isSystemMode =
      q.includes("system") ||
      q.includes("os default") ||
      q.includes("auto theme") ||
      q.includes("match my mac") ||
      q.includes("match my windows");

    // Toggle theme intent
    const isToggle = q.includes("toggle theme") || q.includes("switch theme") || q.includes("flip theme");

    if (isLightMode && !isDarkMode) {
      setTheme("light");
      playChime("action");
      return {
        text: "I've switched the workspace to Light Mode. The interface is now illuminated with clean porcelain backgrounds, crisp typography, and optimized daylight readability.",
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
        text: "Switched to Dark Mode. The interface has entered stealth obsidian configuration with reduced eye strain and luminous accents.",
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
        text: "Theme preference updated to follow your System OS settings. The workspace will automatically harmonize with your system's light/dark schedule.",
        actionExecuted: {
          type: "theme-change" as const,
          target: "system" as Theme,
          label: "System Synchronization Active",
        },
      };
    }

    if (isToggle) {
      const next: Theme = resolvedTheme === "dark" ? "light" : "dark";
      setTheme(next);
      playChime("action");
      return {
        text: `Toggled theme! Switched from ${resolvedTheme} mode to ${next} mode.`,
        actionExecuted: {
          type: "theme-change" as const,
          target: next,
          label: `${next === "dark" ? "Dark" : "Light"} Mode Activated`,
        },
      };
    }

    // Recommendation queries
    if (q.includes("best theme") || q.includes("which theme") || q.includes("focus") || q.includes("deep work")) {
      return {
        text: "For late-night deep work and coding sessions, Dark Mode minimizes blue-light glare and eye fatigue. For daytime documentation, editing, and reading high-density reports, Light Mode offers maximum typographic contrast. You can switch anytime by telling me!",
      };
    }

    // Workspace & Product questions
    if (q.includes("workspace") || q.includes("feature") || q.includes("nova") || q.includes("what can you do")) {
      return {
        text: "NOVA AI provides an intelligent unified workspace featuring autonomous AI workflows, live canvas editing, neural search, and multi-model collaboration. I can control your interface, answer questions, or optimize your workflow speed.",
      };
    }

    if (q.includes("pricing") || q.includes("cost") || q.includes("plan")) {
      return {
        text: "NOVA offers flexible plans starting from Starter (free for personal exploration), Pro ($39/mo with unlimited AI workflows), up to Enterprise with custom security and dedicated models. Scroll down to the Pricing section to compare!",
      };
    }

    // Generic fallback with helpful suggestion
    return {
      text: `Understood! I've noted: "${rawQuery}". As your interface assistant, I specialize in real-time controls. Try asking me: "Switch to light mode", "Go stealth dark mode", or "Sync with system theme".`,
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setHasInteracted(true);
    const userMsg: Message = {
      // ✅ Replace with this:
      id: typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `msg-${messages.length + 1}-${query.length}`,
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    playChime("send");

    setTimeout(() => {
      const result = processQuery(query);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: result.text,
        actionExecuted: result.actionExecuted,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "cleared-msg",
        sender: "assistant",
        text: "Chat memory refreshed. How can I assist you with your theme or workspace today?",
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
              {/* Outer pulsing atmospheric aura */}
              <div
                className={`absolute -inset-2 rounded-full opacity-60 blur-lg transition-all duration-500 group-hover:opacity-100 ${resolvedTheme === "dark"
                  ? "bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600"
                  : "bg-gradient-to-r from-blue-500 via-violet-500 to-amber-400"
                  } animate-pulse`}
              />

              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  playChime("open");
                }}
                aria-label="Open NOVA AI Assistant"
                className="relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-[#111113] text-white border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.45)] hover:border-white/40 transition-all duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {/* AI Orb Avatar */}
                <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center overflow-hidden shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-white animate-spin [animation-duration:8s]" />
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black" />
                </div>

                {/* Assistant Label */}
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  NOVA Copilot
                </span>

                {/* Keyboard Shortcut badge */}
                <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-white/10 text-neutral-300 border border-white/10">
                  <Command className="w-2.5 h-2.5" />J
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slide-out Assistant Modal / Drawer */}
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
              } flex flex-col rounded-3xl glass-panel shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden border border-white/15`}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#111113]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold tracking-tight text-white">
                      NOVA Assistant
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Core 3.5
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                    <span>Active Theme:</span>
                    <span className="capitalize font-semibold text-white">
                      {theme} ({resolvedTheme})
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  aria-label={soundEnabled ? "Mute assistant sounds" : "Enable assistant sounds"}
                  title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* Clear Chat */}
                <button
                  type="button"
                  onClick={clearChat}
                  aria-label="Clear chat history"
                  title="Clear chat"
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Expand / Minimize Toggle */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? "Collapse window" : "Expand window"}
                  title={isExpanded ? "Collapse" : "Expand"}
                  className="hidden sm:block p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close assistant"
                  className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Theme Switch Banner inside Drawer */}
            <div className="px-5 py-2.5 bg-white/[0.02] border-b border-white/[0.08] flex items-center justify-between gap-2 text-xs">
              <span className="text-neutral-400 font-medium">Quick Switch:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setTheme("light");
                    playChime("action");
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all text-[11px] font-medium ${theme === "light"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                >
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>Light</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTheme("dark");
                    playChime("action");
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all text-[11px] font-medium ${theme === "dark"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                >
                  <Moon className="w-3 h-3 text-blue-400" />
                  <span>Dark</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTheme("system");
                    playChime("action");
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all text-[11px] font-medium ${theme === "system"
                    ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                >
                  <Laptop className="w-3 h-3 text-violet-400" />
                  <span>Auto</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.sender === "user"
                      ? "bg-blue-600 text-white shadow-md rounded-br-none"
                      : "bg-white/[0.06] border border-white/10 text-neutral-200 rounded-bl-none shadow-sm"
                      }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* Action Executed Badge */}
                    {msg.actionExecuted && (
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <Sparkles className="w-2.5 h-2.5" />
                          {msg.actionExecuted.label}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="mt-1 text-[10px] text-neutral-500 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-neutral-400 text-xs px-2 py-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse [animation-delay:0.4s]" />
                  <span className="text-[11px] font-mono">Processing intent...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Suggestion Chips */}
            {!hasInteracted && (
              <div className="px-4 pb-2">
                <p className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 mb-1.5">
                  Suggested Actions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PROMPT_SUGGESTIONS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleSend(item.query)}
                      className="px-2.5 py-1 rounded-full text-[11px] bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 border border-white/10 hover:border-white/20 transition-colors"
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
              className="p-3 sm:p-4 border-t border-white/10 bg-white/[0.02]"
            >
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask NOVA (e.g. 'switch to light mode')..."
                  className="w-full rounded-2xl bg-white/[0.06] border border-white/15 px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 pr-12 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send query"
                  className="absolute right-2 p-2 rounded-xl bg-blue-600 text-white disabled:opacity-40 disabled:hover:bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
