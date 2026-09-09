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
  sm: { box: 42, text: "text-[1.32rem]", tagline: "text-[8px]", gap: "gap-2.5" },
  md: { box: 52, text: "text-[1.7rem]", tagline: "text-[10px]", gap: "gap-3" },
  lg: { box: 62, text: "text-[2.1rem]", tagline: "text-xs", gap: "gap-3.5" },
};

export function Logo({
  variant = "default",
  size = "md",
  showTagline = true,
  className,
}: LogoProps) {
  const s = sizes[size];
  const isLight = variant === "light";
  const uid = useId().replace(/:/g, "");
  const face = `sc-face-${uid}`;
  const ink = `sc-ink-${uid}`;

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <svg
        viewBox="0 0 80 80"
        width={s.box}
        height={s.box}
        className="flex-shrink-0"
        aria-hidden
      >
        <defs>
          <linearGradient id={face} x1="16%" y1="6%" x2="88%" y2="96%">
            <stop offset="0%" stopColor={isLight ? "#334155" : "#1f2937"} />
            <stop offset="52%" stopColor={isLight ? "#0f172a" : "#111827"} />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>
          <linearGradient id={ink} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="45%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#9d174d" />
          </linearGradient>
        </defs>

        <polygon
          points="40,5 68,20.5 68,53.5 40,69 12,53.5 12,20.5"
          fill={`url(#${face})`}
          stroke={`url(#${ink})`}
          strokeWidth="2.6"
          strokeLinejoin="round"
        />

        {/* Smoke-formed S */}
        <path
          d="M49 24.5c-2.2-2.4-5.6-3.6-9.6-3.6-6.6 0-11.2 3.4-11.2 8.2 0 4.6 3.4 6.8 9.4 8.4 4.2 1.1 6.2 2.2 6.2 4.6 0 2.4-2.4 3.8-6 3.8-3.2 0-5.8-1.1-7.4-3"
          fill="none"
          stroke={`url(#${ink})`}
          strokeWidth="4.4"
          strokeLinecap="round"
        />
        {/* Rising wisp off the S */}
        <path
          d="M50.5 22c3.2-3.6 2.2-7.4-1.2-9.2"
          fill="none"
          stroke="#f9a8d4"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        {/* Smoke-formed C */}
        <path
          d="M56 41.5c-1.2-5.8-6.2-9.4-12.4-9.4-7.4 0-12.8 5.2-12.8 13.2S36.2 59 43.6 59c6.2 0 10.8-3.2 12.2-8.4"
          fill="none"
          stroke="#fce7f3"
          strokeWidth="4.4"
          strokeLinecap="round"
        />
      </svg>

      <div className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-[-0.045em]",
            s.text,
            isLight ? "text-white" : "text-slate-950"
          )}
        >
          Smoke
          <span className="bg-gradient-to-r from-brand-500 to-fuchsia-600 bg-clip-text text-transparent">
            Cali
          </span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1 font-semibold uppercase tracking-[0.24em]",
              s.tagline,
              isLight ? "text-white/70" : "text-slate-500"
            )}
          >
            {SITE_TAGLINE}
          </span>
        )}
      </div>
    </div>
  );
}
