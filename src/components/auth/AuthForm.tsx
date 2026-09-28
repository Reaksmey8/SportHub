"use client";

import { useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { loginSchema, registerSchema } from "@/lib/validation/auth";

interface AuthFormValues {
  name: string;
  email: string;
  password: string;
}

export function AuthForm() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register: registerField,
    handleSubmit,
    control,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    defaultValues: { name: "", email: "", password: "" },
  });
  const password = useWatch({ control, name: "password" });

  const onSubmit = (values: AuthFormValues) => {
    clearErrors();
    const validation =
      mode === "login"
        ? loginSchema.safeParse(values)
        : registerSchema.safeParse(values);

    if (!validation.success) {
      validation.error.issues.forEach(({ path, message }) => {
        const field = path[0];
        if (field === "name" || field === "email" || field === "password") {
          setError(field, { type: "validation", message });
        }
      });
      return;
    }

    const result =
      mode === "login"
        ? login(values.email, values.password)
        : register(values.name, values.email, values.password);

    if (result) {
      setError("root.server", { type: "server", message: result });
      return;
    }

    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
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
            {...registerField("name", {
              onChange: () => {
                clearErrors("name");
                clearErrors("root.server");
              },
            })}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your full name"
            className="w-full rounded-xl border border-slate-300 bg-slate-50/70 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-colors duration-150 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-emerald-400"
          />
          {errors.name?.message && (
            <p
              id="name-error"
              role="alert"
              className="mt-2 text-sm text-rose-600 dark:text-rose-400"
            >
              {errors.name.message}
            </p>
          )}
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
          {...registerField("email", {
            onChange: () => {
              clearErrors("email");
              clearErrors("root.server");
            },
          })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-300 bg-slate-50/70 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-colors duration-150 focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-emerald-400"
        />
        {errors.email?.message && (
          <p
            id="email-error"
            role="alert"
            className="mt-2 text-sm text-rose-600 dark:text-rose-400"
          >
            {errors.email.message}
          </p>
        )}
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
            {...registerField("password", {
              onChange: () => {
                clearErrors("password");
                clearErrors("root.server");
              },
            })}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
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
        {errors.password?.message && (
          <p
            id="password-error"
            role="alert"
            className="mt-2 text-sm text-rose-600 dark:text-rose-400"
          >
            {errors.password.message}
          </p>
        )}
      </div>
      {errors.root?.server?.message && (
        <p
          role="alert"
          className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-600 dark:text-rose-400"
        >
          {errors.root.server.message}
        </p>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        icon={
          mode === "login" ? (
            <LogIn className="h-4 w-4" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )
        }
      >
        {isSubmitting
          ? "Please wait..."
          : mode === "login"
            ? "Sign in"
            : "Create account"}
      </Button>
      <button
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setShowPassword(false);
          clearErrors();
        }}
        className="w-full text-center text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors cursor-pointer"
      >
        {mode === "login"
          ? "Need an account? Create one"
          : "Already have an account? Sign in"}
      </button>
    </form>
  );
}
