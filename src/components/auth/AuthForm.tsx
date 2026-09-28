"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { loginSchema, registerSchema } from "@/lib/validation/auth";

export function AuthForm() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    let result: string | null;
    if (mode === "login") {
      const validation = loginSchema.safeParse({ email, password });
      if (!validation.success) {
        setError(validation.error.issues[0]?.message ?? "Please check your details.");
        return;
      }
      result = login(validation.data.email, validation.data.password);
    } else {
      const validation = registerSchema.safeParse({ name, email, password });
      if (!validation.success) {
        setError(validation.error.issues[0]?.message ?? "Please check your details.");
        return;
      }
      result = register(
        validation.data.name,
        validation.data.email,
        validation.data.password
      );
    }
    if (result) {
      setError(result);
      return;
    }
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {mode === "register" && (
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300"
          >
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            placeholder="Your full name"
            className="w-full rounded-xl border border-slate-300 bg-slate-50/70 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-colors duration-150 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-emerald-400"
          />
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-300 bg-slate-50/70 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-colors duration-150 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-emerald-400"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-zinc-300"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder={
              mode === "register"
                ? "8+ chars, upper/lowercase, number, symbol"
                : "••••••••"
            }
            className="w-full rounded-xl border border-slate-300 bg-slate-50/70 px-4 py-3 pr-12 text-slate-900 placeholder-slate-400 outline-none transition-colors duration-150 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-emerald-400"
          />
          {password.length > 0 && (
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              aria-controls="password"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              {showPassword ? (
                <EyeOff aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Eye aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-600 dark:text-rose-400"
        >
          {error}
        </p>
      )}
      <Button
        type="submit"
        className="w-full"
        icon={mode === "login" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
      >
        {mode === "login" ? "Sign in" : "Create account"}
      </Button>
      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setShowPassword(false);
          setError(null);
        }}
        className="w-full text-center text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors cursor-pointer"
      >
        {mode === "login" ? "Need an account? Create one" : "Already have an account? Sign in"}
      </button>
    </form>
  );
}
