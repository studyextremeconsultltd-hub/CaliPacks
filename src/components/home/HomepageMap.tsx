import { MapPin } from "lucide-react";
import { contactInfo } from "@/data/social";

export function HomepageMap() {
  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-white via-brand-50/80 to-white">
      <div className="container-site">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-brand-200 text-xs font-extrabold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            Visit Us
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-black text-black tracking-tight">
            Find us in{" "}
            <span className="text-gradient-pink">Manchester</span>
          </h2>
          <p className="text-sm md:text-base text-black/55 font-semibold mt-2 max-w-lg mx-auto">
            Visit Smoke Cali at 5 Sagar Street, M8 8EU — tap to open directions.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border-[3px] border-brand-400 shadow-[0_0_50px_rgba(236,72,153,0.35)]">
          <div className="bg-gradient-to-r from-black via-brand-900 to-black px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base sm:text-lg font-black text-white">
                {contactInfo.address}
              </p>
              <a
                href={contactInfo.phoneHref}
                className="text-sm font-bold text-brand-300 hover:text-brand-200"
              >
                {contactInfo.phone}
              </a>
            </div>
            <a
              href={contactInfo.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-black uppercase tracking-wide hover:bg-brand-100 transition-colors shadow-lg"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              Open in Google Maps
            </a>
          </div>
          <a
            href={contactInfo.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[168px] sm:min-h-[200px] flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_40%,rgba(236,72,153,0.22),transparent_46%),linear-gradient(180deg,#111827_0%,#1f2937_100%)] px-6 py-8 text-center"
          >
            <MapPin className="h-8 w-8 text-brand-300" />
            <p className="text-sm font-black text-white">5 Sagar Street · M8 8EU</p>
            <p className="text-xs font-semibold text-white/65">
              Opens Google Maps — no map widgets are loaded on this page.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
