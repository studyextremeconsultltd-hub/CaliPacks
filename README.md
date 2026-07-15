# CaliPaz — Premium Custom Packaging UK

A modern, high-converting eCommerce website for CaliPaz, built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

## Features

- **Premium UI/UX** — Clean, modern design with emerald green branding
- **Product Catalog** — 28 products across 6 categories with search and filtering
- **Shopping Cart** — Persistent cart with localStorage, quantity management
- **SEO Optimized** — Metadata, sitemap, robots.txt, semantic HTML
- **Performance** — Static generation, optimized images, minimal JS
- **Responsive** — Mobile-first design with desktop mega-menu navigation
- **Account System** — Login/register UI (ready for backend integration)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── home/         # Homepage sections
│   ├── layout/       # Header, Footer, AnnouncementBar
│   └── products/     # Product cards, grid, detail
├── context/          # Cart context provider
├── data/             # Products, categories, navigation
├── lib/              # Utilities
└── types/            # TypeScript interfaces
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Fonts:** Inter (Google Fonts)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with category sections |
| `/shop` | All products with search |
| `/shop/[category]` | Category product listing |
| `/product/[slug]` | Product detail page |
| `/cart` | Shopping cart |
| `/account` | Login / Register |
| `/custom-orders` | Custom packaging enquiry form |
| `/about` | About page |
| `/contact` | Contact form |
| `/faq` | FAQ accordion |

## License

Private — All rights reserved.
