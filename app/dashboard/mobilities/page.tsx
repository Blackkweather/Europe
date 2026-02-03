"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionContainer } from "@/components/ui/SectionContainer";
import type { Mobility } from "@/lib/mobilities-data";
import { PenLine, Trash2, Plus, ArrowLeft, Calendar } from "lucide-react";

export default function DashboardMobilitiesPage() {
  const [mobilities, setMobilities] = useState<Mobility[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/mobilities", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then(setMobilities)
      .catch(() => setMobilities([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this mobility? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/mobilities/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      setMobilities((prev) => prev.filter((m) => m.id !== id));
    } catch {
      alert("Failed to delete mobility.");
    } finally {
      setDeleting(null);
    }
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  }

  const statusLabel: Record<string, string> = {
    enquiry: "Enquiry",
    planned: "Planned",
    confirmed: "Confirmed",
    in_progress: "In progress",
    completed: "Completed",
  };
  const typeLabel: Record<string, string> = {
    student: "Student",
    staff: "Staff",
  };

  return (
    <>
      <PageHeader
        title="Mobilities"
        description="Manage mobility programmes"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Mobilities" }]}
        variant="default"
      />
      <section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
        <SectionContainer>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-white/70 hover:text-[var(--color-accent)] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none"
            >
              <ArrowLeft size={18} aria-hidden />
              Back to Dashboard
            </Link>
            <Link
              href="/dashboard/mobilities/new"
              className="btn-primary inline-flex items-center gap-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Plus size={18} aria-hidden />
              Add mobility
            </Link>
          </div>

          {loading ? (
            <p className="text-white/60">Loading mobilities…</p>
          ) : mobilities.length === 0 ? (
            <div className="border border-white/10 bg-white/5 p-12 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center border border-white/20 text-[var(--color-accent)] mb-4" aria-hidden>
                <Calendar size={28} />
              </span>
              <p className="text-white/90 mb-4">No mobilities yet.</p>
              <Link href="/dashboard/mobilities/new" className="btn-primary inline-flex items-center gap-2">
                <Plus size={18} aria-hidden />
                Add your first mobility
              </Link>
            </div>
          ) : (
            <ul className="space-y-4" role="list">
              {mobilities.map((mobility) => (
                <li
                  key={mobility.id}
                  className="border border-white/10 bg-white/5 p-6 flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <h2 className="font-heading text-headline font-semibold text-white tracking-[0.02em] truncate">
                      {mobility.title}
                    </h2>
                    <p className="text-sm text-white/60 mt-1">
                      {mobility.school}
                      {mobility.type && ` · ${typeLabel[mobility.type] ?? mobility.type}`}
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      {statusLabel[mobility.status] ?? mobility.status} · {formatDate(mobility.startDate)} – {formatDate(mobility.endDate)}
                      {mobility.studentIds?.length ? ` · ${mobility.studentIds.length} participant(s)` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/dashboard/mobilities/${encodeURIComponent(mobility.id)}/edit`}
                      className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors"
                    >
                      <PenLine size={16} aria-hidden />
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(mobility.id)}
                      disabled={deleting === mobility.id}
                      className="inline-flex items-center gap-2 border border-red-400/50 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50 transition-colors"
                      aria-label={`Delete ${mobility.title}`}
                    >
                      <Trash2 size={16} aria-hidden />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionContainer>
      </section>
    </>
  );
}
