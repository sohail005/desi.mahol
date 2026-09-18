"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, isAdmin, loading, signIn, bootstrapAdminClaim, signOut } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAdmin) router.replace("/admin");
  }, [loading, isAdmin, router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const signedInUser = await signIn(email.trim(), password);
      const granted = await bootstrapAdminClaim(signedInUser);
      if (!granted) {
        await signOut();
        setError("This account isn't authorized for admin access.");
        return;
      }
      router.replace("/admin");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading || (user && isAdmin)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1c0704] text-white/60">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1c0704] px-4">
      <form
        onSubmit={handleSubmit}
        className="liquid-glass-card w-full max-w-sm rounded-2xl p-6 text-white"
      >
        <div className="mb-5 flex items-center gap-2">
          <span className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-accent">
            <Lock size={16} />
          </span>
          <h1 className="text-lg font-semibold">Admin Login</h1>
        </div>

        <label className="mb-3 block text-sm">
          <span className="mb-1 block text-white/60">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white outline-none focus:border-amber-400/60"
          />
        </label>

        <label className="mb-4 block text-sm">
          <span className="mb-1 block text-white/60">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-2 text-white outline-none focus:border-amber-400/60"
          />
        </label>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="liquid-glass liquid-glass-accent w-full rounded-xl py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
