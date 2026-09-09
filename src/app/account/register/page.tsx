import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container-site max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-surface-900 mb-2">Create an Account</h1>
        <p className="text-sm text-surface-800/60 mb-6">
          Register for wholesale pricing, faster checkout, and order tracking.
        </p>
        <Link
          href="/account"
          className="inline-flex px-6 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors"
        >
          Go to Registration
        </Link>
      </div>
    </div>
  );
}
