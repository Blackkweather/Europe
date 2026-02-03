"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { DatePicker } from "@/components/ui/DatePicker";
import { ArrowLeft } from "lucide-react";
import type { Student, StudentStatus, MobilityType, ParticipantType, LearningAgreementStatus } from "@/lib/students-data";

const STATUSES: { value: StudentStatus; label: string }[] = [
  { value: "enquiry", label: "Enquiry" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in_malaga", label: "In Málaga" },
  { value: "completed", label: "Completed" },
];
const TYPES: { value: MobilityType; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "staff", label: "Staff" },
];
const PARTICIPANT_TYPES: { value: ParticipantType; label: string }[] = [
  { value: "student_studies", label: "Student – mobility for studies" },
  { value: "student_traineeship", label: "Student – traineeship" },
  { value: "staff_teaching", label: "Staff – teaching" },
  { value: "staff_training", label: "Staff – training" },
];
const LEARNING_AGREEMENT_STATUSES: { value: LearningAgreementStatus; label: string }[] = [
  { value: "not_required", label: "Not required" },
  { value: "sent", label: "Sent" },
  { value: "signed", label: "Signed" },
  { value: "pending", label: "Pending" },
];

export default function DashboardStudentsEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    school: "",
    country: "",
    mobilityType: "student" as MobilityType,
    status: "enquiry" as StudentStatus,
    startDate: "",
    endDate: "",
    mobilityId: "",
    phone: "",
    programme: "",
    accommodation: "",
    emergencyContact: "",
    dietaryRequirements: "",
    arrivalDetails: "",
    departureDetails: "",
    fieldOfStudy: "",
    participantType: "" as ParticipantType | "",
    learningAgreementStatus: "" as LearningAgreementStatus | "",
    durationWeeks: "",
    preparationNotes: "",
    notes: "",
  });

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/students/${encodeURIComponent(id)}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((s: Student) => {
        setStudent(s);
        setForm({
          name: s.name,
          email: s.email,
          school: s.school,
          country: s.country,
          mobilityType: s.mobilityType,
          status: s.status,
          startDate: s.startDate ?? "",
          endDate: s.endDate ?? "",
          mobilityId: s.mobilityId ?? "",
          phone: s.phone ?? "",
          programme: s.programme ?? "",
          accommodation: s.accommodation ?? "",
          emergencyContact: s.emergencyContact ?? "",
          dietaryRequirements: s.dietaryRequirements ?? "",
          arrivalDetails: s.arrivalDetails ?? "",
          departureDetails: s.departureDetails ?? "",
          fieldOfStudy: s.fieldOfStudy ?? "",
          participantType: (s.participantType ?? "") as ParticipantType | "",
          learningAgreementStatus: (s.learningAgreementStatus ?? "") as LearningAgreementStatus | "",
          durationWeeks: s.durationWeeks != null ? String(s.durationWeeks) : "",
          preparationNotes: s.preparationNotes ?? "",
          notes: s.notes ?? "",
        });
      })
      .catch(() => setStudent(null))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/students/${encodeURIComponent(id)}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          school: form.school.trim(),
          country: form.country.trim(),
          mobilityType: form.mobilityType,
          status: form.status,
          startDate: form.startDate.trim() || undefined,
          endDate: form.endDate.trim() || undefined,
          mobilityId: form.mobilityId.trim() || undefined,
          phone: form.phone.trim() || undefined,
          programme: form.programme.trim() || undefined,
          accommodation: form.accommodation.trim() || undefined,
          emergencyContact: form.emergencyContact.trim() || undefined,
          dietaryRequirements: form.dietaryRequirements.trim() || undefined,
          arrivalDetails: form.arrivalDetails.trim() || undefined,
          departureDetails: form.departureDetails.trim() || undefined,
          fieldOfStudy: form.fieldOfStudy.trim() || undefined,
          participantType: form.participantType || undefined,
          learningAgreementStatus: form.learningAgreementStatus || undefined,
          durationWeeks: form.durationWeeks ? parseInt(form.durationWeeks, 10) : undefined,
          preparationNotes: form.preparationNotes.trim() || undefined,
          notes: form.notes.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Failed to update participant");
      router.push("/dashboard/students");
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
        <PageHeader title="Edit participant" breadcrumbs={[{ label: "Dashboard" }, { label: "Participants" }, { label: "Edit" }]} variant="default" />
        <section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
          <SectionContainer>
            <p className="text-white/60">Loading…</p>
          </SectionContainer>
        </section>
      </>
    );
  }

  if (!student) {
    return (
      <>
        <PageHeader title="Participant not found" breadcrumbs={[{ label: "Dashboard" }, { label: "Participants" }]} variant="default" />
        <section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
          <SectionContainer>
            <p className="text-white/90 mb-4">Participant not found.</p>
            <Link href="/dashboard/students" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={18} aria-hidden />
              Back to Participants
            </Link>
          </SectionContainer>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Edit participant"
        description={student.name}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Participants", href: "/dashboard/students" },
          { label: "Edit" },
        ]}
        variant="default"
      />
      <section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
        <SectionContainer>
          <Link
            href="/dashboard/students"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[var(--color-accent)] font-medium mb-8 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none"
          >
            <ArrowLeft size={18} aria-hidden />
            Back to Participants
          </Link>
          <div className="border border-white/10 bg-white/5 p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              {error && (
                <p className="text-sm text-[var(--color-accent)] bg-white/5 border border-white/20 px-4 py-3" role="alert">
                  {error}
                </p>
              )}
              <div>
                <label htmlFor="student-name" className="block text-sm font-medium text-white/80 mb-2">
                  Name *
                </label>
                <input
                  id="student-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label htmlFor="student-email" className="block text-sm font-medium text-white/80 mb-2">
                  Email *
                </label>
                <input
                  id="student-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label htmlFor="student-school" className="block text-sm font-medium text-white/80 mb-2">
                  Sending institution *
                </label>
                <input
                  id="student-school"
                  type="text"
                  required
                  value={form.school}
                  onChange={(e) => setForm((f) => ({ ...f, school: e.target.value }))}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                />
              </div>
              <div>
                <label htmlFor="student-country" className="block text-sm font-medium text-white/80 mb-2">
                  Country *
                </label>
                <input
                  id="student-country"
                  type="text"
                  required
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="student-type" className="block text-sm font-medium text-white/80 mb-2">
                    Type
                  </label>
                  <select
                    id="student-type"
                    value={form.mobilityType}
                    onChange={(e) => setForm((f) => ({ ...f, mobilityType: e.target.value as MobilityType }))}
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
                  <label htmlFor="student-status" className="block text-sm font-medium text-white/80 mb-2">
                    Status
                  </label>
                  <select
                    id="student-status"
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as StudentStatus }))}
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
                  <label htmlFor="student-start" className="block text-sm font-medium text-white/80 mb-2">
                    Start date
                  </label>
                  <DatePicker
                    id="student-start"
                    value={form.startDate}
                    onChange={(v) => setForm((f) => ({ ...f, startDate: v }))}
                    placeholder="Select start date"
                  />
                </div>
                <div>
                  <label htmlFor="student-end" className="block text-sm font-medium text-white/80 mb-2">
                    End date
                  </label>
                  <DatePicker
                    id="student-end"
                    value={form.endDate}
                    onChange={(v) => setForm((f) => ({ ...f, endDate: v }))}
                    placeholder="Select end date"
                  />
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-medium text-white/70 mb-4">Erasmus+ / participant</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="student-fieldOfStudy" className="block text-sm font-medium text-white/80 mb-2">
                        Field of study / teaching area
                      </label>
                      <input
                        id="student-fieldOfStudy"
                        type="text"
                        value={form.fieldOfStudy}
                        onChange={(e) => setForm((f) => ({ ...f, fieldOfStudy: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="Subject or discipline"
                      />
                    </div>
                    <div>
                      <label htmlFor="student-participantType" className="block text-sm font-medium text-white/80 mb-2">
                        Erasmus+ participant type
                      </label>
                      <select
                        id="student-participantType"
                        value={form.participantType}
                        onChange={(e) => setForm((f) => ({ ...f, participantType: e.target.value as ParticipantType | "" }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                      >
                        <option value="">— Select —</option>
                        {PARTICIPANT_TYPES.map((p) => (
                          <option key={p.value} value={p.value}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="student-learningAgreementStatus" className="block text-sm font-medium text-white/80 mb-2">
                        Learning agreement status
                      </label>
                      <select
                        id="student-learningAgreementStatus"
                        value={form.learningAgreementStatus}
                        onChange={(e) => setForm((f) => ({ ...f, learningAgreementStatus: e.target.value as LearningAgreementStatus | "" }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                      >
                        <option value="">— Select —</option>
                        {LEARNING_AGREEMENT_STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="student-durationWeeks" className="block text-sm font-medium text-white/80 mb-2">
                        Duration (weeks)
                      </label>
                      <input
                        id="student-durationWeeks"
                        type="number"
                        min={0}
                        value={form.durationWeeks}
                        onChange={(e) => setForm((f) => ({ ...f, durationWeeks: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="For reporting"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="student-preparationNotes" className="block text-sm font-medium text-white/80 mb-2">
                      Visa / insurance / preparation notes
                    </label>
                    <textarea
                      id="student-preparationNotes"
                      rows={2}
                      value={form.preparationNotes}
                      onChange={(e) => setForm((f) => ({ ...f, preparationNotes: e.target.value }))}
                      className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none resize-y"
                      placeholder="Checklist or notes"
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-medium text-white/70 mb-4">Optional details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="student-phone" className="block text-sm font-medium text-white/80 mb-2">
                        Phone
                      </label>
                      <input
                        id="student-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="+34 612 345 678"
                      />
                    </div>
                    <div>
                      <label htmlFor="student-programme" className="block text-sm font-medium text-white/80 mb-2">
                        Programme
                      </label>
                      <input
                        id="student-programme"
                        type="text"
                        value={form.programme}
                        onChange={(e) => setForm((f) => ({ ...f, programme: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="e.g. Erasmus+ KA1"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="student-accommodation" className="block text-sm font-medium text-white/80 mb-2">
                      Accommodation
                    </label>
                    <input
                      id="student-accommodation"
                      type="text"
                      value={form.accommodation}
                      onChange={(e) => setForm((f) => ({ ...f, accommodation: e.target.value }))}
                      className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                      placeholder="Hotel / address"
                    />
                  </div>
                  <div>
                    <label htmlFor="student-emergencyContact" className="block text-sm font-medium text-white/80 mb-2">
                      Emergency contact
                    </label>
                    <input
                      id="student-emergencyContact"
                      type="text"
                      value={form.emergencyContact}
                      onChange={(e) => setForm((f) => ({ ...f, emergencyContact: e.target.value }))}
                      className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                      placeholder="Name and phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="student-dietaryRequirements" className="block text-sm font-medium text-white/80 mb-2">
                      Dietary requirements
                    </label>
                    <input
                      id="student-dietaryRequirements"
                      type="text"
                      value={form.dietaryRequirements}
                      onChange={(e) => setForm((f) => ({ ...f, dietaryRequirements: e.target.value }))}
                      className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                      placeholder="Allergies, vegetarian, etc."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="student-arrivalDetails" className="block text-sm font-medium text-white/80 mb-2">
                        Arrival details
                      </label>
                      <input
                        id="student-arrivalDetails"
                        type="text"
                        value={form.arrivalDetails}
                        onChange={(e) => setForm((f) => ({ ...f, arrivalDetails: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="Flight / time"
                      />
                    </div>
                    <div>
                      <label htmlFor="student-departureDetails" className="block text-sm font-medium text-white/80 mb-2">
                        Departure details
                      </label>
                      <input
                        id="student-departureDetails"
                        type="text"
                        value={form.departureDetails}
                        onChange={(e) => setForm((f) => ({ ...f, departureDetails: e.target.value }))}
                        className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none min-h-[48px]"
                        placeholder="Flight / time"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="student-notes" className="block text-sm font-medium text-white/80 mb-2">
                  Notes
                </label>
                <textarea
                  id="student-notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none resize-y"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                  {submitting ? "Saving…" : "Save participant"}
                </button>
                <Link
                  href="/dashboard/students"
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
