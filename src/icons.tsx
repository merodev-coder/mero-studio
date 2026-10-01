import type { ReactElement } from "react";
import type { IconName } from "./types";

export function DocIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <path d="M10 4h20l10 10v30H10z" fill="#f4f7fb" />
      <path d="M30 4v10h10z" fill="#c3cbd8" />
      <g stroke="#5b6b86" strokeWidth="2.4" strokeLinecap="round">
        <path d="M16 22h16M16 28h16M16 34h10" />
      </g>
    </svg>
  );
}

export function LogIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <rect x="6" y="8" width="36" height="32" rx="4" fill="#0e1626" stroke="#3a4d73" strokeWidth="2" />
      <path d="M13 19l6 5-6 5" fill="none" stroke="#38d996" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 30h11" stroke="#ffb347" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function SysIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <rect x="12" y="12" width="24" height="24" rx="4" fill="#1b2846" stroke="#7aa2ff" strokeWidth="2.4" />
      <rect x="19" y="19" width="10" height="10" rx="2" fill="#ffb347" />
      <g stroke="#7aa2ff" strokeWidth="2.4" strokeLinecap="round">
        <path d="M18 6v6M24 6v6M30 6v6M18 36v6M24 36v6M30 36v6M6 18h6M6 24h6M6 30h6M36 18h6M36 24h6M36 30h6" />
      </g>
    </svg>
  );
}

export function FolderIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <path d="M4 12a4 4 0 014-4h11l5 5h16a4 4 0 014 4v21a4 4 0 01-4 4H8a4 4 0 01-4-4z" fill="#e7b14b" />
      <path d="M4 19h40v17a4 4 0 01-4 4H8a4 4 0 01-4-4z" fill="#ffc861" />
    </svg>
  );
}

export function ProjIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <path d="M10 4h20l10 10v30H10z" fill="#e9e4ff" />
      <path d="M30 4v10h10z" fill="#b7abf0" />
      <g fill="none" stroke="#4c3a9c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 24l-5 5 5 5M28 24l5 5-5 5" />
      </g>
    </svg>
  );
}

export function LiveIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <rect x="5" y="9" width="38" height="30" rx="4" fill="#e6fbf2" stroke="#1d8c5f" strokeWidth="2" />
      <path d="M5 17h38" stroke="#1d8c5f" strokeWidth="2" />
      <circle cx="11" cy="13" r="1.6" fill="#1d8c5f" />
      <circle cx="16" cy="13" r="1.6" fill="#1d8c5f" />
      <circle cx="29" cy="28" r="7" fill="none" stroke="#1d8c5f" strokeWidth="2.4" />
      <path d="M22 28h14M29 21c-3 3-3 11 0 14M29 21c3 3 3 11 0 14" fill="none" stroke="#1d8c5f" strokeWidth="1.8" />
    </svg>
  );
}

export function TermIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <rect x="5" y="8" width="38" height="32" rx="5" fill="#0a0f1a" stroke="#ffb347" strokeWidth="2" />
      <path d="M12 19l7 5-7 5" fill="none" stroke="#ffb347" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 31h12" stroke="#d7e4ff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PdfIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <path d="M10 4h20l10 10v30H10z" fill="#fff" />
      <path d="M30 4v10h10z" fill="#ffc2bb" />
      <rect x="6" y="24" width="26" height="13" rx="3" fill="#e5483a" />
      <text x="19" y="34" fontSize="9" fontWeight="700" fontFamily="sans-serif" fill="#fff" textAnchor="middle">
        PDF
      </text>
    </svg>
  );
}

export function GameIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <rect x="5" y="8" width="38" height="32" rx="5" fill="#0a1a12" stroke="#38d996" strokeWidth="2" />
      <path d="M12 32h10v-8h8v-8" fill="none" stroke="#38d996" strokeWidth="4" strokeLinecap="square" />
      <rect x="32" y="29" width="5" height="5" fill="#ffb347" />
    </svg>
  );
}

const ICONS: Record<IconName, () => ReactElement> = {
  doc: DocIcon,
  log: LogIcon,
  sys: SysIcon,
  folder: FolderIcon,
  proj: ProjIcon,
  live: LiveIcon,
  term: TermIcon,
  pdf: PdfIcon,
  game: GameIcon,
};

export function Icon({ name }: { name: IconName }) {
  const Cmp = ICONS[name];
  return <Cmp />;
}

export function MinGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3">
      <path d="M2 9h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
export function MaxGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3">
      <rect x="2" y="2" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
export function CloseGlyph() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3">
      <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
