export default function ExperienceApp() {
  return (
    <div className="min-h-full bg-[#0e1626] px-6 py-5 font-mono text-[13px] leading-7 text-[#cfe0ff]">
      <div className="text-[#6f86ad]"># work history · newest first</div>
      <hr className="my-5 border-t border-dashed border-[#2a3b5c]" />

      <h3 className="text-base font-semibold text-white">Full-Stack Developer</h3>
      <div>
        <span className="text-accent">Freelance (independent contractor)</span> · Remote ·{" "}
        <span className="text-ok">Jan 2024 – present</span>
      </div>
      <ul className="my-2.5 list-none space-y-2 pl-0">
        {[
          "Build responsive web apps with React and HTML/CSS that work across devices, improving user engagement by 30%.",
          "Optimise landing pages and marketing campaigns with SEO and web analytics, lifting lead conversion by 25%.",
          "Fix performance bottlenecks and cross-browser layout inconsistencies so marketing sites behave the same everywhere.",
          "Develop secure backend services and RESTful APIs with Node.js and PostgreSQL, keeping client web assets at 99.9% uptime.",
          "Integrate WordPress, HubSpot and the WhatsApp Business API to automate customer service and content workflows.",
        ].map((line) => (
          <li key={line} className="relative pl-[22px] before:absolute before:left-1 before:text-ok before:content-['+']">
            {line}
          </li>
        ))}
      </ul>

      <hr className="my-5 border-t border-dashed border-[#2a3b5c]" />
      <div className="text-[#6f86ad]"># education</div>
      <h3 className="text-base font-semibold text-white">Bachelor's degree</h3>
      <div>
        <span className="text-accent">Helwan International Technological University (HITU)</span> ·{" "}
        <span className="text-ok">Present</span>
      </div>

      <hr className="my-5 border-t border-dashed border-[#2a3b5c]" />
      <div className="text-[#6f86ad]"># working style</div>
      <ul className="my-2.5 list-none space-y-2 pl-0">
        {[
          "Strong grasp of concurrent and asynchronous programming, event loops and server-side logic.",
          "Self-motivated, quick learner, strong at planning systems across the full stack.",
        ].map((line) => (
          <li key={line} className="relative pl-[22px] before:absolute before:left-1 before:text-ok before:content-['+']">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
