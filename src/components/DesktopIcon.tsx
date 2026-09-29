import { useState } from "react";
import type { IconName } from "../types";
import { Icon } from "../icons";
import { useIsCoarsePointer } from "../hooks/useMediaQuery";

interface Props {
  label: string;
  icon: IconName;
  onOpen: () => void;
  /** Dark icon tone for use inside light window bodies (e.g. the Projects folder). */
  dark?: boolean;
}

export default function DesktopIcon({ label, icon, onOpen, dark = false }: Props) {
  const [selected, setSelected] = useState(false);
  const isCoarse = useIsCoarsePointer();

  const handleClick = () => {
    setSelected(true);
    if (isCoarse) onOpen();
  };

  return (
    <button
      type="button"
      role="listitem"
      aria-label={label}
      onClick={handleClick}
      onDoubleClick={onOpen}
      onBlur={() => setSelected(false)}
      className={[
        "flex h-[104px] w-[100px] flex-col items-center gap-1.5 rounded-lg border border-transparent px-1 py-2 text-center",
        dark
          ? `text-ink2 ${selected ? "border-accent/60 bg-accent/25" : "hover:bg-ink/[0.06]"}`
          : `text-[#eaf0fb] ${selected ? "border-accent/60 bg-accent/[0.16]" : "hover:bg-white/[0.07]"}`,
      ].join(" ")}
    >
      <span className="h-[46px] w-[46px] flex-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]">
        <Icon name={icon} />
      </span>
      <span
        className={[
          "font-mono text-[11.5px] leading-tight [word-break:break-word]",
          dark ? "" : "[text-shadow:0_1px_3px_rgba(0,0,0,0.7)]",
        ].join(" ")}
      >
        {label}
      </span>
    </button>
  );
}
