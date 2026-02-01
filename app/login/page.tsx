"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionContainer } from "../../components/ui/SectionContainer";
import { LogIn, Loader2 } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const error = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    if (!email.trim() || !password) {
      setFormError("Please enter email and password.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
        callbackUrl,
      });
      if (res?.error) {
        setFormError("Invalid email or password.");
        setIsLoading(false);
        return;
      }
      if (res?.url) {
        window.location.href = res.url;
        return;
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    }
    setIsLoading(false);
  }

  return (
<section className="py-section sm:py-section-lg bg-[var(--color-bg-soft)]">
        <SectionContainer narrow>
        <div className="border border-white/10 bg-white/5 p-10 max-w-md mx-auto">
            {(error === "CredentialsSignin" || formError) && (
              <div
                className="mb-6 rounded-lg bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 px-4 py-3 text-sm text-white"
                role="alert"
              >
                {formError || "Invalid email or password."}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-white/80 mb-1"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none transition-colors min-h-[48px]"
                  placeholder="admin@europeanera.eu"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-white/80 mb-1"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:outline-none transition-colors min-h-[48px]"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-none bg-[var(--color-primary)] px-4 py-3 min-h-[48px] font-semibold text-white hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)] disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" aria-hidden />
                    Signing in…
                  </>
                ) : (
                  <>
                    <LogIn size={20} aria-hidden />
                    Sign in
                  </>
                )}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-white/60">
              Demo: admin@europeanera.eu / europeanera-demo
            </p>
            <p className="mt-4 text-center">
              <Link
                href="/"
                className="text-[var(--color-accent)] font-medium hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-none"
              >
                ← Back to home
              </Link>
            </p>
          </div>
      </SectionContainer>
    </section>
  );
}

export default function LoginPage() {
  return (
    <>
      <PageHeader
        title="Log in"
        description="Sign in to your European Era account"
        breadcrumbs={[{ label: "Login" }]}
        variant="centered"
      />
      <Suspense fallback={<div className="py-section text-center text-white/60">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </>
  );
}
