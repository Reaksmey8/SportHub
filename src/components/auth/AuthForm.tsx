"use client";

import { FormEvent, useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
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
          <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
          <input id="name" value={name} onChange={(event) => setName(event.target.value)} required
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-400" />
        </div>
      )}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-400" />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-emerald-400" />
      </div>
      {error && <p role="alert" className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p>}
      <Button type="submit" className="w-full" icon={mode === "login" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}>
        {mode === "login" ? "Sign in" : "Create account"}
      </Button>
      <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); }}
        className="w-full text-sm text-emerald-400 hover:text-emerald-300">
        {mode === "login" ? "Need an account? Create one" : "Already have an account? Sign in"}
      </button>
    </form>
  );
}
