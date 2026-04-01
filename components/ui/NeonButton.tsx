"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "cyan" | "pink" | "purple";
}

export function NeonButton({ children, variant = "cyan", className, ...props }: NeonButtonProps) {
  const colorClasses = {
    cyan: "border-[var(--color-cyber-cyan)] text-[var(--color-cyber-cyan)] hover:bg-[var(--color-cyber-cyan)] hover:text-[var(--color-deep-navy)] shadow-[0_0_10px_var(--color-cyan-glow)] hover:shadow-[0_0_20px_var(--color-cyber-cyan)]",
    pink: "border-[var(--color-neon-pink)] text-[var(--color-neon-pink)] hover:bg-[var(--color-neon-pink)] hover:text-white shadow-[0_0_10px_rgba(255,0,255,0.4)] hover:shadow-[0_0_20px_var(--color-neon-pink)]",
    purple: "border-[var(--color-neon-purple)] text-[var(--color-neon-purple)] hover:bg-[var(--color-neon-purple)] hover:text-white shadow-[0_0_10px_rgba(157,0,255,0.4)] hover:shadow-[0_0_20px_var(--color-neon-purple)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-6 py-3 font-mono font-bold uppercase tracking-wider transition-all duration-300 border-2 rounded-sm",
        colorClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
