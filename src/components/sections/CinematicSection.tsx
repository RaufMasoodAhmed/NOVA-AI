"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CinematicSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };

    window.addEventListener("resize", handleResize);

    // Particle nodes representing synthetic synapses
    const particleCount = Math.min(Math.floor(width / 22), 65);
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.5 + 0.2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background deep gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        width * 0.7
      );
      bgGrad.addColorStop(0, "rgba(20, 24, 38, 0.45)");
      bgGrad.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Update positions
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.strokeStyle = `rgba(130, 160, 240, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle dot with soft glow
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 235, 255, ${p1.baseAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative py-32 sm:py-44 lg:py-52 overflow-hidden bg-[#050505] border-y border-white/[0.08]">
      {/* Interactive Synthetic Synapse Canvas */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Atmospheric Aurora Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/60 to-[#050505] z-1"
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Sleek pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md mb-6 text-xs font-mono uppercase tracking-[0.25em] text-neutral-300 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>SYNTHETIC INTELLIGENCE AT SCALE</span>
        </motion.div>

        {/* Large cinematic headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]"
        >
          The future of work is{" "}
          <span className="text-gradient-silver block sm:inline">
            intelligent.
          </span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl font-light text-neutral-300 max-w-3xl leading-relaxed"
        >
          NOVA turns ideas into action.
        </motion.p>

        {/* Cinematic micro points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <MagneticButton size="lg" variant="primary" href="#workspace">
            <span>Deploy Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton size="lg" variant="outline" href="#pricing">
            <span>View Enterprise Plans</span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
