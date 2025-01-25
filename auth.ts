import NextAuth from "next-auth";
import { prisma } from "./db/prisma";
import CredentialProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import { cookies } from "next/headers";
import { authConfig } from "./auth.config";

export const config = {
    pages: {
        signIn: "/sign-in",
        error: "/sign-in",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialProvider({
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },
            async authorize(credentials) {
                if (credentials === null) {
                    return null;
                }
                const user = await prisma.user.findFirst({
                    where: { email: credentials.email as string },
                });
                if (user && user.password) {
                    const isMatch = compareSync(
                        credentials.password as string,
                        user.password
                    );

                    if (isMatch) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        };
                    }
                }
                return null;
            },
        }),
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, user, trigger, token }: any) {
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;
            if (trigger === "update") {
                session.user.name = user.name;
            }
            return session;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ user, token, trigger, session }: any) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                if (user.name === "NO_NAME") {
                    token.name = user.email.split("@")[0];
                }

                await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        name: token.name,
                    },
                });
                if (trigger === "signIn" || trigger === "signUp") {
                    const cookeObject = await cookies();
                    const sessionCartId =
                        cookeObject.get("sessionCartId")?.value;

                    if (sessionCartId) {
                        const sessionCart = await prisma.cart.findFirst({
                            where: { sessionCartId },
                        });
                        if (sessionCart) {
                            await prisma.cart.deleteMany({
                                where: { userId: user.id },
                            });
                            await prisma.cart.update({
                                where: { id: sessionCart.id },
                                data: { userId: user.id },
                            });
                        }
                    }
                }
            }
            if (session?.user.name && trigger === "update") {
                token.name = session.user.name;
            }
            return token;
        },
        ...authConfig,
    },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
