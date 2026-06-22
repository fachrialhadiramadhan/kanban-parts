"use client";

import Board from "@/components/Board";
import AuthGate from "@/components/AuthGate";
import { useLogout } from "@/components/AuthGate";

export default function Home() {
  const handleLogout = useLogout();

  return (
    <AuthGate>
      <div className="fixed top-2 right-2 z-[100]">
        <button
          onClick={handleLogout}
          className="rounded border border-red-500/30 bg-red-950/50 px-3 py-1.5 text-[10px] font-bold tracking-wider text-red-400 transition hover:bg-red-900/50 hover:text-red-300"
        >
          LOGOUT
        </button>
      </div>
      <Board />
    </AuthGate>
  );
}
