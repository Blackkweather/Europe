import { HeroVideoSection } from "@/components/HeroVideoSection";
import { JourneySection } from "@/components/JourneySection";
import { ServicesVideoSection } from "@/components/ServicesVideoSection";
import { CommitmentMouseSection } from "@/components/CommitmentMouseSection";
import { TestimonialsAutoSection } from "@/components/TestimonialsAutoSection";
import { ContactFloatingFormSection } from "@/components/ContactFloatingFormSection";
import { getPosts } from "@/lib/blog";
import { BlogPreviewSection } from "@/components/BlogPreviewSection";

export default function Home() {
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <HeroVideoSection />
      <JourneySection />
      <ServicesVideoSection />
      <CommitmentMouseSection />
      <BlogPreviewSection posts={posts} />
      <TestimonialsAutoSection />
      <ContactFloatingFormSection />
    </>
  );
}
