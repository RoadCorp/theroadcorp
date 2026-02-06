import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ProjectShowcase } from "@/components/project-showcase";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <ProjectShowcase />
      </main>
      <Footer />
    </div>
  );
}
