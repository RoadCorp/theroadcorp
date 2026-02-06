import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export type Project = {
  name: string;
  href: string;
  logo: string;
  alt: string;
  description: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      aria-label={`Visit ${project.name}`}
      className="group relative flex min-w-[300px] flex-col gap-6 rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-foreground/20 hover:bg-secondary sm:min-w-[380px] sm:p-10"
      href={project.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {/* Arrow indicator */}
      <div className="absolute right-6 top-6 flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-foreground/30 group-hover:text-foreground sm:right-8 sm:top-8">
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      {/* Logo */}
      <div className="flex size-14 items-center justify-center rounded-xl border border-border bg-secondary/50 p-2.5 transition-colors duration-300 group-hover:border-foreground/10 sm:size-16 sm:p-3">
        <Image
          alt={project.alt}
          className={`size-full object-contain ${project.name === "Avenews" ? "invert" : ""}`}
          height={48}
          loading="lazy"
          src={project.logo}
          width={48}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-xl font-medium tracking-tight text-card-foreground sm:text-2xl">
          {project.name}
        </h3>
        <p className="max-w-[280px] text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </div>

      {/* Domain */}
      <span className="mt-auto text-xs font-medium uppercase tracking-widest text-muted-foreground/60 transition-colors duration-300 group-hover:text-muted-foreground">
        {new URL(project.href).hostname}
      </span>
    </a>
  );
}
