import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "../components/Hero";
import { SectionContainer } from "../components/ui/SectionContainer";
import { FadeInSection } from "../components/ui/FadeInSection";
import { SvgDivider } from "../components/ui/SvgDivider";
import { StaggerList } from "../components/ui/StaggerList";
import { StaggerReveal } from "../components/ui/StaggerReveal";
import { RevealImage } from "../components/ui/RevealImage";
import { services, testimonialsData, parseBold } from "../lib/content";
import { getPosts } from "../lib/blog";
import { GraduationCap, Briefcase, Target, Quote, ArrowRight, Calendar } from "lucide-react";

function ContentWithBold({ text }: { text: string }) {
  const parts = parseBold(text);
  return (
    <p className="text-neutral-600 text-body-lg leading-[1.8] max-w-content">
      {parts.map((part, j) =>
        typeof part === "string" ? part : <strong key={j} className="font-semibold text-neutral-800">{part.bold}</strong>
      )}
    </p>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function Home() {
  const posts = getPosts().slice(0, 3);

  return (
    <Fragment>
      <Hero />
      <section id="services" className="py-section sm:py-section-lg section-alt" aria-labelledby="services-heading">
        <FadeInSection delay={0}>
          <SectionContainer>
            <StaggerReveal className="flex flex-col items-center" staggerDelay={0.1} delayChildren={0}>
              <h2
                id="services-heading"
                className="font-heading text-display font-semibold text-neutral-900 mb-6 text-center tracking-[0.02em] leading-tight"
              >
                Our Services
              </h2>
              <SvgDivider variant="line" className="mb-8" />
              <p className="text-center text-neutral-600 text-body-lg max-w-content mx-auto mb-20">
                Erasmus+ student and staff mobilities in Málaga. We manage every detail so you can focus on learning.
              </p>
            </StaggerReveal>
            <StaggerList className="grid gap-10 md:grid-cols-2" staggerDelay={0.12} delayChildren={0.1} blurFadeIn>
              {services.map((s) => {
                const Icon = s.slug === "student-mobilities" ? GraduationCap : Briefcase;
                return (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="group flex flex-col h-full border border-neutral-200 bg-white p-10 transition-colors duration-300 hover:border-neutral-300/90 hover:bg-stone-50/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center border border-primary/20 text-primary mb-8 transition-colors duration-300 group-hover:border-primary/30 shrink-0"
                      aria-hidden="true"
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h3 className="font-heading text-headline font-semibold text-primary mb-5 shrink-0 tracking-[0.01em]">{s.title}</h3>
                    <div className="flex-1 min-h-0 relative flex flex-col min-h-[12rem]">
                      <ContentWithBold text={s.content} />
                    </div>
                    <span className="mt-8 inline-flex items-center gap-2 text-primary font-medium text-sm text-primary/90 group-hover:text-primary group-hover:gap-2.5 transition-all duration-300 shrink-0">
                      Learn more
                      <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </StaggerList>
            <p className="text-center mt-16 mb-2">
              <Link
                href="/our-commitment"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none py-2"
              >
                Our Commitment
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </p>
          </SectionContainer>
        </FadeInSection>
      </section>
      <section className="py-section sm:py-section-lg bg-white" aria-labelledby="commitment-heading">
        <FadeInSection delay={0.05}>
          <SectionContainer narrow className="text-center">
            <StaggerReveal className="flex flex-col items-center" staggerDelay={0.1} delayChildren={0}>
              <span
                className="inline-flex h-12 w-12 items-center justify-center border border-primary/20 text-primary"
                aria-hidden="true"
              >
                <Target size={22} strokeWidth={1.75} />
              </span>
              <h2
                id="commitment-heading"
                className="font-heading text-display font-semibold text-neutral-900 mt-8 mb-6 tracking-[0.02em] leading-tight"
              >
                Our Commitment
              </h2>
              <SvgDivider variant="wave" className="mb-8" />
              <p className="text-body-lg text-neutral-600 leading-relaxed max-w-content mx-auto">
                We are committed to empowering personal growth and promoting{" "}
                <strong className="font-semibold text-neutral-800">inclusivity and sustainability</strong> through exceptional Erasmus+ mobility management.
              </p>
              <p className="text-sm font-medium text-primary/80 tracking-wide mt-6" aria-hidden="true">
                Personal growth · Inclusivity · Sustainability
              </p>
              <Link
                href="/our-commitment"
                className="btn-primary mt-12 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Read more
              </Link>
            </StaggerReveal>
          </SectionContainer>
        </FadeInSection>
      </section>
      <section className="py-section sm:py-section-lg section-alt" aria-labelledby="about-heading">
        <FadeInSection delay={0.05}>
          <SectionContainer className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
            <StaggerReveal className="flex flex-col" staggerDelay={0.1} delayChildren={0}>
              <h2
                id="about-heading"
                className="font-heading text-display font-semibold text-neutral-900 mb-8 tracking-[0.02em] leading-tight"
              >
                Education & Mobility Experts
              </h2>
              <p className="text-neutral-600 text-body-lg leading-relaxed mb-8 max-w-content">
                We're a passionate, international team dedicated to making a real difference. We specialise in student internships and teacher training courses in Málaga, Spain.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none"
              >
                About Us
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </StaggerReveal>
            <RevealImage
              className="relative aspect-[4/3] overflow-hidden border border-neutral-200 bg-neutral-100"
              scaleIn={false}
              delay={0.15}
            >
              <Image
                src="https://europeanera.eu/wp-content/uploads/2026/01/European-Era-Staff-1024x683-1.jpg"
                alt="European Era team – education and mobility experts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </RevealImage>
          </SectionContainer>
        </FadeInSection>
      </section>
      <section className="py-section sm:py-section-lg bg-white" aria-labelledby="testimonials-heading">
        <FadeInSection delay={0.05}>
          <SectionContainer>
            <StaggerReveal className="flex flex-col items-center mb-16" staggerDelay={0.08} delayChildren={0}>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70 mb-4 text-center"
                aria-hidden="true"
              >
                OUR INTERNSHIP STUDENTS
              </p>
              <h2
                id="testimonials-heading"
                className="font-heading text-display font-semibold text-neutral-900 mb-8 text-center tracking-[0.02em] leading-tight"
              >
                Real Stories That Move Us
              </h2>
              <SvgDivider variant="line" className="mb-12" />
            </StaggerReveal>
            <StaggerList className="grid gap-10 md:grid-cols-3" staggerDelay={0.08} delayChildren={0.05}>
              {testimonialsData.slice(0, 3).map((t, i) => (
                <blockquote
                  key={i}
                  className="border border-neutral-200 bg-stone-50/60 p-8 h-full flex flex-col transition-colors duration-200 hover:border-neutral-300 focus-within:border-neutral-300"
                >
                  {"image" in t && t.image && (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden mb-5 shrink-0 bg-neutral-200">
                      <Image src={t.image} alt="" fill className="object-cover" sizes="56px" />
                    </div>
                  )}
                  <span
                    className="text-primary/20 mb-4 inline-block"
                    aria-hidden="true"
                  >
                    <Quote size={22} />
                  </span>
                  <p className="text-neutral-600 leading-relaxed flex-1 text-body-sm line-clamp-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="text-sm text-neutral-500 font-medium mt-5">
                    <cite className="not-italic">{t.author}</cite>, {t.org}
                  </footer>
                </blockquote>
              ))}
            </StaggerList>
            <p className="text-center mt-16">
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none"
              >
                All testimonials
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </p>
          </SectionContainer>
        </FadeInSection>
      </section>
      <section className="py-section sm:py-section-lg section-alt" aria-labelledby="blog-heading">
        <FadeInSection delay={0.05}>
          <SectionContainer>
            <StaggerReveal className="flex flex-col items-center" staggerDelay={0.1} delayChildren={0}>
              <h2
                id="blog-heading"
                className="font-heading text-display font-semibold text-neutral-900 mb-6 text-center tracking-[0.02em] leading-tight"
              >
                From the Blog
              </h2>
              <SvgDivider variant="wave" className="mb-6" />
              <p className="text-center text-neutral-600 text-body-lg max-w-content mx-auto mb-16">
                Insights on Erasmus+ mobilities, teacher training, and international education in Málaga.
              </p>
            </StaggerReveal>
            <StaggerList className="grid gap-10 md:grid-cols-3" staggerDelay={0.1} delayChildren={0.1}>
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block border border-neutral-200 bg-white overflow-hidden transition-colors duration-200 hover:border-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {post.image && (
                    <div className="relative aspect-video bg-neutral-100">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="font-heading text-title font-semibold text-neutral-900 group-hover:text-primary transition-colors line-clamp-2 tracking-[0.01em]">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-neutral-600 text-body-sm line-clamp-2">{post.excerpt}</p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-neutral-500">
                      <Calendar size={14} aria-hidden="true" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                  </div>
                </Link>
              ))}
            </StaggerList>
            <p className="text-center mt-16">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none"
              >
                View all posts
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </p>
          </SectionContainer>
        </FadeInSection>
      </section>
      <section className="py-section sm:py-section-lg text-white section-cta-animated" aria-labelledby="contact-cta-heading">
        <FadeInSection delay={0}>
          <SectionContainer narrow className="text-center">
            <StaggerReveal className="flex flex-col items-center" staggerDelay={0.1} delayChildren={0}>
              <h2
                id="contact-cta-heading"
                className="font-heading text-display font-semibold mb-6 tracking-[0.02em] text-white leading-tight"
              >
                Ready to start your mobility in Málaga?
              </h2>
              <SvgDivider variant="line" className="mb-8 text-white/30" />
              <p className="text-body-lg text-white/85 mb-12 max-w-content mx-auto leading-relaxed">
                Get in touch and we'll support you from the first enquiry to the final evaluation.
              </p>
              <Link
                href="/contact"
                className="btn-accent focus-visible:ring-accent focus-visible:ring-offset-primary"
              >
                CONTACT US
              </Link>
            </StaggerReveal>
          </SectionContainer>
        </FadeInSection>
      </section>
    </Fragment>
  );
}
