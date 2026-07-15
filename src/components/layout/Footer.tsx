import Image from "next/image";
import Link from "next/link";
import { footerLinks, footerNav } from "@/data/navigation";
import { Logo } from "@/components/layout/Logo";
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
      <path
        fill="#25F4EE"
        d="M15.4 7.2a3.4 3.4 0 01-1.9-1.7h-1.5v8.2a1.8 1.8 0 11-1.3-1.7v-1.6a3.4 3.4 0 103.2 3.3V9.4a5 5 0 001.5.3V8.2a3.3 3.3 0 01-1.5-.3v-.7z"
      />
      <path
        fill="#FE2C55"
        d="M16.9 8.2v1.5a5 5 0 01-1.5-.3 3.4 3.4 0 01-1.9-1.7h1.5a3.3 3.3 0 001.9 1.5z"
      />
      <path
        fill="#fff"
        d="M14 7.2a3.4 3.4 0 01-1.9-1.7h-.2v8.3a1.8 1.8 0 11-1.3-1.7V10a3.4 3.4 0 103.4 3.4V7.2H14z"
      />
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

const socialItems = [
  { ...socialLinks.facebook, icon: FacebookIcon },
  { ...socialLinks.whatsapp, icon: WhatsAppIcon },
  { ...socialLinks.tiktok, icon: TikTokIcon },
  { ...socialLinks.youtube, icon: YouTubeIcon },
];

const footerBgImages = [
  "/products/cali-01.jpg",
  "/products/cali-06.jpg",
  "/products/cali-10.jpg",
  "/products/cali-14.jpg",
  "/products/cali-18.jpg",
  "/products/cali-22.jpg",
  "/products/cali-03.jpg",
  "/products/cali-08.jpg",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white border-t-4 border-brand-500 footer-glow">
      {/* Moving product images background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.22]" aria-hidden="true">
        <div className="absolute inset-y-0 left-0 flex w-max footer-marquee">
          {[...footerBgImages, ...footerBgImages].map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative w-40 h-full sm:w-52 md:w-60 shrink-0 mx-1"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="240px"
                quality={75}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/50 via-transparent to-brand-900/40" />
      </div>

      <div className="container-site py-12 relative z-10">
        <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mb-10 pb-7 border-b border-brand-500/30">
          {footerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-extrabold uppercase tracking-wider text-brand-200 hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(236,72,153,0.45)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Logo variant="light" size="lg" />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-5 font-medium">
              Cali Packs — UK best sellers. Shop online. Delivery in 2–3 days.
            </p>
            <div className="flex gap-2.5">
              {socialItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-full overflow-hidden shadow-[0_0_12px_rgba(236,72,153,0.35)] hover:scale-110 transition-transform"
                >
                  <item.icon className="w-9 h-9" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-300 mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-brand-200 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-300 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-brand-200 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-brand-300 mb-4">
              Contact
            </h3>
            <a
              href={contactInfo.phoneHref}
              className="block text-sm text-brand-300 font-bold hover:text-brand-200"
            >
              {contactInfo.phone}
            </a>
            <p className="text-sm text-white/55 mt-1">{contactInfo.email}</p>
            <p className="text-sm text-white/45 mt-3 font-medium">
              Based in Manchester, UK
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-brand-500/25 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Cali Packs. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40 font-medium">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
