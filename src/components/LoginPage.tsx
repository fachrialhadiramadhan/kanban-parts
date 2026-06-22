"use client";

import { useState } from "react";
import { login } from "@/lib/auth";

interface Props {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Small delay to make brute force slower
    await new Promise((r) => setTimeout(r, 300));

    const result = await login(username, password);
    setLoading(false);

    if (result.ok) {
      onLogin();
    } else {
      setError(result.error || "Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 font-black text-[#0f172a] text-2xl">K</div>
          </div>
          <h1 className="text-xl font-bold tracking-wider text-cyan-400 uppercase">KANBAN PARTS</h1>
          <p className="mt-1 text-[10px] tracking-widest text-slate-500 uppercase">Supply Part Management System</p>
        </div>

        {/* Login Form */}
        <div className="rounded border border-slate-700/50 bg-slate-900/60 p-6">
          <h2 className="mb-5 text-center text-xs font-bold tracking-widest text-slate-400 uppercase">Login Required</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-500"
                placeholder="Enter username"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-500"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-[10px] text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-cyan-500 py-2.5 text-sm font-bold tracking-wider text-[#0f172a] transition hover:bg-cyan-400 disabled:opacity-50"
            >
              {loading ? "VERIFYING..." : "LOGIN"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-[9px] text-slate-600">Session expires in 8 hours</p>
      </div>
    </div>
  );
}
