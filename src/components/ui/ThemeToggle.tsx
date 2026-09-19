"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme, Theme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showDropdown?: boolean;
}

export default function ThemeToggle({ className = "", showDropdown = false }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme, isLoaded } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  // Close dropdown on outside click
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isLoaded) {
    return (
      <div
        className={`w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 ${className}`}
        aria-hidden="true"
      />
    );
  }

  if (showDropdown) {
    return (
      <div ref={containerRef} className={`relative inline-block ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={`Current theme: ${theme}. Click to change theme.`}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-neutral-300 hover:text-white"
        >
          <div className="relative w-4 h-4 flex items-center justify-center">
            {resolvedTheme === "dark" ? (
              <Moon className="w-3.5 h-3.5 text-blue-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-500" />
            )}
          </div>
          <span className="capitalize">{theme}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-36 rounded-2xl glass-panel p-1.5 shadow-2xl z-50 flex flex-col gap-0.5"
            >
              {(
                [
                  { value: "light", label: "Light", icon: Sun },
                  { value: "dark", label: "Dark", icon: Moon },
                  { value: "system", label: "System", icon: Laptop },
                ] as const
              ).map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setTheme(value as Theme);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${theme === value
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className={`relative w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-neutral-300 hover:text-white group ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ rotate: -45, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 45, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 45, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -45, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-amber-500 group-hover:text-amber-400 transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
