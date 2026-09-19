"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function MagneticButton({
  children,
  onClick,
  href,
  className = "",
  variant = "primary",
  size = "md",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    // Subtle magnetic strength
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 cursor-pointer select-none rounded-full";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-white text-black hover:bg-neutral-200 shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-95",
    secondary:
      "bg-[#161619] text-white border border-white/10 hover:border-white/20 hover:bg-[#1f1f23] active:scale-95",
    outline:
      "bg-transparent text-neutral-200 border border-white/15 hover:border-white/30 hover:bg-white/[0.04] active:scale-95",
    ghost:
      "bg-transparent text-neutral-400 hover:text-white hover:bg-white/[0.04] active:scale-95",
  };

  const Component = href ? motion.a : motion.button;
  const linkProps = href ? { href } : { onClick };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.5 }}
      className="inline-block"
    >
      <Component
        {...linkProps}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  );
}
