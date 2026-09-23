import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/image/logo.png";
import schoolLogo from "@/image/school.png";
import {
  Trophy,
  Zap,
  Code2,
  Users,
  Compass,
  Cpu,
  GraduationCap,
  ArrowRight,
  Flame,
  Activity,
  Layers,
  Sparkles,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21.93 3.14a1.72 1.72 0 0 0-1.74-.29L2.57 10.37a1.73 1.73 0 0 0 .11 3.24l4.94 1.72 1.83 5.56a1.72 1.72 0 0 0 2.77.72l3.16-2.73 4.88 3.59a1.72 1.72 0 0 0 2.72-.94l3.52-16.73a1.72 1.72 0 0 0-4.57-1.66zm-3.41 3.82L8.91 13.5l-.83 2.52-.73-2.21 11.17-6.85z" />
  </svg>
);

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const metadata: Metadata = {
  title: "About Us — SportsHub",
  description:
    "Discover the story, engineering philosophy, and the student team behind SportsHub — Cambodia's premier live athletic platform.",
};

export interface ProfileMember {
  name: string;
  role: string;
  avatarUrl: string;
  telegramUrl: string;
  githubUrl: string;
  emailUrl: string;
}

// 1 MENTOR (You can replace avatarUrl with your custom photo file e.g. "/images/mentor.png")
const MENTOR_DATA: ProfileMember = {
  name: "Eung Lyzhia",
  role: "Mentor",
  // REPLACE PHOTO HERE: Replace with your own image path
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  telegramUrl: "https://t.me",
  githubUrl: "https://github.com",
  emailUrl: "mailto:mentor@example.com",
};

// 5 MEMBERS (You can replace avatarUrl with your custom photo files)
const TEAM_MEMBERS_DATA: ProfileMember[] = [
  {
    name: "Ratana Oudom",
    role: "Frontend",
    // REPLACE PHOTO HERE: Replace with your own image path
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    telegramUrl: "https://t.me",
    githubUrl: "https://github.com",
    emailUrl: "mailto:ratana@example.com",
  },
  {
    name: "Heng Soleakna",
    role: "Frontend",
    // REPLACE PHOTO HERE: Replace with your own image path
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    telegramUrl: "https://t.me",
    githubUrl: "https://github.com",
    emailUrl: "mailto:soleakna@example.com",
  },
  {
    name: "San Sengthanu",
    role: "Frontend",
    // REPLACE PHOTO HERE: Replace with your own image path
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    telegramUrl: "https://t.me",
    githubUrl: "https://github.com",
    emailUrl: "mailto:sengthanu@example.com",
  },
  {
    name: "Seng Silkhema",
    role: "Frontend",
    // REPLACE PHOTO HERE: Replace with your own image path
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    telegramUrl: "https://t.me",
    githubUrl: "https://github.com",
    emailUrl: "mailto:silkhema@example.com",
  },
  {
    name: "Chhom Chanreaksmey",
    role: "Frontend",
    // REPLACE PHOTO HERE: Replace with your own image path
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    telegramUrl: "https://t.me",
    githubUrl: "https://github.com",
    emailUrl: "mailto:chanreaksmey@example.com",
  },
];

// Reusable Profile Card Component matching Picture 2 design
const ProfileCard: React.FC<{ member: ProfileMember }> = ({ member }) => {
  return (
    <div className="relative w-full max-w-[210px] sm:max-w-[225px] bg-[#f4f5f7] dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 shadow-sm px-4 pt-6 pb-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group">
      {/* Decorative Red Wireframe Frame with terminal dots matching Picture 2 */}
      <div className="absolute inset-2.5 sm:inset-3 rounded-2xl sm:rounded-3xl border-2 border-t-0 border-[#9e1111] dark:border-red-600/90 pointer-events-none transition-colors">
        {/* Top Left Line & Terminal Dot */}
        <div className="absolute -top-[2px] -left-[2px] w-[26%] sm:w-[28%] h-5 sm:h-6 border-t-2 border-l-2 border-[#9e1111] dark:border-red-600/90 rounded-tl-2xl sm:rounded-tl-3xl">
          <span className="absolute -top-[5px] -right-1 w-2 h-2 rounded-full bg-[#9e1111] dark:bg-red-500 shadow-sm" />
        </div>

        {/* Top Right Line & Terminal Dot */}
        <div className="absolute -top-[2px] -right-[2px] w-[26%] sm:w-[28%] h-5 sm:h-6 border-t-2 border-r-2 border-[#9e1111] dark:border-red-600/90 rounded-tr-2xl sm:rounded-tr-3xl">
          <span className="absolute -top-[5px] -left-1 w-2 h-2 rounded-full bg-[#9e1111] dark:bg-red-500 shadow-sm" />
        </div>
      </div>

      {/* Circular Avatar */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-md mb-3 bg-slate-200 dark:bg-zinc-800 shrink-0">
        <Image
          src={member.avatarUrl}
          alt={member.name}
          fill
          unoptimized
          sizes="112px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Member Name */}
      <h3 className="text-sm sm:text-base font-bold text-[#9e1111] dark:text-red-400 tracking-tight leading-snug">
        {member.name}
      </h3>

      {/* Role Badge */}
      <div className="mt-2">
        <span className="inline-block px-4 py-0.5 rounded-full text-xs font-semibold bg-[#9e1111] dark:bg-red-600 text-white shadow-sm tracking-wide">
          {member.role}
        </span>
      </div>

      {/* Social Links Row */}
      <div className="mt-3.5 flex items-center justify-center gap-3 text-[#9e1111] dark:text-red-400">
        {/* Telegram */}
        <a
          href={member.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 rounded hover:text-red-500 dark:hover:text-red-300 transition-transform hover:scale-110 active:scale-95"
          aria-label={`${member.name} on Telegram`}
        >
          <TelegramIcon className="w-3.5 h-3.5" />
        </a>

        {/* GitHub */}
        <a
          href={member.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 rounded hover:text-red-500 dark:hover:text-red-300 transition-transform hover:scale-110 active:scale-95"
          aria-label={`${member.name} on GitHub`}
        >
          <GithubIcon className="w-3.5 h-3.5" />
        </a>

        {/* Email */}
        <a
          href={member.emailUrl}
          className="p-1 rounded hover:text-red-500 dark:hover:text-red-300 transition-transform hover:scale-110 active:scale-95"
          aria-label={`Email ${member.name}`}
        >
          <MailIcon className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

const PLATFORM_STATS = [
  { label: "Sporting Disciplines", value: "12+", icon: Trophy, detail: "Kun Khmer, CPL, Cycling, Swimming & more" },
  { label: "Tournaments & Events", value: "100+", icon: Activity, detail: "Tracked across Cambodian provinces" },
  { label: "Average API Response", value: "<120ms", icon: Zap, detail: "Ultra-fast Next.js server rendering" },
  { label: "Student Engineering Team", value: "5 + 1", icon: Users, detail: "5 Students & 1 Academic Advisor" },
];

const TECH_STACK = [
  { name: "Next.js 15", category: "Framework", desc: "App Router, Turbopack, and React Server Components." },
  { name: "TypeScript", category: "Language", desc: "Type-safe interfaces and strict contract validation." },
  { name: "Tailwind CSS", category: "Styling", desc: "Custom utility-first design system with dark/light themes." },
  { name: "REST API", category: "Backend Core", desc: "Centralized live sports data endpoints and favorites toggle." },
  { name: "Lucide Icons", category: "Iconography", desc: "Pixel-perfect modern SVG icon library." },
  { name: "Responsive Architecture", category: "Mobile First", desc: "Seamless navigation across phones, tablets, and 4K displays." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20 bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">

        {/* 1. HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-4 sm:pt-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Phnom Penh, Cambodia • Live Athletic Platform</span>
          </div>

          {/* Logo Showcase */}
          <div className="relative h-20 w-32 sm:h-24 sm:w-40 mx-auto transition-transform hover:scale-105 duration-300">
            <Image
              src={logoImg}
              alt="SportsHub SH Logo"
              fill
              priority
              sizes="160px"
              className="object-contain"
            />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.1]">
            Where Cambodian Athletics Meets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300">
              Modern Engineering
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            SportsHub is an open digital arena engineered by five university software students under academic mentorship to centralize, elevate, and celebrate Cambodia&apos;s sporting heartbeat.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/sports"
              className="px-6 py-3 rounded-2xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Live Sports</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#team"
              className="px-6 py-3 rounded-2xl text-sm font-semibold bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800 transition-all shadow-sm"
            >
              Meet The Roster
            </a>
          </div>
        </section>

        {/* 2. PLATFORM TELEMETRY PULSE (STAT STRIP) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PLATFORM_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-slate-200/90 dark:border-zinc-800 backdrop-blur-xl shadow-sm hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                    Live Metric
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-zinc-200 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                  {stat.detail}
                </div>
              </div>
            );
          })}
        </section>

        {/* 3. ATHLETIC BENTO GRID (THE MISSION) */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono">
              Core Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              The Architecture of Our Mission
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400">
              Transforming fragmented sports schedules into an integrated digital experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Bento Tile 1: Centralizing Cambodian Athletics (Wide 2-col) */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-white via-white to-emerald-50/50 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-emerald-950/20 border border-slate-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 mb-6">
                  <Flame className="w-6 h-6 fill-slate-950" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                  The Problem & Solution
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2 leading-tight">
                  One Unified Digital Home for Every Cambodian Discipline
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-4 leading-relaxed max-w-2xl">
                  Before SportsHub, following Cambodian athletics required browsing through scattered Facebook groups, TV broadcasts, and word-of-mouth schedules. We built SportsHub to deliver synchronized tournament schedules, stadium locations, athlete profiles, and real-time category indexing in one authoritative platform.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-zinc-800/80 flex flex-wrap items-center gap-3">
                {["Kun Khmer 🥊", "CPL Football ⚽", "National Cycling 🚴", "Aquatics 🏊", "Cambodian Chess ♟️"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200/60 dark:border-zinc-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Tile 2: Cultural Heritage (Kun Khmer & National Identity) */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-slate-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between group hover:border-rose-500/40 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 mb-6">
                  <Trophy className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-mono">
                  Cultural Heritage
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  Honoring the Ring & Stadium Heritage
                </h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400 mt-3 leading-relaxed">
                  Sports in Cambodia are steeped in centuries of heritage — from Angkorian martial arts to modern international champions. SportsHub celebrates this legacy through dedicated media coverage and digital archiving.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-rose-500">
                <span>Preserving National Athletic Pride</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Bento Tile 3: REST API & Speed */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-slate-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between group hover:border-teal-500/40 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20 mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-mono">
                  API-First Engine
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  Decoupled, Sub-Second Performance
                </h3>
                <p className="text-sm text-slate-600 dark:text-zinc-400 mt-3 leading-relaxed">
                  Engineered with an asynchronous REST API architecture, caching layers, and instant optimistic updates so bookmarking your favorite matches feels instantaneous.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-teal-600 dark:text-teal-400">
                <span>Next.js 15 App Router</span>
                <span>•</span>
                <span>Spring Boot API</span>
              </div>
            </div>

            {/* Bento Tile 4: Student Engineering Craft (Wide 2-col) */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-slate-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-sm flex items-center">
                    <Image
                      src={schoolLogo}
                      alt="ISTAD Logo"
                      width={120}
                      height={40}
                      className="h-7 w-auto object-contain"
                    />
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                  Academic Innovation
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  Built by 5 Software Engineering Students at ISTAD
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-3 leading-relaxed max-w-2xl">
                  Born as a hands-on capstone project at the Institute of Science and Technology Advanced Development (ISTAD), SportsHub exemplifies real-world software engineering: continuous integration, Git collaboration, production performance auditing, and clean interface design.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-zinc-400 pt-4 border-t border-slate-100 dark:border-zinc-800/60">
                <span className="font-semibold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Institute of Science and Technology Advanced Development
                </span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">Class of 2025/2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TECH SPECS & ARCHITECTURE */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-100/80 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800/80 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono">
                System Specifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                The Tech Stack Powering SportsHub
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
              Production Architecture v2.0
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-sm hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                    {tech.category}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TEAM ROSTER SECTION MATCHING PICTURE 2 */}
        <section id="team" className="space-y-12">
          {/* MENTOR SECTION CONTAINER */}
          <div className="p-8 sm:p-12 rounded-[32px] bg-white dark:bg-zinc-950/70 border border-slate-200/90 dark:border-zinc-800 shadow-sm max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#9e1111] dark:text-red-500 text-center">
              OUR MENTOR
            </h2>
            <div className="flex justify-center">
              <ProfileCard member={MENTOR_DATA} />
            </div>
          </div>

          {/* MEET OUR TEAM SECTION CONTAINER */}
          <div className="p-8 sm:p-12 rounded-[32px] bg-white dark:bg-zinc-950/70 border border-slate-200/90 dark:border-zinc-800 shadow-sm max-w-6xl mx-auto space-y-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#9e1111] dark:text-red-500 text-center">
              MEET OUR TEAM
            </h2>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-7">
              {TEAM_MEMBERS_DATA.map((member) => (
                <ProfileCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. MANIFESTO & CLOSING CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-zinc-900 to-emerald-950 p-8 sm:p-14 text-center text-white shadow-2xl border border-emerald-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-7 h-7" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Follow Cambodia&apos;s Sports Revolution?
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Explore upcoming championship bouts, football fixtures, and provincial tournament categories live on SportsHub.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/sports"
                className="px-6 py-3 rounded-2xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
              >
                Browse All Sports
              </Link>
              <Link
                href="/categories"
                className="px-6 py-3 rounded-2xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15 transition-all"
              >
                View Categories
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
