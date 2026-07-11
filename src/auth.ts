import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const isDbConfigured =
    process.env.DATABASE_URL &&
    !process.env.DATABASE_URL.includes("johndoe") &&
    !process.env.DATABASE_URL.includes("randompassword");

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                // If database is configured, try real DB lookup
                if (isDbConfigured) {
                    try {
                        const { db } = await import("@/lib/db");
                        const bcrypt = await import("bcryptjs");
                        const user = await db.user.findUnique({ where: { email } });
                        if (!user) return null;

                        const isValid = await bcrypt.compare(password, user.passwordHash);
                        if (!isValid) return null;

                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        };
                    } catch (error) {
                        console.error("DB authorize error:", error);
                        return null;
                    }
                }

                // Fallback: persistent admin store (JSON file) — dynamic import to avoid edge runtime issues
                const { verifyAdminPassword } = await import("@/lib/admin-auth");
                const admin = await verifyAdminPassword(email, password);
                if (!admin) return null;

                return {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            const typedToken = token as { id?: string; role?: string };
            if (typedToken.id) {
                session.user.id = typedToken.id;
            }
            if (typedToken.role) {
                session.user.role = typedToken.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
});
