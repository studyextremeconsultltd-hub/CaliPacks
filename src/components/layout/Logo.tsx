import { useId } from "react";
import { SITE_TAGLINE } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

const sizes = {
  sm: { box: 44, text: "text-[1.35rem]", tagline: "text-[7px]", gap: "gap-2.5" },
  md: { box: 58, text: "text-[1.78rem]", tagline: "text-[9px]", gap: "gap-3" },
  lg: { box: 70, text: "text-[2.15rem]", tagline: "text-[10px]", gap: "gap-3.5" },
};

function LogoMark({ id, size }: { id: string; size: number }) {
  const rim = `sc-rim-${id}`;
  const smoke = `sc-smoke-${id}`;
  const glass = `sc-glass-${id}`;
  const shine = `sc-shine-${id}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="flex-shrink-0 drop-shadow-[0_8px_18px_rgba(236,72,153,0.28)]"
      aria-hidden
    >
      <defs>
        <linearGradient id={rim} x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="38%" stopColor="#f472b6" />
          <stop offset="72%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#9d174d" />
        </linearGradient>
        <linearGradient id={smoke} x1="20%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#fff1f7" />
          <stop offset="28%" stopColor="#f9a8d4" />
          <stop offset="62%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
        <radialGradient id={glass} cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#3f3f46" />
          <stop offset="55%" stopColor="#111113" />
          <stop offset="100%" stopColor="#050506" />
        </radialGradient>
        <radialGradient id={shine} cx="32%" cy="24%" r="42%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <polygon
        points="50,6 88,28 88,72 50,94 12,72 12,28"
        fill={`url(#${glass})`}
        stroke={`url(#${rim})`}
        strokeWidth="4.2"
        strokeLinejoin="round"
      />
      <polygon
        points="50,14 80,32 80,68 50,86 20,68 20,32"
        fill="none"
        stroke="#fbcfe8"
        strokeWidth="1.15"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <polygon
        points="50,6 88,28 88,72 50,94 12,72 12,28"
        fill={`url(#${shine})`}
      />

      {/* Silk smoke S */}
      <path
        d="M64 27c-8.5-8-24-9.5-30 1.5-5 9 6.5 13.5 16 16.5 11 3.5 18 10 14.5 19.5-4 10.5-20 13-28 4"
        fill="none"
        stroke={`url(#${smoke})`}
        strokeWidth="7.2"
        strokeLinecap="round"
      />
      {/* Silk smoke C wrapping the S */}
      <path
        d="M69 36c5.5 8 4 24-10 31-12 6-24 1-26-9"
        fill="none"
        stroke={`url(#${smoke})`}
        strokeWidth="6.6"
        strokeLinecap="round"
      />
      {/* Fine wisps */}
      <path
        d="M66 24c6-6 5-13-2-12"
        fill="none"
        stroke="#fce7f3"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M30 72c-5-3-9 2-5 6"
        fill="none"
        stroke="#f9a8d4"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  variant = "default",
  size = "md",
  showTagline = true,
  className,
}: LogoProps) {
  const s = sizes[size];
  const isLight = variant === "light";
  const uid = useId().replace(/:/g, "");

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <LogoMark id={uid} size={s.box} />

      <div className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-sans font-extrabold tracking-[-0.04em]",
            s.text,
            isLight ? "text-white" : "text-neutral-900"
          )}
        >
          Smoke
          <span className="bg-gradient-to-r from-pink-400 via-brand-500 to-fuchsia-600 bg-clip-text text-transparent">
            Cali
          </span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1.5 font-semibold uppercase tracking-[0.28em]",
              s.tagline,
              isLight ? "text-white/65" : "text-neutral-400"
            )}
          >
            {SITE_TAGLINE}
          </span>
        )}
      </div>
    </div>
  );
}
