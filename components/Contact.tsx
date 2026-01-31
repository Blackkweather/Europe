"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";
import {
  phoneDisplay,
  phoneHref,
  email,
  whatsappUrl,
} from "../lib/constants";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type ContactProps = { showHeading?: boolean };

export function Contact({ showHeading = true }: ContactProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise((r) => setTimeout(r, 500));
    reset();
  };

  const reducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="py-section sm:py-section-lg bg-[var(--color-primary-dark)]"
      aria-labelledby={showHeading ? "contact-heading" : undefined}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <motion.h2
            id="contact-heading"
            className="font-heading text-display font-semibold text-white mb-16 text-center tracking-[0.02em] leading-tight"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            Contact Us
          </motion.h2>
        )}

        <motion.div
          className="max-w-4xl mx-auto grid gap-12 lg:grid-cols-2"
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="border border-white/10 bg-white/5 p-10">
            <h3 className="sr-only">Contact information</h3>
            <ul className="space-y-5" role="list">
              <li>
                <a
                  href={phoneHref}
                  className="flex items-center gap-4 min-h-[56px] text-white/90 hover:text-[var(--color-accent)] hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white p-3 -m-3 transition-colors duration-200"
                  aria-label={`Call us: ${phoneDisplay}`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/20 text-[var(--color-accent)]" aria-hidden="true">
                    <Phone size={24} />
                  </span>
                  <span className="text-body-lg font-medium">{phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 min-h-[56px] text-white/90 hover:text-[var(--color-accent)] hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white p-3 -m-3 transition-colors duration-200"
                  aria-label={`Email us: ${email}`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/20 text-[var(--color-accent)]" aria-hidden="true">
                    <Mail size={24} />
                  </span>
                  <span className="text-body-lg font-medium break-all">{email}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 min-h-[56px] text-white/90 hover:text-[var(--color-accent)] hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white p-3 -m-3 transition-colors duration-200"
                  aria-label="Chat on WhatsApp"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/20 text-[var(--color-accent)]" aria-hidden="true">
                    <MessageCircle size={24} />
                  </span>
                  <span className="text-body-lg font-medium">Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          <motion.div
            className="border border-white/10 bg-white/5 p-10"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
              aria-label="Contact form"
            >
              {[
                { id: "contact-name", label: "Name", type: "text", reg: "name", err: errors.name, auto: "name" },
                { id: "contact-email", label: "Email", type: "email", reg: "email", err: errors.email, auto: "email" },
              ].map(({ id, label, type, reg, err, auto }, i) => (
                <motion.div
                  key={id}
                  initial={reducedMotion ? false : { opacity: 0, x: -4 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                >
                  <label htmlFor={id} className="block text-sm font-medium text-white/80 mb-2">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    {...register(reg as "name" | "email")}
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none transition-colors duration-200 min-h-[48px]"
                    autoComplete={auto}
                    aria-invalid={!!err}
                    aria-describedby={err ? `${id}-error` : undefined}
                  />
                  {err && (
                    <p id={`${id}-error`} className="mt-1.5 text-sm text-[var(--color-accent)]" role="alert">
                      {err.message}
                    </p>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <label htmlFor="contact-message" className="block text-sm font-medium text-white/80 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  {...register("message")}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none transition-colors duration-200 resize-y min-h-[120px]"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-sm text-[var(--color-accent)]" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </motion.div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--color-primary)] px-4 py-3 min-h-[48px] font-semibold text-white transition-[filter] duration-200 hover:brightness-105 active:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)] disabled:opacity-60"
                initial={reducedMotion ? false : { opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                {isSubmitting ? "Sending…" : "Send"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
