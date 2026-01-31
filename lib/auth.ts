import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Demo credentials. In production use a database and hashed passwords.
 * Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local to override.
 */
const DEMO_EMAIL = process.env.ADMIN_EMAIL ?? "admin@europeanera.eu";
const DEMO_PASSWORD = process.env.ADMIN_PASSWORD ?? "europeanera-demo";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (
          credentials.email === DEMO_EMAIL &&
          credentials.password === DEMO_PASSWORD
        ) {
          return {
            id: "1",
            email: credentials.email,
            name: "Admin",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
