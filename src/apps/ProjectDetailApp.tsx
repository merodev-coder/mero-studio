import type { Project } from "../types";

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live website",
  repo: "Source available",
  private: "Private project",
};

const STATUS_CLASS: Record<Project["status"], string> = {
  live: "bg-[#0f5a3d]",
  repo: "bg-[#3b2a6b]",
  private: "bg-title",
};

export default function ProjectDetailApp({ project }: { project: Project }) {
  return (
    <div>
      <h1 className="mb-1.5 text-[26px] font-semibold leading-tight tracking-tight">{project.name}</h1>

      <div className="mb-3.5 flex flex-wrap items-center gap-2 text-[13px] text-muted">
        <span className={`rounded-[5px] px-2 py-0.5 font-mono text-[11.5px] text-titletext ${STATUS_CLASS[project.status]}`}>
          {STATUS_LABEL[project.status]}
        </span>
        <span>{project.kind}</span>
      </div>

      <p className="mb-3 max-w-[68ch] text-[16.5px] leading-relaxed">{project.summary}</p>

      <h2 className="mb-2 mt-6 text-[15px] font-semibold">{project.status === "live" ? "What's on it" : "What it does"}</h2>
      <ul className="mb-3 max-w-[70ch] list-disc space-y-1.5 pl-5">
        {project.points.map((point) => (
          <li key={point} className="leading-relaxed">
            {point}
          </li>
        ))}
      </ul>

      <h2 className="mb-2 mt-6 text-[15px] font-semibold">{project.status === "live" ? "Focus areas" : "Built with"}</h2>
      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {project.stack.map((item) => (
          <li key={item} className="rounded-full border border-edge bg-white px-2.5 py-1 font-mono text-xs">
            {item}
          </li>
        ))}
      </ul>

      {project.links.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener"
              className={
                link.hot
                  ? "rounded-[7px] border border-accent bg-accent px-3.5 py-2 text-[13.5px] font-medium text-accentink hover:bg-[#ffc16b]"
                  : "rounded-[7px] border border-edge px-3.5 py-2 text-[13.5px] font-medium hover:border-title hover:bg-white"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-muted">No public link for this one. Ask me and I'll walk you through it.</p>
      )}
    </div>
  );
}
