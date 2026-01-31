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
<section className="py-section sm:py-section-lg bg-stone-50/80">
        <SectionContainer narrow>
        <div className="border border-neutral-200 bg-white p-10 max-w-md mx-auto">
            {(error === "CredentialsSignin" || formError) && (
              <div
                className="mb-6 rounded-lg bg-accent/10 border border-accent/20 px-4 py-3 text-sm text-neutral-800"
                role="alert"
              >
                {formError || "Invalid email or password."}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full border border-neutral-300 px-4 py-3 text-neutral-900 focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none transition-colors min-h-[48px]"
                  placeholder="admin@europeanera.eu"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full border border-neutral-300 px-4 py-3 text-neutral-900 focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none transition-colors min-h-[48px]"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-primary px-4 py-3 min-h-[48px] font-semibold text-white shadow-md hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
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
            <p className="mt-6 text-center text-sm text-neutral-500">
              Demo: admin@europeanera.eu / europeanera-demo
            </p>
            <p className="mt-4 text-center">
              <Link
                href="/"
                className="text-primary font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-none transition-colors"
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
      <Suspense fallback={<div className="py-section text-center text-neutral-500">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </>
  );
}
