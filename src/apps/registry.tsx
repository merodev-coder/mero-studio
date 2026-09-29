import type { AppId } from "../types";
import { findProject } from "../data";
import AboutApp from "./AboutApp";
import ExperienceApp from "./ExperienceApp";
import TechApp from "./TechApp";
import ProjectsFolderApp from "./ProjectsFolderApp";
import ContactTerminalApp from "./ContactTerminalApp";
import CVApp from "./CVApp";
import ProjectDetailApp from "./ProjectDetailApp";

export function renderApp(id: AppId) {
  if (id.startsWith("proj:")) {
    const project = findProject(id.slice(5));
    if (!project) return <p className="text-muted">This project couldn't be found.</p>;
    return <ProjectDetailApp project={project} />;
  }

  switch (id) {
    case "about":
      return <AboutApp />;
    case "experience":
      return <ExperienceApp />;
    case "tech":
      return <TechApp />;
    case "projects":
      return <ProjectsFolderApp />;
    case "contact":
      return <ContactTerminalApp />;
    case "cv":
      return <CVApp />;
    default:
      return null;
  }
}
