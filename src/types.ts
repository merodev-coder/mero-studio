export type IconName =
  | "doc"
  | "log"
  | "sys"
  | "folder"
  | "proj"
  | "live"
  | "term"
  | "pdf";

export type ProjectStatus = "live" | "repo" | "private";

export interface ProjectLink {
  label: string;
  url: string;
  hot?: boolean;
}

export interface Project {
  id: string;
  file: string;
  name: string;
  kind: string;
  status: ProjectStatus;
  summary: string;
  points: string[];
  stack: string[];
  links: ProjectLink[];
}

export interface TechGroup {
  group: string;
  level: number;
  items: string[];
}

export interface Profile {
  name: string;
  role: string;
  city: string;
  email: string;
  phone: string;
  github: string;
  cv: string;
}

/** Static desktop apps (not counting per-project windows). */
export type StaticAppId =
  | "about"
  | "experience"
  | "tech"
  | "projects"
  | "contact"
  | "cv";

/** Any window id: a static app id, or "proj:<projectId>". */
export type AppId = StaticAppId | `proj:${string}`;

export interface AppMeta {
  title: string;
  icon: IconName;
  width: number;
  height: number;
  /** Render body without the default padded chrome (terminal, folder, pdf, log views). */
  flush?: boolean;
}

export interface WindowState extends AppMeta {
  id: AppId;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  /** initial cascade position, in px, before the user drags it */
  originX: number;
  originY: number;
}
