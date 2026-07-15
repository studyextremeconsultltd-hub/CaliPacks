"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { contactInfo, socialLinks } from "@/data/social";

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
    <div className="py-10 md:py-14 bg-gradient-to-b from-white via-brand-50/40 to-white">
      <div className="container-site">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-surface-950 tracking-tight mb-3 shine-text">
            Contact <span className="text-gradient-pink">Us</span>
          </h1>
          <p className="text-surface-800/60 font-medium text-sm md:text-base">
            Stock, wholesale or order questions? Call or message — Mon–Fri.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <div className="space-y-4">
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
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-brand-100 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 ring-1 ring-brand-100">
                  <item.icon className="w-4.5 h-4.5 text-brand-700 w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-500">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-extrabold text-surface-950 hover:text-brand-600 text-sm sm:text-base"
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-extrabold text-surface-950 text-sm sm:text-base">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2.5 pt-2">
              {socialCards.map((card) => (
                <a
                  key={card.label}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={card.label}
                  title={card.handle}
                  className="w-8 h-8 rounded-full overflow-hidden shadow-md hover:scale-110 transition-transform"
                >
                  <card.icon className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>

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
  );
}
