import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
    debug: process.env.NODE_ENV === "development",
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "database",
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),

        Email({
            server: {
                host: "smtp.resend.com",
                port: 587,
                auth: {
                    user: "resend",
                    pass: process.env.RESEND_API_KEY!,
                },
            },
            from: process.env.EMAIL_FROM!,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
});