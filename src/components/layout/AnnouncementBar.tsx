import Link from "next/link";
import { Truck, Shield, Headphones, Package, Sparkles, Phone } from "lucide-react";
import { contactInfo } from "@/data/social";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-black via-brand-950 to-black text-white text-center text-sm py-2 px-4">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-bold">
        <Sparkles className="w-3.5 h-3.5 text-brand-300 inline shrink-0" />
        <span>
          Cali Packs <span className="text-brand-300 font-black">£0.20</span> per pack
          · min 50 pcs
        </span>
        <span className="hidden sm:inline text-white/30">·</span>
        <span>
          Free UK delivery over <span className="text-brand-300 font-black">£150</span>
        </span>
        <span className="hidden sm:inline text-white/30">·</span>
        <a
          href={contactInfo.phoneHref}
          className="text-brand-200 underline underline-offset-2 hover:text-brand-100"
        >
          {contactInfo.phone}
        </a>
        <span className="hidden sm:inline text-white/30">·</span>
        <Link href="/shop" className="text-brand-200 underline underline-offset-2 hover:text-white">
          Shop now · 2–3 day delivery
        </Link>
      </p>
    </div>
  );
}

export function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: "2–3 Day Delivery",
      desc: "Fast UK dispatch",
      tint: "from-brand-500 to-brand-700",
    },
    {
      icon: Shield,
      title: "Real Shop Stock",
      desc: "Photos from our shelves",
      tint: "from-black to-surface-800",
    },
    {
      icon: Package,
      title: "£0.20 Per Pack",
      desc: "Minimum 50 pcs",
      tint: "from-brand-600 to-fuchsia-600",
    },
    {
      icon: Headphones,
      title: "Call Us",
      desc: contactInfo.phone,
      tint: "from-brand-500 to-rose-600",
      href: contactInfo.phoneHref,
    },
  ];

  return (
    <section className="relative z-10 -mt-0 px-3 sm:px-4 lg:px-6 pt-3 pb-1">
      <div className="container-site">
        <div className="rounded-2xl border-2 border-brand-300 bg-gradient-to-br from-white via-brand-50 to-white shadow-[0_12px_40px_rgba(236,72,153,0.22)] overflow-hidden trust-pulse">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-brand-100">
            {badges.map((badge) => {
              const Content = (
                <>
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${badge.tint} flex items-center justify-center shadow-lg shadow-brand-200/50`}
                  >
                    <badge.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-sm sm:text-base text-black tracking-tight leading-tight">
                      {badge.title}
                    </p>
                    <p className="text-xs sm:text-sm text-brand-700 mt-0.5 font-bold truncate">
                      {badge.desc}
                    </p>
                  </div>
                </>
              );

              if (badge.href) {
                return (
                  <a
                    key={badge.title}
                    href={badge.href}
                    className="flex items-center gap-3 p-4 sm:p-5 hover:bg-brand-50/80 transition-colors"
                  >
                    {Content}
                    <Phone className="w-4 h-4 text-brand-500 ml-auto hidden sm:block shrink-0" />
                  </a>
                );
              }

              return (
                <div key={badge.title} className="flex items-center gap-3 p-4 sm:p-5">
                  {Content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
