import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { PROFILE } from "../data";
import { useWindowManager } from "../state/WindowManagerContext";
import type { AppId } from "../types";

interface Line {
  id: number;
  content: ReactNode;
}

const OPEN_MAP: Record<string, AppId> = {
  about: "about",
  "about-me": "about",
  "about-me.txt": "about",
  experience: "experience",
  "experience.log": "experience",
  tech: "tech",
  "tech-stack": "tech",
  "tech-stack.sys": "tech",
  projects: "projects",
  cv: "cv",
  "cv.pdf": "cv",
};

export default function ContactTerminalApp() {
  const { openWindow } = useWindowManager();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const print = (content: ReactNode) => {
    idRef.current += 1;
    setLines((prev) => [...prev, { id: idRef.current, content }]);
  };

  const links = {
    email: (
      <a href={`mailto:${PROFILE.email}`} className="text-accent underline">
        {PROFILE.email}
      </a>
    ),
    github: (
      <a href={PROFILE.github} target="_blank" rel="noopener" className="text-accent underline">
        {PROFILE.github}
      </a>
    ),
    phone: (
      <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="text-accent underline">
        {PROFILE.phone}
      </a>
    ),
  };

  // Boot message, once.
  useEffect(() => {
    print(
      <>
        <span className="text-ok">meroOS contact shell</span>
        <br />
        Type <b>help</b> to see what you can do, or just run <b>contact</b>.
      </>
    );
    print(
      <>
        Email &nbsp;&nbsp;{links.email}
        <br />
        GitHub &nbsp;{links.github}
        <br />
        Phone &nbsp;&nbsp;{links.phone}
        <br />
        Based in {PROFILE.city}. Open to freelance work and full-time roles.
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function runCommand(raw: string) {
    const trimmed = raw.trim();
    if (trimmed) {
      print(
        <div className="flex gap-2">
          <span className="text-ok">guest@mero:~$</span>
          <span>{trimmed}</span>
        </div>
      );
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(history.length + 1);
    }
    if (!trimmed) return;

    const [cmdRaw, ...rest] = trimmed.split(/\s+/);
    const cmd = cmdRaw.toLowerCase();
    const arg = rest.join(" ");

    switch (cmd) {
      case "help":
        print(
          <>
            Commands:
            <br />
            &nbsp;&nbsp;contact&nbsp;&nbsp;&nbsp;&nbsp;how to reach me
            <br />
            &nbsp;&nbsp;whoami&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;short intro
            <br />
            &nbsp;&nbsp;ls&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list files
            <br />
            &nbsp;&nbsp;open &lt;name&gt; open a file (try: open about)
            <br />
            &nbsp;&nbsp;cv&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;open my CV
            <br />
            &nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clear the screen
          </>
        );
        break;
      case "whoami":
        print(
          <>
            {PROFILE.name}: {PROFILE.role}, {PROFILE.city}.
            <br />
            Node.js, Go, React and a soft spot for distributed systems.
          </>
        );
        break;
      case "contact":
        print(
          <>
            Email &nbsp;&nbsp;{links.email}
            <br />
            GitHub &nbsp;{links.github}
            <br />
            Phone &nbsp;&nbsp;{links.phone}
            <br />
            Based in {PROFILE.city}. Open to freelance work and full-time roles.
          </>
        );
        break;
      case "email":
        print(links.email);
        break;
      case "github":
        print(links.github);
        break;
      case "ls":
        print("about-me.txt  experience.log  tech-stack.sys  Projects/  contact.sh  CV.pdf");
        break;
      case "cv":
        print("Opening CV…");
        openWindow("cv");
        break;
      case "clear":
        setLines([]);
        break;
      case "open": {
        const key = arg.toLowerCase().replace(/\/$/, "");
        const id = OPEN_MAP[key];
        if (!id) {
          print(`open: '${arg}' not found. Try 'ls'.`);
        } else {
          print(`Opening ${arg}…`);
          openWindow(id);
        }
        break;
      }
      case "sudo":
        print("Nice try. Permission denied, but I do like the confidence.");
        break;
      default:
        print(`${cmd}: command not found. Type 'help'.`);
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        const idx = historyIndex - 1;
        setHistoryIndex(idx);
        setValue(history[idx] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < history.length) {
        const idx = historyIndex + 1;
        setHistoryIndex(idx);
        setValue(history[idx] ?? "");
      }
    } else if (e.key === "Enter") {
      const cmd = value;
      setValue("");
      runCommand(cmd);
    }
  };

  return (
    <div
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
      className="h-full cursor-text overflow-auto bg-[#0a0f1a] px-4 py-3.5 font-mono text-[13px] leading-relaxed text-[#d7e4ff]"
    >
      {lines.map((line) => (
        <div key={line.id} className="whitespace-pre-wrap break-words">
          {line.content}
        </div>
      ))}
      <div className="flex gap-2">
        <span className="text-ok">guest@mero:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
          className="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-[13px] text-[#d7e4ff] outline-none"
        />
      </div>
    </div>
  );
}
