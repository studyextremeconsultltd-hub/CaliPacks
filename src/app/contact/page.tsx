"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { contactInfo, socialLinks } from "@/data/social";
import { PageHero } from "@/components/layout/PageHero";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.5 8.5V7.2c0-.5.3-.7.8-.7h1.2V4h-1.8c-2 0-2.7 1.2-2.7 2.9v1.6H9.5V11h1.5v7h2.5v-7h1.8l.3-2.5h-2.1z"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="#fff"
        d="M17.5 14.3c-.2-.1-1.3-.7-1.5-.7s-.4-.1-.5.1-.6.7-.7.9-.3.2-.5.1a6 6 0 01-1.8-1.1 6.6 6.6 0 01-1.2-1.5c-.1-.2 0-.4.1-.5l.4-.4.2-.4c.1-.1 0-.3 0-.4s-.5-1.3-.7-1.7-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a2 2 0 00-.6 1.5 3.5 3.5 0 00.7 1.8 8 8 0 003.1 2.8c1.1.5 1.5.5 2 .5a2.3 2.3 0 001.4-.6 1.9 1.9 0 00.4-1.3c0-.1-.1-.2-.3-.3zM12 4.2a7.8 7.8 0 00-6.6 11.9L4.5 19.5l3.5-.9A7.8 7.8 0 1012 4.2zm0 14.2a6.4 6.4 0 01-3.3-.9l-.2-.1-2.1.5.5-2-.1-.2a6.4 6.4 0 115.2 2.7z"
      />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#010101" />
      <path fill="#fff" d="M15.4 7.2a3.4 3.4 0 01-1.9-1.7h-1.5v8.2a1.8 1.8 0 11-1.3-1.7v-1.6a3.4 3.4 0 103.2 3.3V9.4a5 5 0 001.5.3V8.2a3.3 3.3 0 01-1.5-.3v-.7z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#FF0000" />
      <path fill="#fff" d="M10 8.8l5.2 3.2L10 15.2V8.8z" />
    </svg>
  );
}

const socialCards = [
  { ...socialLinks.facebook, icon: FacebookIcon },
  { ...socialLinks.whatsapp, icon: WhatsAppIcon },
  { ...socialLinks.tiktok, icon: TikTokIcon },
  { ...socialLinks.youtube, icon: YouTubeIcon },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="We are here to help"
        title="Contact"
        accent="Smoke Cali"
        description="Questions about stock, wholesale, delivery or an order? Call, message or visit our Manchester shop."
        images={[
          "/cali-smoke-storefront.jpg",
          "/products/pack-045.jpg",
          "/products/pack-088.jpg",
        ]}
      />
      <div className="bg-gradient-to-b from-white via-brand-50/40 to-white py-10 md:py-14">
        <div className="container-site">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-surface-950 tracking-tight mb-3">
            How can we <span className="text-gradient-pink">help?</span>
          </h2>
          <p className="text-surface-800/60 font-medium text-sm md:text-base">
            Stock, wholesale or order questions? Call or message — Mon–Fri.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12 items-stretch">
          <aside className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-brand-950 via-brand-800 to-fuchsia-700 p-5 shadow-[0_22px_60px_rgba(190,24,93,0.3)] sm:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-brand-300/15 blur-2xl" />

            <div className="relative mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-brand-100">
                <span className="h-2 w-2 rounded-full bg-brand-300 shadow-[0_0_10px_rgba(249,168,212,0.9)]" />
                Contact information
              </span>
              <h2 className="mt-4 font-display text-3xl font-black text-white sm:text-4xl">
                Let&apos;s talk
              </h2>
              <p className="mt-2 max-w-md text-sm font-semibold leading-relaxed text-white/70">
                Call, email or visit us during opening hours. Our Manchester
                team is ready to help with products, stock and orders.
              </p>
            </div>

            <div className="relative space-y-3">
            {[
              {
                icon: Phone,
                label: "Phone",
                value: contactInfo.phone,
                href: contactInfo.phoneHref,
              },
              {
                icon: Mail,
                label: "Email",
                value: contactInfo.email,
                href: `mailto:${contactInfo.email}`,
              },
              {
                icon: MapPin,
                label: "Address",
                value: contactInfo.address,
                href: contactInfo.mapLink,
              },
              { icon: Clock, label: "Hours", value: "Mon–Fri, 9am–5pm GMT", href: undefined },
            ].map((item) => (
              <div
                key={item.label}
                className="group flex items-start gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 shadow-[0_8px_22px_rgba(0,0,0,0.18)]">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-brand-200">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block break-words text-sm font-extrabold leading-relaxed text-white transition hover:text-brand-200 sm:text-base"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-extrabold leading-relaxed text-white sm:text-base">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="relative mt-5 flex items-center gap-2.5 border-t border-white/15 pt-5">
              <span className="mr-1 text-xs font-black uppercase tracking-wider text-white/60">
                Follow
              </span>
              {socialCards.map((card) => (
                <a
                  key={card.label}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={card.label}
                  title={card.handle}
                  className="h-9 w-9 overflow-hidden rounded-full shadow-lg transition-transform hover:scale-110"
                >
                  <card.icon className="h-9 w-9" />
                </a>
              ))}
            </div>
            </div>
          </aside>

          <form
            className="relative bg-white rounded-2xl border-2 border-brand-200 p-5 md:p-7 space-y-3.5 overflow-hidden shadow-xl shadow-brand-100/50"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="absolute top-0 left-0 w-16 h-16 bg-brand-500/25 rounded-br-[2rem]" />
            <div className="absolute top-0 right-0 w-14 h-14 bg-fuchsia-400/20 rounded-bl-[2rem]" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-rose-400/20 rounded-tl-[2rem]" />

            <h2 className="font-extrabold text-lg relative text-surface-950">Send a message</h2>
            <div className="grid sm:grid-cols-2 gap-3 relative">
              <div>
                <label htmlFor="name" className="block text-xs font-bold mb-1 text-surface-800/70">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none text-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold mb-1 text-surface-800/70">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none text-sm"
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="phone" className="block text-xs font-bold mb-1 text-surface-800/70">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder={contactInfo.phone}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none text-sm"
              />
            </div>
            <div className="relative">
              <label htmlFor="subject" className="block text-xs font-bold mb-1 text-surface-800/70">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none text-sm"
              />
            </div>
            <div className="relative">
              <label htmlFor="message" className="block text-xs font-bold mb-1 text-surface-800/70">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:outline-none text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              className="relative w-full py-3 bg-brand-600 text-white font-extrabold rounded-xl hover:bg-brand-500 transition-colors shadow-md shadow-brand-200"
            >
              Send Message
            </button>
          </form>
        </div>
        </div>
      </div>
    </>
  );
}
