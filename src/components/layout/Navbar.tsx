"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useFavorites } from "@/context/FavoritesContext";

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
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { totalFavoritesCount } = useFavorites();

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
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
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 inline-flex items-center gap-1.5",
                    isActive
                      ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400 dark:bg-white/5 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/5"
                  )}
                >
                  <span>{item.name}</span>
                  {item.name === "Favorites" && mounted && totalFavoritesCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white font-mono leading-none shadow-sm">
                      {totalFavoritesCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Area: Search, Theme Toggle & Mobile Menu */}
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
                    {item.name === "Favorites" && mounted && totalFavoritesCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white font-mono leading-none shadow-sm">
                        {totalFavoritesCount}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 mt-3 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 px-2">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <TrendingUp className="w-4 h-4" /> Live Sports & Events
            </span>
            <span className="font-mono text-slate-400 dark:text-zinc-500">v2.0.0</span>
          </div>
        </div>
      )}
    </header>
  );
};
