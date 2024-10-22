import NextAuth, { DefaultSession } from "next-auth";

type userData = {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
  firstName: string | null;
  lastName: string | null;
  credits: number;
};
declare module "next-auth" {
  interface Session {
    user: {
      userData: userData;
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userData: userData;
    accessToken: string;
  }
}
