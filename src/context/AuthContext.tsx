"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthUser, StoredAccount } from "@/types/auth";

const ACCOUNTS_KEY = "sportshub-accounts";
const SESSION_KEY = "sportshub-session";

interface AuthContextValue {
  user: AuthUser | null;
  mounted: boolean;
  login: (email: string, password: string) => string | null;
  register: (name: string, email: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hydrationId = window.setTimeout(() => {
      setUser(readStorage<AuthUser | null>(SESSION_KEY, null));
      setMounted(true);
    }, 0);
    return () => window.clearTimeout(hydrationId);
  }, []);

  const login = (email: string, password: string) => {
    const account = readStorage<StoredAccount[]>(ACCOUNTS_KEY, []).find(
      (candidate) => candidate.email === email.trim().toLowerCase()
    );
    if (!account || account.password !== password) {
      return "The email or password is incorrect.";
    }
    const nextUser: AuthUser = { id: account.id, name: account.name, email: account.email };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return null;
  };

  const register = (name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const accounts = readStorage<StoredAccount[]>(ACCOUNTS_KEY, []);
    if (accounts.some((account) => account.email === normalizedEmail)) {
      return "An account with this email already exists.";
    }
    const nextUser: AuthUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
    };
    accounts.push({ ...nextUser, password });
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return null;
  };

  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, mounted, login, register, logout }),
    [user, mounted]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
