import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    name?: string;
    token?: string;
    role?: "owner" | "customer";
    id?: number;
  }

  interface Session {
    accessToken?: string;
    user: {
      id?: number | string;
      role?: "owner" | "customer";
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string;
    accessToken?: string;
    role?: "owner" | "customer";
    id?: number | string;
  }
}