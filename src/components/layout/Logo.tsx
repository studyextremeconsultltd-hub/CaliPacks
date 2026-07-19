import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

const sizes = {
  sm: { box: 40, text: "text-[1.35rem]", tagline: "text-[8px]", gap: "gap-2.5" },
  md: { box: 52, text: "text-[1.75rem]", tagline: "text-[10px]", gap: "gap-3" },
  lg: { box: 64, text: "text-[2.15rem]", tagline: "text-xs", gap: "gap-3.5" },
};

/**
 * AutoMexa-inspired emblem for Cali Smoke:
 * geometric hex mark + bold CS + pink glow (static, no rotation).
 * Ref: https://automexa.co.uk/
 */
export function Logo({
  variant = "default",
  size = "md",
  showTagline = true,
  className,
}: LogoProps) {
  const s = sizes[size];
  const isLight = variant === "light";
  const face = isLight ? "#0f172a" : "#fdf2f8";
  const ink = isLight ? "#ffffff" : "#111827";
  const accent = "#ec4899";
  const accentHi = "#f9a8d4";

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      <div
        className="logo-automexa-stage relative flex-shrink-0"
        style={{ width: s.box, height: s.box }}
        aria-hidden
      >
        <div className="logo-automexa-glow absolute inset-[-22%] rounded-full" />
        <div className="relative h-full w-full">
          <svg viewBox="0 0 80 80" className="logo-automexa-mark h-full w-full">
            <defs>
              <linearGradient id="csHexFace" x1="18%" y1="8%" x2="86%" y2="94%">
                <stop offset="0%" stopColor={isLight ? "#1e293b" : "#1f2937"} />
                <stop offset="45%" stopColor={ink} />
                <stop offset="100%" stopColor={isLight ? "#0f172a" : "#030712"} />
              </linearGradient>
              <linearGradient id="csAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={accentHi} />
                <stop offset="55%" stopColor={accent} />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>
              <filter id="csInnerGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="1.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <polygon
              points="40,5 68,21 68,53 40,69 12,53 12,21"
              fill="url(#csHexFace)"
              stroke={accent}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            <polyline
              points="40,69 68,53 68,30"
              fill="none"
              stroke="url(#csAccent)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle cx="40" cy="42" r="10.5" fill={accent} opacity="0.95" filter="url(#csInnerGlow)" />
            <circle cx="40" cy="42" r="5.2" fill={face} opacity="0.95" />

            <line
              x1="20"
              y1="48"
              x2="34"
              y2="34"
              stroke={face}
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.9"
            />

            <g fill="none" stroke={face} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M31 28.5c-6.2 0-10.4 4.4-10.4 11.5S24.8 51.5 31 51.5c2.9 0 5.3-1 7-2.7" />
              <path d="M51.2 31.2c-1.1-1.7-3.1-2.8-5.7-2.8-3.5 0-5.8 1.8-5.8 4.4 0 6.8 12.2 3.2 12.2 10.4 0 3.5-3 5.9-7.3 5.9-3.2 0-5.8-1.2-7.2-3.3" />
            </g>
          </svg>
        </div>
      </div>

      <div className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-display font-extrabold tracking-[-0.045em]",
            s.text,
            isLight ? "text-white" : "text-slate-950"
          )}
        >
          Cali
          <span className="bg-gradient-to-r from-brand-500 via-brand-400 to-fuchsia-500 bg-clip-text text-transparent">
            Smoke
          </span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1.5 font-semibold uppercase tracking-[0.28em]",
              s.tagline,
              isLight ? "text-brand-100/80" : "text-slate-500"
            )}
          >
            Manchester Smoke Shop
          </span>
        )}
      </div>
    </div>
  );
}
