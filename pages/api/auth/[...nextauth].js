import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch("https://api.akkanop.in.th/api/auth/login", {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    })
                    const data = await res.json();

                    if (res.ok) {
                        return {
                            firstname: data.user.firstname,
                            surname: data.user.surname,
                            username: data.user.username,
                            email: data.user.email,
                            role: data.user.role,
                        };
                    } else {
                        throw new Error(data.message || "Authentication failed");
                    }
                } catch (err) {
                    throw new Error(err.message || "Authentication failed");
                }

            },

        })
    ],
    secret: process.env.SESSION_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 1 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.firstname = user.firstname;
                token.surname = user.surname;
                token.role = user.role;
            }

            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.firstname = token.firstname;
                session.user.surname = token.surname;
                session.user.role = token.role;
            }
            return session;
        },
    }
}

export default NextAuth(authOptions)