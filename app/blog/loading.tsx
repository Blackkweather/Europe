import { SectionContainer } from "../../components/ui/SectionContainer";

export default function BlogLoading() {
  return (
    <>
      <header className="border-b border-neutral-200 bg-stone-50/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-6 w-32 mx-auto bg-neutral-200/80 rounded animate-pulse" aria-hidden />
          <div className="mt-4 h-10 w-72 max-w-full mx-auto bg-neutral-200/60 rounded animate-pulse" aria-hidden />
        </div>
      </header>
      <section className="py-section sm:py-section-lg bg-stone-50/80">
        <SectionContainer>
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3" role="list" aria-busy="true" aria-label="Loading blog posts">
            {[1, 2, 3].map((i) => (
              <li key={i} className="border border-neutral-200 bg-white overflow-hidden">
                <div className="aspect-[16/10] bg-neutral-100 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-3/4 bg-neutral-200 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-neutral-100 rounded animate-pulse" />
                  <div className="h-3 w-full bg-neutral-100 rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-neutral-100 rounded animate-pulse" />
                </div>
              </li>
            ))}
          </ul>
        </SectionContainer>
      </section>
    </>
  );
}
