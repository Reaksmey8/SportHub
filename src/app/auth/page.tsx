import { AuthForm } from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 py-16 dark:bg-[#090d16]">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/80 p-7 shadow-2xl sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">SportsHub community</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Join the conversation</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">Create an account to save your identity and post comments on sports and events.</p>
        <div className="mt-8"><AuthForm /></div>
      </div>
    </div>
  );
}
