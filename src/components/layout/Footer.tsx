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

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-white via-brand-50 to-brand-200 text-brand-950 shadow-[0_-20px_70px_rgba(236,72,153,0.14)]">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-fuchsia-300/25 blur-3xl" />

      <div className="container-site py-12 relative z-10">
        <nav className="mb-10 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white/75 p-3 shadow-[0_12px_36px_rgba(236,72,153,0.13)] backdrop-blur-sm sm:gap-5">
          {footerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl bg-brand-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-brand-800 transition hover:bg-brand-600 hover:text-white sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Logo size="lg" />
            </Link>
            <p className="mb-5 text-sm font-medium leading-relaxed text-brand-950/65">
            Cali Smoke — Manchester&apos;s destination for wholesale Cali Packs.
            £0.20 per pack · min 50 pcs. Shop online or visit us in store.
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
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-brand-700">
              Shop
            </h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-brand-950/60 transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-brand-700">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-brand-950/60 transition-colors hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-brand-700">
              Contact
            </h3>
            <a
              href={contactInfo.phoneHref}
              className="block text-sm font-bold text-brand-700 hover:text-brand-500"
            >
              {contactInfo.phone}
            </a>
            <p className="mt-1 text-sm text-brand-950/55">{contactInfo.email}</p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-brand-950/55">
              {contactInfo.address}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-white/65 px-5 py-4 sm:flex-row">
          <p className="text-xs font-medium text-brand-950/50">
            &copy; {new Date().getFullYear()} Cali Smoke. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-brand-950/50">
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
