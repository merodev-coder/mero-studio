import { TECH } from "../data";

export default function TechApp() {
  return (
    <div>
      <h1 className="mb-1.5 text-[26px] font-semibold leading-tight tracking-tight">Tech stack</h1>
      <p className="mb-5 max-w-[68ch] leading-relaxed text-muted">
        Tools I use day to day, grouped by where they sit in a project. The bars show how much of my work each area
        covers, not a test score.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {TECH.map((g) => (
          <section key={g.group} className="rounded-lg border border-edge bg-white p-3.5">
            <h2 className="mb-2.5 text-sm font-semibold">{g.group}</h2>
            <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
              {g.items.map((item) => (
                <li key={item} className="rounded-full border border-edge bg-white px-2.5 py-1 font-mono text-xs">
                  {item}
                </li>
              ))}
            </ul>
            <div
              className="mt-2.5 h-[5px] overflow-hidden rounded-[3px] bg-win2"
              role="img"
              aria-label={`${g.group} share of my work: ${g.level}%`}
            >
              <span className="block h-full bg-accent" style={{ width: `${g.level}%` }} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
