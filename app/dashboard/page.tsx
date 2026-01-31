import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "../../lib/auth";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionContainer } from "../../components/ui/SectionContainer";
import { LayoutDashboard, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${session.user.name ?? session.user.email}`}
        breadcrumbs={[{ label: "Dashboard" }]}
        variant="default"
      />
      <section className="py-section sm:py-section-lg bg-stone-50/80">
        <SectionContainer narrow>
          <div className="border border-neutral-200 bg-white p-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="flex h-12 w-12 items-center justify-center border border-primary/20 text-primary">
                <LayoutDashboard size={24} aria-hidden />
              </span>
              <div>
                <h2 className="font-heading text-headline font-semibold text-neutral-900 tracking-[0.02em]">Your account</h2>
                <p className="text-sm text-neutral-600">{session.user.email}</p>
              </div>
            </div>
            <p className="text-neutral-600 text-body-lg mb-6">
              You are logged in. Manage blog posts and platform content from here.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard/blog"
                className="btn-primary inline-flex items-center gap-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Manage blog
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-neutral-300 px-6 py-3 min-h-[48px] font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none transition-colors"
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
