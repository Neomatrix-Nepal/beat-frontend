import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAction } from "../../actions/form-actions";
import { refreshAccessToken } from "@/src/lib/refreshToken";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const res = await loginAction({
          email: credentials.email,
          password: credentials.password,
        });

        if (!res || !res?.user || res?.user?.roles !== "admin") return null;

        return {
          id: res.user.id,
          name: res.user.fullname,
          email: res.user.email,
          role: res.user.roles,
          tokens: {
            accessToken: res.tokens.accessToken,
            refreshToken: res.tokens.refreshToken,
          },
          accessTokenExpires: Date.now() + 55 * 60 * 1000, // 55 min (backend access token TTL is 1h)
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  cookies: {
    sessionToken: {
      name: "admin.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },

    callbackUrl: {
      name: "admin.callback-url",
      options: {
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },

    csrfToken: {
      name: "admin.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          accessToken: user.tokens.accessToken,
          refreshToken: user.tokens.refreshToken,
          accessTokenExpires: (user as any).accessTokenExpires,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      const refreshedToken = await refreshAccessToken(token);
      return { ...token, ...refreshedToken };
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role as string,
          tokens: {
            accessToken: token.accessToken as string,
            refreshToken: token.refreshToken as string,
          },
          accessTokenExpires: token.accessTokenExpires as number,
        };
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
