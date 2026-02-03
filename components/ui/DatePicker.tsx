"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";
import { Calendar } from "lucide-react";

function formatDateForInput(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDate(value: string): Date | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(value + "T12:00:00");
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function formatDisplay(value: string, locale = "en-GB"): string {
  const date = parseDate(value);
  if (!date) return "";
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export type DatePickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

const triggerClass =
  "w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px] flex items-center justify-between gap-2 text-left";

export function DatePicker({
  id,
  value,
  onChange,
  placeholder = "Select date",
  required,
  disabled,
  className,
  "aria-label": ariaLabel,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = parseDate(value);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-required={required}
        onClick={() => setOpen((o) => !o)}
        className={`${triggerClass} ${className ?? ""}`}
      >
        <span className={value ? "text-white" : "text-white/50"}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <Calendar size={20} className="shrink-0 text-white/50" aria-hidden />
      </button>
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 border border-white/20 bg-[var(--color-bg-soft)] p-4 shadow-lg"
          role="dialog"
          aria-modal="true"
          aria-label="Choose date"
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                onChange(formatDateForInput(date));
                setOpen(false);
              }
            }}
            defaultMonth={selected ?? new Date()}
            locale={typeof navigator !== "undefined" ? navigator.language : "en-GB"}
            className="rdp-theme-dashboard"
          />
        </div>
      )}
    </div>
  );
}
