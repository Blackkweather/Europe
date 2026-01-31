"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { phoneDisplay, phoneHref, email } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(1, "Message is required"),
});

type FormValues = z.infer<typeof schema>;

function FloatingInput({
  id,
  label,
  error,
  value,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  value?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const hasValue = typeof value === "string" && value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        className="peer w-full border-0 border-b-2 border-white/30 bg-transparent pt-6 pb-3 pr-4 text-white placeholder:text-transparent focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 transition-colors"
        placeholder={label}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-0 top-0 origin-top-left text-white/60 transition-all duration-200 pointer-events-none ${
          focused || hasValue ? "top-0 -translate-y-1 scale-75 text-white/90" : "top-6 scale-100"
        }`}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1.5 text-sm text-amber-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  error,
  value,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  value?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  const hasValue = typeof value === "string" && value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        className="peer w-full border-0 border-b-2 border-white/30 bg-transparent pt-6 pb-3 pr-4 text-white placeholder:text-transparent focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 transition-colors resize-none min-h-[120px]"
        placeholder={label}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-0 top-0 origin-top-left text-white/60 transition-all duration-200 pointer-events-none ${
          focused || hasValue ? "top-0 -translate-y-1 scale-75 text-white/90" : "top-6 scale-100"
        }`}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1.5 text-sm text-amber-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactFloatingFormSection() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const watched = { name: watch("name"), email: watch("email"), message: watch("message") };

  const onSubmit = async (data: FormValues) => {
    clearErrors("root");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError("root", { type: "server", message: json.error ?? "Something went wrong. Please try again or email us." });
      return;
    }
    reset();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section
      id="contact"
      className="relative py-32 md:py-40 overflow-hidden bg-[#0a1628]"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60 block mb-4">
              Contact
            </span>
            <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-8">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg text-white/80 mb-12 max-w-md">
              Ready to start your mobility in Málaga? We&apos;ll support you from the first enquiry to the final evaluation.
            </p>
            <ul className="space-y-6 text-white/80">
              <li>
                <a
                  href={phoneHref}
                  className="flex items-center gap-4 hover:text-[var(--color-accent)] transition-colors"
                  aria-label={`Call: ${phoneDisplay}`}
                >
                  <Phone className="h-5 w-5 text-white/60" />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 hover:text-[var(--color-accent)] transition-colors break-all"
                  aria-label={`Email: ${email}`}
                >
                  <Mail className="h-5 w-5 text-white/60 shrink-0" />
                  {email}
                </a>
              </li>
            </ul>
          </div>

          <div className="border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8 md:p-10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-8">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {sent && (
                <p className="text-sm text-white/90 bg-white/10 border border-white/20 px-4 py-3" role="status">
                  Message sent. We&apos;ll get back to you soon.
                </p>
              )}
              {errors.root && (
                <p className="text-sm text-amber-400 bg-amber-400/10 border border-amber-400/30 px-4 py-3" role="alert">
                  {errors.root.message}
                </p>
              )}
              <FloatingInput
                id="v3-contact-name"
                label="Name"
                value={watched.name}
                {...register("name")}
                error={errors.name?.message}
              />
              <FloatingInput
                id="v3-contact-email"
                label="Email"
                type="email"
                value={watched.email}
                {...register("email")}
                error={errors.email?.message}
              />
              <FloatingTextarea
                id="v3-contact-message"
                label="Message"
                rows={4}
                value={watched.message}
                {...register("message")}
                error={errors.message?.message}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full border-2 border-[var(--color-accent)] bg-[var(--color-accent)] py-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-primary-dark)] hover:bg-[var(--color-accent)]/90 disabled:opacity-60 transition-colors"
              >
                {isSubmitting ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
