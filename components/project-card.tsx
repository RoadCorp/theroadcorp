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
      className="group relative flex min-w-[260px] flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-500 hover:border-foreground/20 hover:bg-secondary sm:min-w-[320px] sm:p-6"
      href={project.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {/* Arrow indicator */}
      <div className="absolute right-4 top-4 flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-foreground/30 group-hover:text-foreground sm:right-5 sm:top-5 sm:size-8">
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      {/* Logo */}
      <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-secondary/50 p-2 transition-colors duration-300 group-hover:border-foreground/10 sm:size-12 sm:p-2.5">
        <Image
          alt={project.alt}
          className={`size-full object-contain ${project.name === "Avenews" ? "invert" : ""}`}
          height={40}
          loading="lazy"
          src={project.logo}
          width={40}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-serif text-lg font-medium tracking-tight text-card-foreground sm:text-xl">
          {project.name}
        </h3>
        <p className="max-w-[260px] text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {project.description}
        </p>
      </div>

      {/* Domain */}
      <span className="mt-auto text-[10px] font-medium uppercase tracking-widest text-muted-foreground/60 transition-colors duration-300 group-hover:text-muted-foreground sm:text-xs">
        {new URL(project.href).hostname}
      </span>
    </a>
  );
}
