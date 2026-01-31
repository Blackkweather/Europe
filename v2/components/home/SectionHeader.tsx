"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("mb-16", className)}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px w-12 bg-white/40" />
        <div className="text-xs uppercase tracking-widest text-white/80">
          {label}
        </div>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
        {title}
        {subtitle != null && (
          <>
            <br />
            <span className="text-white/70">{subtitle}</span>
          </>
        )}
      </h2>
    </motion.div>
  );
}
