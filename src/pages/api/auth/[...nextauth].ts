import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";
import { api } from "@/lib/axios";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
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
            "https://www.googleapis.com/auth/userinfo.email " +
            "https://www.googleapis.com/auth/userinfo.profile " +
            "https://mail.google.com/ " +
            "https://www.googleapis.com/auth/calendar " +
            // "https://www.googleapis.com/auth/gmail.addons.current.action.compose " +
            // "https://www.googleapis.com/auth/gmail.addons.current.message.action " +
            // "https://www.googleapis.com/auth/gmail.addons.current.message.metadata " +
            "https://www.googleapis.com/auth/gmail.addons.current.message.readonly " +
            // "https://www.googleapis.com/auth/gmail.compose " +
            // "https://www.googleapis.com/auth/gmail.insert " +
            "https://www.googleapis.com/auth/gmail.labels ",
          // "https://www.googleapis.com/auth/gmail.metadata " +
          // "https://www.googleapis.com/auth/gmail.modify " +
          // "https://www.googleapis.com/auth/gmail.readonly " +
          // "https://www.googleapis.com/auth/gmail.send " +
          // "https://www.googleapis.com/auth/gmail.settings.basic " +
          // "https://www.googleapis.com/auth/gmail.settings.sharing ",
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      // O nome a ser exibido no formulário de login (por exemplo, "Entrar com...")
      name: "Credentials",
      // `credenciais` é usado para gerar um formulário na página de login.
      // Você pode especificar quais campos devem ser enviados adicionando chaves ao objeto `credenciais`.
      // por exemplo domínio, nome de usuário, senha, token 2FA, etc.
      // Você pode passar qualquer atributo HTML para a tag <input> através do objeto.
      credentials: {
        email: { label: "email", type: "text", placeholder: "Seu email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Sua senha",
        },
      },
      async authorize(credentials) {
        try {
          const user = await api.post("/user/login", {
            email: credentials?.email,
            password: credentials?.password,
          });
          if (user) {
            const userAccount = user.data;
            return userAccount;
          }
        } catch (error) {
          throw new Error(
            "Não foi possível fazer login. Verifique seu email e senha."
          );
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
