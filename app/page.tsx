import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ProjectShowcase } from "@/components/project-showcase";

export default function Home() {
  return (
    <div className="flex h-dvh w-dvw flex-col overflow-hidden">
      <main className="flex flex-1 flex-col">
        <Hero />
        <ProjectShowcase />
      </main>
      <Footer />
    </div>
  );
}
