import Image from "next/image";
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
      <div
        className="logo-motion relative flex-shrink-0 rounded-[34%] bg-gradient-to-br from-brand-200 via-brand-500 to-fuchsia-400 p-[2px] shadow-[0_0_26px_rgba(236,72,153,0.48)]"
        style={{ width: s.box, height: s.box }}
      >
        <div className="smoke-logo-blink relative h-full w-full overflow-hidden rounded-[32%] bg-black">
          <Image
            src="/cali-smoke-logo.png"
            alt=""
            fill
            sizes={`${s.box}px`}
            className="logo-breathe object-cover scale-110 transition-transform duration-500 group-hover:scale-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-[shine-sweep_2.8s_ease-in-out_infinite]" />
        </div>
        <span className="logo-orbit-dot absolute -right-1 -top-1 h-3 w-3 rounded-full bg-white shadow-[0_0_12px_4px_rgba(244,114,182,0.85)]" />
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
            Smoke
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
            Manchester Smoke Shop
          </span>
        )}
      </div>
    </div>
  );
}
