import { PROFILE } from "../data";
import { useWindowManager } from "../state/WindowManagerContext";

export default function AboutApp() {
  const { openWindow } = useWindowManager();

  return (
    <div>
      <h1 className="mb-1.5 text-[26px] font-semibold leading-tight tracking-tight">Hi, I'm Ammar.</h1>
      <p className="mb-3 max-w-[68ch] text-[16.5px] leading-relaxed">
        I build fast, well-structured web systems, from the landing page a visitor sees to the queue and database
        behind it.
      </p>
      <p className="mb-3 max-w-[68ch] leading-relaxed">
        I'm a full-stack web developer in Cairo with 2+ years of experience. I work with HTML, CSS and JavaScript on
        the front, Node.js and Go on the back, and I care about SEO, landing-page performance and the marketing
        platforms (HubSpot, WordPress) that businesses actually run on. I like tracking down slow pages and broken
        layouts and fixing them properly.
      </p>
      <p className="mb-3 max-w-[68ch] leading-relaxed">
        Outside client work I build distributed systems for fun: task queues, event-driven security bots and AI
        agents. You'll find them in the Projects folder.
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
