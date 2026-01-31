import { SectionContainer } from "../../components/ui/SectionContainer";

export default function DashboardLoading() {
  return (
    <>
      <header className="border-b border-neutral-200 bg-stone-50/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-5 w-24 bg-neutral-200/80 rounded animate-pulse" aria-hidden />
          <div className="mt-4 h-8 w-64 bg-neutral-200/60 rounded animate-pulse" aria-hidden />
        </div>
      </header>
      <section className="py-section sm:py-section-lg bg-stone-50/80">
        <SectionContainer narrow>
          <div className="border border-neutral-200 bg-white p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded border border-neutral-200 bg-neutral-100 animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 w-48 bg-neutral-100 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-4 w-full max-w-md bg-neutral-100 rounded animate-pulse mb-6" />
            <div className="flex gap-4">
              <div className="h-12 w-36 bg-neutral-200 rounded animate-pulse" />
              <div className="h-12 w-28 bg-neutral-100 rounded animate-pulse" />
            </div>
          </div>
        </SectionContainer>
      </section>
    </>
  );
}
