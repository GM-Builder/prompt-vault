import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("glass-panel rounded-xl overflow-hidden p-6 relative", className)}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyber-cyan)] to-transparent opacity-50" />
      {children}
    </div>
  );
}
