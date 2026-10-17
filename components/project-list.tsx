import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Logos are white, single-color versions of each project's own mark,
// derived from the project repositories.
type Project = {
  name: string;
  href: string;
  logo: string;
  description: string;
};

const projects: Project[] = [
  {
    name: "Avenews",
    logo: "/projects/avenews.png",
    href: "https://www.avenews.am",
    description: "News for the curious, in English and Armenian.",
  },
  {
    name: "Baylus",
    logo: "/projects/baylus.svg",
    href: "https://www.baylus.am",
    description: "A morning show with Rafa Lyóvson, in Armenian.",
  },
  {
    name: "Bagaran",
    logo: "/projects/bagaran.png",
    href: "https://www.bagaranagency.com",
    description:
      "Websites and writing for Armenian businesses connecting with the world.",
  },
  {
    name: "Lyóvson.com",
    logo: "/projects/lyovson.png",
    href: "https://www.lyovson.com",
    description: "Posts, notes and projects by Rafa and Jess Lyóvson.",
  },
  {
    name: "Concerned EU",
    logo: "/projects/concernedeu.png",
    href: "https://www.concernedeu.com",
    description:
      "A satirical press office: file any concern and get an official EU press release.",
  },
];

const WWW = "www.";

function displayHost(href: string) {
  const { hostname } = new URL(href);
  return hostname.startsWith(WWW) ? hostname.slice(WWW.length) : hostname;
}

export function ProjectList() {
  return (
    <section aria-labelledby="projects-heading" className="projects">
      <h2 className="projects-heading" id="projects-heading">
        Projects
      </h2>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.href}>
            <a className="project" href={project.href}>
              <Image
                alt=""
                className="project-logo"
                height={40}
                src={project.logo}
                unoptimized
                width={40}
              />
              <span className="project-name">{project.name}</span>
              <span className="project-description">{project.description}</span>
              <span className="project-host">
                {displayHost(project.href)}
                <ArrowUpRight aria-hidden="true" className="project-arrow" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
