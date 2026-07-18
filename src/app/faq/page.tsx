import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Cali Smoke products, ordering, shipping, and delivery.",
};

const faqs = [
  {
    q: "What is the minimum order quantity?",
    a: "Minimum order quantities vary by product. Most mylar bags have a 100-unit minimum, glass jars start at 50 units, and blank packaging starts at 250 units. Check each product page for specific details.",
  },
  {
    q: "How long does delivery take?",
    a: "In-stock items are dispatched within 2–3 business days. UK delivery typically takes 1–2 additional days. Custom orders take 5–7 business days after design approval.",
  },
  {
    q: "Do you offer free delivery?",
    a: "Yes! We offer free UK delivery on all orders over £150. Orders below this threshold have a flat £8.99 shipping fee.",
  },
  {
    q: "Can I upload my own design?",
    a: "Absolutely. For custom orders, you can upload your artwork during the order process. We accept AI, PSD, PDF, and high-resolution PNG files.",
  },
  {
    q: "Are your packaging materials child-resistant?",
    a: "Yes, all our mylar bags and jars feature child-resistant closures that meet UK packaging regulations.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within the UK only. We're working on expanding to EU countries — register your interest via our contact page.",
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container-site max-w-3xl">
        <h1 className="text-3xl font-bold text-surface-900 tracking-tight mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-white rounded-xl border border-surface-200 overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-medium text-surface-900 hover:bg-surface-50 transition-colors">
                {faq.q}
                <span className="text-surface-800/40 group-open:rotate-45 transition-transform text-xl ml-4">+</span>
              </summary>
              <div className="px-6 pb-4 text-sm text-surface-800/70 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
