import { PROFILE } from "../data";
import { useWindowManager } from "../state/WindowManagerContext";

export default function AboutApp() {
  const { openWindow } = useWindowManager();

  return (
    <div>
      <h1 className="mb-1.5 text-[26px] font-semibold leading-tight tracking-tight">Hi, I'm Ammar.</h1>
      <p className="mb-3 max-w-[68ch] text-[16.5px] leading-relaxed">
        I build fast, resilient web applications and high-concurrency backends—from conversion-focused landing pages to
        real-time event pipelines and distributed task queues.
      </p>
      <p className="mb-3 max-w-[68ch] leading-relaxed">
        I'm a full-stack developer in Cairo with 2+ years of experience[cite: 1]. My core stack includes TypeScript and React on
        the frontend[cite: 1], Node.js and Go on the backend[cite: 1], and PostgreSQL, MongoDB, and Redis for storage and caching[cite: 1]. I bridge
        engineering and business needs by optimizing landing page speed and SEO[cite: 1], as well as integrating tools like
        HubSpot and WordPress[cite: 1].
      </p>
      <p className="mb-3 max-w-[68ch] leading-relaxed">
        I spend my free time exploring system design and automation—building distributed job processing engines (Go, Redis
        Streams, Prometheus/Grafana)[cite: 1], low-latency security infrastructure[cite: 1], and custom LLM-powered WhatsApp agents[cite: 1].
        Explore my Projects folder to see them in action.
      </p>

      <div className="my-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <Fact big="2+ years" small="Professional experience" />
        <Fact big="Cairo" small="Working remotely" />
        <Fact big="HITU" small="Bachelor's degree (in progress)" />
        <Fact big="99.9%" small="Uptime on client web assets" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => openWindow("projects")}
          className="rounded-[7px] border border-accent bg-accent px-3.5 py-2 text-[13.5px] font-medium text-accentink hover:bg-[#ffc16b]"
        >
          Browse projects
        </button>
        <a
          href={PROFILE.cv}
          download
          className="rounded-[7px] border border-edge px-3.5 py-2 text-[13.5px] font-medium hover:border-title hover:bg-white"
        >
          Download CV
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="rounded-[7px] border border-edge px-3.5 py-2 text-[13.5px] font-medium hover:border-title hover:bg-white"
        >
          Email me
        </a>
      </div>
    </div>
  );
}

function Fact({ big, small }: { big: string; small: string }) {
  return (
    <div className="rounded-lg border border-edge bg-white px-3 py-2.5">
      <b className="block text-[15px]">{big}</b>
      <small className="text-xs text-muted">{small}</small>
    </div>
  );
}