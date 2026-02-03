"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { DatePicker } from "@/components/ui/DatePicker";
import { ArrowLeft, Users } from "lucide-react";
import type { Mobility, MobilityStatus, MobilityType, KeyActionSubtype } from "@/lib/mobilities-data";
import type { Student } from "@/lib/students-data";

const STATUSES: { value: MobilityStatus; label: string }[] = [
  { value: "enquiry", label: "Enquiry" },
  { value: "planned", label: "Planned" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in_progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];
const TYPES: { value: MobilityType; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "staff", label: "Staff" },
];
const KEY_ACTION_SUBTYPES: { value: KeyActionSubtype; label: string }[] = [
  { value: "mobility_studies", label: "Mobility for studies" },
  { value: "traineeship", label: "Traineeship" },
  { value: "staff_teaching", label: "Staff teaching" },
  { value: "staff_training", label: "Staff training" },
];

export default function DashboardMobilitiesEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [mobility, setMobility] = useState<Mobility | null>(null);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "",
    school: "",
    type: "student" as MobilityType,
    startDate: "",
    endDate: "",
    status: "enquiry" as MobilityStatus,
    country: "",
    programme: "",
    coordinatorName: "",
    coordinatorEmail: "",
    accommodation: "",
    fundingCode: "",
    hostInstitution: "",
    projectReference: "",
    keyActionSubtype: "" as KeyActionSubtype | "",
    agreementStartDate: "",
    agreementEndDate: "",
    plannedParticipantCount: "",
    contactAtHostName: "",
    contactAtHostEmail: "",
    countryOfSendingInstitution: "",
    notes: "",
  });

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    Promise.all([
      fetch(`/api/mobilities/${encodeURIComponent(id)}`, { credentials: "include" }).then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json() as Promise<Mobility>;
      }),
      fetch("/api/students", { credentials: "include" })
        .then((res) => (res.ok ? res.json() : []))
        .then((list: Student[]) => list)
        .catch(() => []),
    ])
      .then(([m, students]) => {
        setMobility(m);
        setAllStudents(Array.isArray(students) ? students : []);
        setSelectedStudentIds(m.studentIds ?? []);
        setForm({
          title: m.title,
          school: m.school,
          type: m.type,
          startDate: m.startDate ?? "",
          endDate: m.endDate ?? "",
          status: m.status,
          country: m.country ?? "",
          programme: m.programme ?? "",
          coordinatorName: m.coordinatorName ?? "",
          coordinatorEmail: m.coordinatorEmail ?? "",
          accommodation: m.accommodation ?? "",
          fundingCode: m.fundingCode ?? "",
          hostInstitution: m.hostInstitution ?? "",
          projectReference: m.projectReference ?? "",
          keyActionSubtype: (m.keyActionSubtype ?? "") as KeyActionSubtype | "",
          agreementStartDate: m.agreementStartDate ?? "",
          agreementEndDate: m.agreementEndDate ?? "",
          plannedParticipantCount: m.plannedParticipantCount != null ? String(m.plannedParticipantCount) : "",
          contactAtHostName: m.contactAtHostName ?? "",
          contactAtHostEmail: m.contactAtHostEmail ?? "",
          countryOfSendingInstitution: m.countryOfSendingInstitution ?? "",
          notes: m.notes ?? "",
        });
      })
      .catch(() => setMobility(null))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/mobilities/${encodeURIComponent(id)}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          school: form.school.trim(),
          type: form.type,
          startDate: form.startDate.trim(),
          endDate: form.endDate.trim(),
          status: form.status,
          studentIds: selectedStudentIds,
          country: form.country.trim() || undefined,
          programme: form.programme.trim() || undefined,
          coordinatorName: form.coordinatorName.trim() || undefined,
          coordinatorEmail: form.coordinatorEmail.trim() || undefined,
          accommodation: form.accommodation.trim() || undefined,
          fundingCode: form.fundingCode.trim() || undefined,
          hostInstitution: form.hostInstitution.trim() || undefined,
          projectReference: form.projectReference.trim() || undefined,
          keyActionSubtype: form.keyActionSubtype || undefined,
          agreementStartDate: form.agreementStartDate.trim() || undefined,
          agreementEndDate: form.agreementEndDate.trim() || undefined,
          plannedParticipantCount: form.plannedParticipantCount ? parseInt(form.plannedParticipantCount, 10) : undefined,
          contactAtHostName: form.contactAtHostName.trim() || undefined,
          contactAtHostEmail: form.contactAtHostEmail.trim() || undefined,
          countryOfSendingInstitution: form.countryOfSendingInstitution.trim() || undefined,
          notes: form.notes.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Failed to update mobility");
      router.push("/dashboard/mobilities");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <>
        <PageHeader title="Edit mobility" breadcrumbs={[{ label: "Dashboard" }, { label: "Mobilities" }, { label: "Edit" }]} variant="default" />
        <section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
          <SectionContainer>
            <p className="text-white/60">Loading…</p>
          </SectionContainer>
        </section>
      </>
    );
  }

  if (!mobility) {
    return (
      <>
        <PageHeader title="Mobility not found" breadcrumbs={[{ label: "Dashboard" }, { label: "Mobilities" }]} variant="default" />
        <section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
          <SectionContainer>
            <p className="text-white/90 mb-4">Mobility not found.</p>
            <Link href="/dashboard/mobilities" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={18} aria-hidden />
              Back to Mobilities
            </Link>
          </SectionContainer>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Edit mobility"
        description={mobility.title}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Mobilities", href: "/dashboard/mobilities" },
          { label: "Edit" },
        ]}
        variant="default"
      />
      <section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
        <SectionContainer>
          <Link
            href="/dashboard/mobilities"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[var(--color-accent)] font-medium mb-8 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none"
          >
            <ArrowLeft size={18} aria-hidden />
            Back to Mobilities
          </Link>
          <div className="border border-white/10 bg-white/5 p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              {error && (
                <p className="text-sm text-[var(--color-accent)] bg-white/5 border border-white/20 px-4 py-3" role="alert">
                  {error}
                </p>
              )}
              <div>
                <label htmlFor="mobility-title" className="block text-sm font-medium text-white/80 mb-2">
                  Title *
                </label>
                <input
                  id="mobility-title"
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label htmlFor="mobility-school" className="block text-sm font-medium text-white/80 mb-2">
                  Sending institution *
                </label>
                <input
                  id="mobility-school"
                  type="text"
                  required
                  value={form.school}
                  onChange={(e) => setForm((f) => ({ ...f, school: e.target.value }))}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                  placeholder="Home university / school name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="mobility-type" className="block text-sm font-medium text-white/80 mb-2">
                    Type
                  </label>
                  <select
                    id="mobility-type"
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as MobilityType }))}
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                  >
                    {TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="mobility-status" className="block text-sm font-medium text-white/80 mb-2">
                    Status
                  </label>
                  <select
                    id="mobility-status"
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as MobilityStatus }))}
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="mobility-start" className="block text-sm font-medium text-white/80 mb-2">
                    Start date *
                  </label>
                  <DatePicker
                    id="mobility-start"
                    value={form.startDate}
                    onChange={(v) => setForm((f) => ({ ...f, startDate: v }))}
                    placeholder="Select start date"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mobility-end" className="block text-sm font-medium text-white/80 mb-2">
                    End date *
                  </label>
                  <DatePicker
                    id="mobility-end"
                    value={form.endDate}
                    onChange={(v) => setForm((f) => ({ ...f, endDate: v }))}
                    placeholder="Select end date"
                    required
                  />
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-medium text-white/70 mb-4">Erasmus+ / institutional</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mobility-hostInstitution" className="block text-sm font-medium text-white/80 mb-2">
                        Host institution
                      </label>
                      <input
                        id="mobility-hostInstitution"
                        type="text"
                        value={form.hostInstitution}
                        onChange={(e) => setForm((f) => ({ ...f, hostInstitution: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="e.g. European Era"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobility-projectReference" className="block text-sm font-medium text-white/80 mb-2">
                        Project / agreement reference
                      </label>
                      <input
                        id="mobility-projectReference"
                        type="text"
                        value={form.projectReference}
                        onChange={(e) => setForm((f) => ({ ...f, projectReference: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="Erasmus+ / IIA reference"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mobility-keyActionSubtype" className="block text-sm font-medium text-white/80 mb-2">
                        Key Action subtype
                      </label>
                      <select
                        id="mobility-keyActionSubtype"
                        value={form.keyActionSubtype}
                        onChange={(e) => setForm((f) => ({ ...f, keyActionSubtype: e.target.value as KeyActionSubtype | "" }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                      >
                        <option value="">— Select —</option>
                        {KEY_ACTION_SUBTYPES.map((k) => (
                          <option key={k.value} value={k.value}>
                            {k.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="mobility-plannedParticipantCount" className="block text-sm font-medium text-white/80 mb-2">
                        Planned no. of participants
                      </label>
                      <input
                        id="mobility-plannedParticipantCount"
                        type="number"
                        min={0}
                        value={form.plannedParticipantCount}
                        onChange={(e) => setForm((f) => ({ ...f, plannedParticipantCount: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="For reporting"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mobility-agreementStartDate" className="block text-sm font-medium text-white/80 mb-2">
                        Agreement start date
                      </label>
                      <DatePicker
                        id="mobility-agreementStartDate"
                        value={form.agreementStartDate}
                        onChange={(v) => setForm((f) => ({ ...f, agreementStartDate: v }))}
                        placeholder="IIA start"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobility-agreementEndDate" className="block text-sm font-medium text-white/80 mb-2">
                        Agreement end date
                      </label>
                      <DatePicker
                        id="mobility-agreementEndDate"
                        value={form.agreementEndDate}
                        onChange={(v) => setForm((f) => ({ ...f, agreementEndDate: v }))}
                        placeholder="IIA end"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mobility-contactAtHostName" className="block text-sm font-medium text-white/80 mb-2">
                        Contact at host (name)
                      </label>
                      <input
                        id="mobility-contactAtHostName"
                        type="text"
                        value={form.contactAtHostName}
                        onChange={(e) => setForm((f) => ({ ...f, contactAtHostName: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="European Era contact"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobility-contactAtHostEmail" className="block text-sm font-medium text-white/80 mb-2">
                        Contact at host (email)
                      </label>
                      <input
                        id="mobility-contactAtHostEmail"
                        type="email"
                        value={form.contactAtHostEmail}
                        onChange={(e) => setForm((f) => ({ ...f, contactAtHostEmail: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="contact@europeanera.eu"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="mobility-countryOfSendingInstitution" className="block text-sm font-medium text-white/80 mb-2">
                      Country of sending institution
                    </label>
                    <input
                      id="mobility-countryOfSendingInstitution"
                      type="text"
                      value={form.countryOfSendingInstitution}
                      onChange={(e) => setForm((f) => ({ ...f, countryOfSendingInstitution: e.target.value }))}
                      className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                      placeholder="e.g. Germany"
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-medium text-white/70 mb-4">Optional details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mobility-country" className="block text-sm font-medium text-white/80 mb-2">
                        Host country
                      </label>
                      <input
                        id="mobility-country"
                        type="text"
                        value={form.country}
                        onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="e.g. Spain"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobility-programme" className="block text-sm font-medium text-white/80 mb-2">
                        Programme
                      </label>
                      <input
                        id="mobility-programme"
                        type="text"
                        value={form.programme}
                        onChange={(e) => setForm((f) => ({ ...f, programme: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="e.g. Erasmus+ KA1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mobility-coordinatorName" className="block text-sm font-medium text-white/80 mb-2">
                        Coordinator name
                      </label>
                      <input
                        id="mobility-coordinatorName"
                        type="text"
                        value={form.coordinatorName}
                        onChange={(e) => setForm((f) => ({ ...f, coordinatorName: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="Contact at sending school"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobility-coordinatorEmail" className="block text-sm font-medium text-white/80 mb-2">
                        Coordinator email
                      </label>
                      <input
                        id="mobility-coordinatorEmail"
                        type="email"
                        value={form.coordinatorEmail}
                        onChange={(e) => setForm((f) => ({ ...f, coordinatorEmail: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="coordinator@school.edu"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="mobility-accommodation" className="block text-sm font-medium text-white/80 mb-2">
                        Accommodation
                      </label>
                      <input
                        id="mobility-accommodation"
                        type="text"
                        value={form.accommodation}
                        onChange={(e) => setForm((f) => ({ ...f, accommodation: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="Hotel / address"
                      />
                    </div>
                    <div>
                      <label htmlFor="mobility-fundingCode" className="block text-sm font-medium text-white/80 mb-2">
                        Funding / grant code
                      </label>
                      <input
                        id="mobility-fundingCode"
                        type="text"
                        value={form.fundingCode}
                        onChange={(e) => setForm((f) => ({ ...f, fundingCode: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="Grant reference"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="mobility-notes" className="block text-sm font-medium text-white/80 mb-2">
                  Notes
                </label>
                <textarea
                  id="mobility-notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none resize-y"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} className="text-[var(--color-accent)]" aria-hidden />
                    <label className="block text-sm font-medium text-white/80">
                    Link participants
                  </label>
                </div>
                <p className="text-sm text-white/60 mb-3">
                  Participants with matching type (student/staff) are listed. Select who is part of this mobility.
                </p>
                <div className="border border-white/20 bg-white/5 p-4 max-h-48 overflow-y-auto space-y-2">
                  {allStudents
                    .filter((s) => s.mobilityType === form.type)
                    .map((s) => (
                      <label
                        key={s.id}
                        className="flex items-center gap-3 cursor-pointer hover:text-white"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStudentIds.includes(s.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStudentIds((prev) => [...prev, s.id]);
                            } else {
                              setSelectedStudentIds((prev) => prev.filter((id) => id !== s.id));
                            }
                          }}
                          className="rounded border-white/30 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                        />
                        <span className="text-white/90">{s.name}</span>
                        <span className="text-sm text-white/50">({s.school})</span>
                      </label>
                    ))}
                  {allStudents.filter((s) => s.mobilityType === form.type).length === 0 && (
                    <p className="text-sm text-white/50">No participants with type “{form.type}” yet. Add participants first.</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                  {submitting ? "Saving…" : "Save changes"}
                </button>
                <Link
                  href="/dashboard/mobilities"
                  className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 min-h-[48px] font-medium text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
