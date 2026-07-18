import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  images: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  images,
  ctaLabel,
  ctaHref,
}: PageHeroProps) {
  const showcase = images.slice(0, 3);

  return (
    <section className="bg-gradient-to-b from-brand-50/80 to-white py-4 sm:py-7">
      <div className="container-site">
        <div className="grid overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-950 via-brand-900 to-fuchsia-800 shadow-[0_22px_65px_rgba(190,24,93,0.24)] lg:min-h-[330px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center px-6 py-9 sm:px-9 lg:px-12">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-brand-100 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5 text-brand-300" />
              {eyebrow}
            </div>
            <h1 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              {title}{" "}
              <span className="bg-gradient-to-r from-brand-200 via-brand-300 to-white bg-clip-text text-transparent">
                {accent}
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-sm font-semibold leading-relaxed text-white/75 sm:text-base">
              {description}
            </p>
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-brand-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-50"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="grid h-52 grid-cols-2 gap-2 p-3 sm:h-64 sm:gap-3 sm:p-4 lg:h-auto">
            {showcase.map((src, index) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-2xl bg-brand-100 ${
                  index === 0 ? "row-span-2" : ""
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  quality={75}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/25 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
