import NextAuth, { type DefaultSession, type DefaultJWT } from "next-auth";

declare module "next-auth" {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    supabaseAccessToken?: string;
    user: {
      // The user's postal address
      address: string;
      id?: string;
    } & DefaultSession["user"];
    accessToken?: string;
    error?: "RefreshTokenError";
  }
  interface Profile {
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
  }
}
