import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/components/project-card";

const projects: Project[] = [
  {
    name: "Bagaran Agency",
    href: "https://www.bagaranagency.com",
    logo: "/logos/bagaran-light.webp",
    alt: "Bagaran Agency logo",
    description:
      "Creative digital agency specializing in brand identity and web development",
  },
  {
    name: "Lyovson.com",
    href: "https://www.lyovson.com",
    logo: "/logos/crest-light-simple.webp",
    alt: "Lyovson crest logo",
    description:
      "Personal portfolio and blog featuring design insights and projects",
  },
  {
    name: "Avenews",
    href: "https://www.avenews.am",
    logo: "/logos/avenews-logo.png",
    alt: "Avenews logo",
    description:
      "Armenian news platform delivering timely and accurate journalism",
  },
];

export function ProjectShowcase() {
  const duplicated = [...projects, ...projects];

  return (
    <section className="py-20 sm:py-28" id="work">
      {/* Section heading */}
      <div className="mx-auto mb-14 max-w-2xl px-6 text-center sm:mb-20">
        <h2 className="fade-up font-serif text-2xl font-normal tracking-wide text-foreground text-balance sm:text-3xl">
          Our Work
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40"
          style={{
            background:
              "linear-gradient(to right, var(--background), transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40"
          style={{
            background:
              "linear-gradient(to left, var(--background), transparent)",
          }}
        />

        <div aria-label="Featured projects" role="region">
          <ul className="marquee-track gap-6 px-6 py-4 sm:gap-8">
            {duplicated.map((project, idx) => {
              const isClone = idx >= projects.length;
              return (
                <li
                  aria-hidden={isClone}
                  className="inline-block flex-shrink-0"
                  key={`${project.name}-${idx}`}
                >
                  <ProjectCard project={project} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
