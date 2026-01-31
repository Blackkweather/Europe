"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../lib/constants";
import { motion, useReducedMotion } from "framer-motion";

export function WhatsAppFab() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 transition-[filter] duration-200 hover:brightness-105 active:brightness-95"
      aria-label="Chat on WhatsApp"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <MessageCircle size={28} aria-hidden="true" />
    </motion.a>
  );
}
