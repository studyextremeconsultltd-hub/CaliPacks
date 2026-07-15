import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

const sizes = {
  sm: { box: 42, text: "text-xl", tagline: "text-[9px]" },
  md: { box: 52, text: "text-2xl", tagline: "text-[10px]" },
  lg: { box: 62, text: "text-3xl", tagline: "text-xs" },
};

export function Logo({
  variant = "default",
  size = "md",
  showTagline = true,
  className,
}: LogoProps) {
  const s = sizes[size];
  const isLight = variant === "light";

  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      {/* Catchy hex pack mark */}
      <div
        className="relative flex-shrink-0 logo-pulse"
        style={{ width: s.box, height: s.box }}
      >
        <div className="absolute inset-0 rounded-[30%] bg-gradient-to-br from-brand-300 via-brand-500 to-brand-700 rotate-6 group-hover:rotate-12 transition-transform duration-500" />
        <div className="absolute inset-[3px] rounded-[28%] bg-white flex items-center justify-center overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 via-white to-brand-50" />
          <svg viewBox="0 0 64 64" className="relative w-[78%] h-[78%] drop-shadow-sm" aria-hidden="true">
            <defs>
              <linearGradient id="logoShine" x1="0" y1="0" x2="64" y2="64">
                <stop offset="0%" stopColor="#f9a8d4" />
                <stop offset="40%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>
            </defs>
            {/* Pack body */}
            <path
              d="M18 14h28l-3 36H21L18 14z"
              fill="url(#logoShine)"
              opacity="0.95"
            />
            <path
              d="M24 14V10a8 8 0 0116 0v4"
              stroke="#be185d"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="26" y="26" width="12" height="12" rx="2" fill="white" opacity="0.9" />
            <text
              x="32"
              y="35"
              textAnchor="middle"
              fontSize="8"
              fontWeight="900"
              fill="#db2777"
              fontFamily="system-ui,sans-serif"
            >
              CP
            </text>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shine-sweep_2.8s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-black tracking-tight",
            s.text,
            isLight ? "text-white" : "text-black"
          )}
        >
          Cali{" "}
          <span
            className={cn(
              "text-gradient-pink shine-text",
              isLight && "drop-shadow-[0_0_12px_rgba(249,168,212,0.55)]"
            )}
          >
            Packs
          </span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "uppercase tracking-[0.24em] font-bold mt-1",
              s.tagline,
              isLight ? "text-brand-200" : "text-brand-600"
            )}
          >
            UK Best Sellers
          </span>
        )}
      </div>
    </div>
  );
}
