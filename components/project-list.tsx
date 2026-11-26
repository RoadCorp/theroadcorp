import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

// Logos are white, single-color versions of each project's own mark,
// derived from the project repositories.
type Project = {
  route: string;
  name: string;
  href: string;
  logo: string;
  description: string;
};

const projects: Project[] = [
  {
    route: "01",
    name: "AveNews",
    logo: "/projects/avenews.png",
    href: "https://www.avenews.am",
    description: "News for the curious, in English and Armenian.",
  },
  {
    route: "02",
    name: "Baylus",
    logo: "/projects/baylus.svg",
    href: "https://www.baylus.am",
    description: "A morning show with Rafa Lyóvson, in Armenian.",
  },
  {
    route: "03",
    name: "Bagaran",
    logo: "/projects/bagaran.svg",
    href: "https://www.bagaranagency.com",
    description: "Websites, content and business systems.",
  },
  {
    route: "04",
    name: "Lyóvson.com",
    logo: "/projects/lyovson.png",
    href: "https://www.lyovson.com",
    description: "Writing, projects and research by Rafa and Jess Lyóvson.",
  },
  {
    route: "05",
    name: "Concerned EU",
    logo: "/projects/concernedeu.png",
    href: "https://www.concernedeu.com",
    description:
      "A satirical press office: file any concern and get an official EU press release.",
  },
];

const WWW = "www.";
const ROUTE_PAD = 2;

function displayHost(href: string) {
  const { hostname } = new URL(href);
  return hostname.startsWith(WWW) ? hostname.slice(WWW.length) : hostname;
}

export function ProjectList() {
  const routeCount = String(projects.length).padStart(ROUTE_PAD, "0");

  return (
    <section aria-labelledby="projects-heading" className="projects">
      <div className="projects-header">
        <h2 className="projects-heading" id="projects-heading">
          Projects
        </h2>
        <span aria-hidden="true" className="projects-count">
          <span className="projects-count-num">{routeCount}</span> routes
        </span>
      </div>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.href}>
            <a
              className="project"
              href={project.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span aria-hidden="true" className="project-route">
                {project.route}
              </span>
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
