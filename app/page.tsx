import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ProjectList } from "@/components/project-list";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="ground">
        <ProjectList />
        <Footer />
      </main>
    </>
  );
}
