// Auth utilities - client side only
// SECURITY NOTE: Static-site auth has fundamental limitations:
// - Hash is visible in client bundle (extractable by anyone)
// - No server means no true rate limiting / brute force protection
// - For real security use a backend (Next.js API route + bcrypt)
// - This is a convenience lock, not a bank-grade auth

const USERS: Record<string, string> = {
  "admin": "e6717dc633ce300c3da9634b5405c8bcfc4c1b6fa03c92532b4191c6748fa20b",
};

const SESSION_KEY = "kanban-session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours
const ATTEMPTS_KEY = "kanban-auth-attempts";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 min

export interface Session {
  user: string;
  expires: number;
  token: string;
}

async function sha256(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function genToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface Attempts {
  count: number;
  lockedUntil: number;
}

function getAttempts(): Attempts {
  if (typeof window === "undefined") return { count: 0, lockedUntil: 0 };
  try {
    const raw = sessionStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return { count: 0, lockedUntil: 0 };
    return JSON.parse(raw) as Attempts;
  } catch {
    return { count: 0, lockedUntil: 0 };
  }
}

function setAttempts(a: Attempts) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify(a));
}

function clearAttempts() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ATTEMPTS_KEY);
}

export async function login(username: string, password: string): Promise<{ ok: boolean; error?: string }> {
  const attempts = getAttempts();
  if (attempts.lockedUntil > Date.now()) {
    const remaining = Math.ceil((attempts.lockedUntil - Date.now()) / 60000);
    return { ok: false, error: `Locked for ${remaining} min.` };
  }

  const expectedHash = USERS[username];
  if (!expectedHash) {
    // Wrong user — count attempt anyway
    const newCount = attempts.count + 1;
    if (newCount >= MAX_ATTEMPTS) {
      setAttempts({ count: newCount, lockedUntil: Date.now() + LOCKOUT_MS });
      return { ok: false, error: "Too many attempts. Locked 15 min." };
    }
    setAttempts({ count: newCount, lockedUntil: 0 });
    return { ok: false, error: `Invalid credentials. ${MAX_ATTEMPTS - newCount} tries left.` };
  }

  const pwHash = await sha256(password);
  if (pwHash !== expectedHash) {
    const newCount = attempts.count + 1;
    if (newCount >= MAX_ATTEMPTS) {
      setAttempts({ count: newCount, lockedUntil: Date.now() + LOCKOUT_MS });
      return { ok: false, error: "Too many attempts. Locked 15 min." };
    }
    setAttempts({ count: newCount, lockedUntil: 0 });
    return { ok: false, error: `Invalid credentials. ${MAX_ATTEMPTS - newCount} tries left.` };
  }

  // Success
  const session: Session = {
    user: username,
    expires: Date.now() + SESSION_DURATION_MS,
    token: genToken(),
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  clearAttempts();
  return { ok: true };
}

export function logout() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Session;
    if (s.expires < Date.now()) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}
