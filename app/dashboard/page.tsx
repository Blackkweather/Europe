import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "../../lib/auth";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionContainer } from "../../components/ui/SectionContainer";
import { readStudents } from "../../lib/students-data";
import { readMobilities } from "../../lib/mobilities-data";
import { LayoutDashboard, ArrowRight, FileText, Users, MapPin } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const students = readStudents();
  const mobilities = readMobilities();
  const studentCount = students.length;
  const mobilityCount = mobilities.length;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${session.user.name ?? session.user.email}`}
        breadcrumbs={[{ label: "Dashboard" }]}
        variant="default"
      />
      <section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
        <SectionContainer narrow>
          <div className="border border-white/10 bg-white/5 p-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="flex h-12 w-12 items-center justify-center border border-white/20 text-[var(--color-accent)]">
                <LayoutDashboard size={24} aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-headline font-semibold text-white tracking-[0.02em]">Your account</h2>
                <p className="text-sm text-white/70">{session.user.email}</p>
              </div>
            </div>
            <p className="text-white/90 text-body-lg mb-6">
              You are logged in. Manage blog posts, participants, mobilities and platform content from here.
            </p>

            <h3 className="font-heading text-lg font-semibold text-white tracking-[0.02em] mb-4">Quick links</h3>
            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              <Link
                href="/dashboard/blog"
                className="flex items-center gap-4 border border-white/10 bg-white/5 p-5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] transition-colors"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-[var(--color-accent)]">
                  <FileText size={20} aria-hidden />
                </span>
                <div className="min-w-0">
                  <span className="font-medium text-white block">Blog</span>
                  <span className="text-sm text-white/70">Manage posts</span>
                </div>
                <ArrowRight size={18} className="ml-auto shrink-0 text-white/60" aria-hidden />
              </Link>
              <Link
                href="/dashboard/students"
                className="flex items-center gap-4 border border-white/10 bg-white/5 p-5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] transition-colors"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-[var(--color-accent)]">
                  <Users size={20} aria-hidden />
                </span>
                <div className="min-w-0">
                  <span className="font-medium text-white block">Participants</span>
                  <span className="text-sm text-white/70">{studentCount} {studentCount === 1 ? "participant" : "participants"}</span>
                </div>
                <ArrowRight size={18} className="ml-auto shrink-0 text-white/60" aria-hidden />
              </Link>
              <Link
                href="/dashboard/mobilities"
                className="flex items-center gap-4 border border-white/10 bg-white/5 p-5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] transition-colors"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-[var(--color-accent)]">
                  <MapPin size={20} aria-hidden />
                </span>
                <div className="min-w-0">
                  <span className="font-medium text-white block">Mobilities</span>
                  <span className="text-sm text-white/70">{mobilityCount} {mobilityCount === 1 ? "mobility" : "mobilities"}</span>
                </div>
                <ArrowRight size={18} className="ml-auto shrink-0 text-white/60" aria-hidden />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard/blog"
                className="btn-primary inline-flex items-center gap-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Manage blog
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/dashboard/students"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 min-h-[48px] font-medium text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none transition-colors"
              >
                Participants
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/dashboard/mobilities"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 min-h-[48px] font-medium text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none transition-colors"
              >
                Mobilities
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 min-h-[48px] font-medium text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none transition-colors"
              >
                Back to home
                <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
