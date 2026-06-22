"use client";

import { useState, useEffect } from "react";
import { getSession, logout } from "@/lib/auth";
import LoginPage from "./LoginPage";

interface Props {
  children: React.ReactNode;
}

export default function AuthGate({ children }: Props) {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(getSession() !== null);
  }, []);

  // Loading state (prevents hydration mismatch)
  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f172a]">
        <div className="rounded border border-cyan-500/20 bg-slate-900 px-6 py-4">
          <p className="animate-pulse text-[10px] tracking-widest text-cyan-400 uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authed) {
    return <LoginPage onLogin={() => setAuthed(true)} />;
  }

  return <>{children}</>;
}

export function useLogout() {
  return () => {
    logout();
    if (typeof window !== "undefined") window.location.reload();
  };
}
