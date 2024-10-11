import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
        id: string | null;
      name: string | null;
      email: string | null;
      image: string | null;
      firstName: string | null;
      lastName: string | null;
      credits: number;
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userData: {
        id: string  | null;
      firstName: string | null;
      lastName: string | null;
      credits: number;
      accessToken: string;
      refreshToken: string;
    };
  }
}
