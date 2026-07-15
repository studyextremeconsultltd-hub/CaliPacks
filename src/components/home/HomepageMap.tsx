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
            <span className="text-gradient-pink shine-text">Manchester</span>
          </h2>
          <p className="text-sm md:text-base text-black/55 font-semibold mt-2 max-w-lg mx-auto">
            Live map of Manchester, United Kingdom — tap to open directions.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border-[3px] border-brand-400 shadow-[0_0_50px_rgba(236,72,153,0.35)] map-glow">
          <div className="absolute inset-0 pointer-events-none z-10 ring-1 ring-inset ring-white/20 rounded-3xl" />
          <div className="bg-gradient-to-r from-black via-brand-900 to-black px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 relative z-20">
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
          <iframe
            title="Cali Packs — Manchester location"
            src={contactInfo.mapEmbedUrl}
            className="w-full h-[280px] sm:h-[360px] lg:h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
