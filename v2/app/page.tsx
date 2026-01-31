import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WorkSection } from "@/components/home/WorkSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { getPosts } from "@/lib/blog";

export default function Home() {
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <WorkSection posts={posts} />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
