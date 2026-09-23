"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/image/logo.png";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-zinc-800/80 bg-slate-100 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group" aria-label="Go to Home">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300 shrink-0">
                <Image
                  src={logoImg}
                  alt="SH Logo"
                  fill
                  sizes="(max-width: 640px) 56px, 64px"
                  className="object-cover"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              Your modern destination for live sports coverage, athletic events, and sporting categories across Cambodia and beyond.
            </p>
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              {["Twitter", "Instagram", "YouTube", "Discord"].map((platform) => (
                <span
                  key={platform}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-zinc-800 text-xs font-medium cursor-pointer transition-colors shadow-sm dark:shadow-none"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sports" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Sport Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  ⚽ Football
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  🚴 Cycling
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  🏊 Swimming
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  🥊 Boxing & Kun Khmer
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Newsletter
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Get the latest sports news, event announcements, and tournament updates.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 focus-within:border-emerald-500 p-1 shadow-sm dark:shadow-none">
                  <Mail className="w-4 h-4 text-slate-400 dark:text-zinc-500 ml-2.5 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-2.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black shrink-0 transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} SportsHub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-900 dark:hover:text-zinc-300 transition-colors">
              About
            </Link>
            <span className="hover:text-slate-900 dark:hover:text-zinc-300 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-slate-900 dark:hover:text-zinc-300 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
