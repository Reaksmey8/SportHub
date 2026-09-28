"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Sun,
  Moon,
  LogIn,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Sports", href: "/sports" },
  { name: "Events", href: "/events" },
  { name: "Categories", href: "/categories" },
  { name: "Favorites", href: "/favorites" },
  { name: "About", href: "/about" },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const cancelSignOutRef = useRef<HTMLButtonElement>(null);
  const confirmSignOutRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, mounted: authMounted, logout } = useAuth();

  useEffect(() => {
    const hydrationId = window.setTimeout(() => setMounted(true), 0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(hydrationId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!signOutOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    cancelSignOutRef.current?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSignOutOpen(false);
      } else if (event.key === "Tab") {
        const focusIsOnCancel = document.activeElement === cancelSignOutRef.current;
        const focusIsOnConfirm = document.activeElement === confirmSignOutRef.current;

        if (event.shiftKey && focusIsOnCancel) {
          event.preventDefault();
          confirmSignOutRef.current?.focus();
        } else if (!event.shiftKey && focusIsOnConfirm) {
          event.preventDefault();
          cancelSignOutRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleDialogKeyDown);
    return () => {
      window.removeEventListener("keydown", handleDialogKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [signOutOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setSignOutOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setSignOutOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo (shifted rightward while keeping ample space from navigation) */}
          <Link
            href="/"
            className="flex items-center group py-1 ml-2 sm:ml-6 md:ml-10 lg:ml-16 xl:ml-24 transition-all duration-300"
            aria-label="Go to Home"
          >
            <div className="relative h-11 w-16 sm:h-13 sm:w-20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Image
                src="/images/logo.png"
                alt="SH Logo"
                fill
                priority
                sizes="(max-width: 640px) 64px, 80px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative py-2 px-3.5 text-sm font-medium transition-colors duration-200 inline-flex items-center",
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:h-0.5 after:bg-emerald-500 after:rounded-full"
                      : "text-slate-600 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400"
                  )}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Area: Search, Theme Toggle, Auth & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger Button */}
            <div className="relative">
              {searchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center bg-white dark:bg-zinc-900 border border-emerald-500/60 rounded-xl px-3 py-1.5 shadow-lg"
                >
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="text-emerald-500 dark:text-emerald-400 mr-2 shrink-0 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sports, events, footer, team..."
                    className="bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none w-44 sm:w-60"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-white ml-2 p-1 cursor-pointer"
                    aria-label="Close search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-900/80 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 text-xs font-medium transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="hidden sm:inline">Search...</span>
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-200/80 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 rounded border border-slate-300 dark:border-zinc-700">
                    ⌘K
                  </kbd>
                </button>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 transition-all duration-200 cursor-pointer group"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 group-hover:-rotate-12" />
                )
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            {authMounted && (
              user ? (
                <button
                  onClick={handleLogout}
                  title={`Sign out ${user.name}`}
                  className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white sm:flex"
                >
                  <LogOut className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="max-w-24 truncate">{user.name}</span>
                </button>
              ) : (
                <Link href="/auth" aria-label="Sign in" className="hidden rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-2.5 text-emerald-400 hover:bg-emerald-500/20 sm:block">
                  <LogIn className="h-4 w-4" />
                </Link>
              )
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl transition-colors">
          {/* Mobile Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 shadow-sm focus-within:border-emerald-500"
          >
            <Search className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sports, events, footer, team..."
              className="bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none w-full"
            />
            <button
              type="submit"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 ml-2 px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 cursor-pointer"
            >
              Go
            </button>
          </form>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10 font-semibold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-900"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
                </Link>
              );
            })}
          </div>

          {/* Mobile Auth Button */}
          <div className="pt-3 border-t border-slate-200 dark:border-zinc-800">
            {authMounted && user ? (
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LogOut className="h-4 w-4 text-emerald-500" />
                  <span>Sign out ({user.name})</span>
                </span>
              </button>
            ) : (
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100/80 dark:text-emerald-400 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign in to Account</span>
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          <div className="pt-4 mt-3 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 px-2">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <TrendingUp className="w-4 h-4" /> Live Sports & Events
            </span>
            <span className="font-mono text-slate-400 dark:text-zinc-500">v2.0.0</span>
          </div>
        </div>
      )}

      {signOutOpen && user && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSignOutOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="sign-out-title"
            aria-describedby="sign-out-description"
            className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="p-6 sm:p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2
                id="sign-out-title"
                className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
              >
                Sign out of SportsHub?
              </h2>
              <p
                id="sign-out-description"
                className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400"
              >
                You&apos;re signed in as{" "}
                <span className="font-semibold text-slate-800 dark:text-zinc-200">
                  {user.name}
                </span>
                . You can sign back in anytime.
              </p>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-950/50 sm:flex-row sm:justify-end">
              <button
                ref={cancelSignOutRef}
                type="button"
                onClick={() => setSignOutOpen(false)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Stay signed in
              </button>
              <button
                ref={confirmSignOutRef}
                type="button"
                onClick={confirmLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign out
              </button>
            </div>
          </section>
        </div>,
        document.body
      )}
    </header>
  );
};
