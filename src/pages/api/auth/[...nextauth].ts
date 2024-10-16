import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  //adapter: PrismaAdapter(prisma),
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async signIn({ account }) {
      if (account?.provider === "google") {
        if (
          !account?.scope?.includes("https://www.googleapis.com/auth/calendar")
        ) {
          return "/register/connect-calendar/?error=permissions";
        }
      }
      return true;
    },

    session: ({ session, user }) => {
      return {
        ...session,
        user,
      };
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          response_type: "code",
          access_type: "offline",
          scope:
            "https://mail.google.com/  https://www.googleapis.com/auth/calendar",
        },
        // https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.id,
          name: profile.name,
          username: "",
          email: profile.email,
          avatar_url: profile.avatar_url,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
