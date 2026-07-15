"use client";

import { useState } from "react";
import Link from "next/link";
import { User, LogIn, UserPlus } from "lucide-react";

export default function AccountPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="py-12 md:py-16">
      <div className="container-site max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
            <User className="w-7 h-7 text-brand-700" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900">My Account</h1>
          <p className="text-sm text-surface-800/60 mt-1">
            Sign in for wholesale pricing and order tracking
          </p>
        </div>

        <div className="flex rounded-xl bg-surface-100 p-1 mb-6">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              tab === "login"
                ? "bg-white text-surface-900 shadow-sm"
                : "text-surface-800/60 hover:text-surface-900"
            }`}
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              tab === "register"
                ? "bg-white text-surface-900 shadow-sm"
                : "text-surface-800/60 hover:text-surface-900"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Register
          </button>
        </div>

        <div className="bg-white rounded-xl border border-surface-200 p-6">
          {tab === "login" ? (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-surface-800 mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-surface-800 mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-surface-200" />
                  Remember me
                </label>
                <Link href="#" className="text-sm text-brand-700 hover:underline">
                  Lost password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors"
              >
                Log In
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-surface-800 mb-1.5">
                  Email address
                </label>
                <input
                  id="reg-email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="reg-password" className="block text-sm font-medium text-surface-800 mb-1.5">
                  Password
                </label>
                <input
                  id="reg-password"
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-brand-300 focus:ring-2 focus:ring-brand-200 focus:outline-none text-sm"
                />
              </div>
              <p className="text-xs text-surface-800/50">
                Your personal data will be used to support your experience throughout this website, 
                to manage access to your account, and for other purposes described in our{" "}
                <Link href="/privacy" className="text-brand-700 hover:underline">privacy policy</Link>.
              </p>
              <button
                type="submit"
                className="w-full py-3.5 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
