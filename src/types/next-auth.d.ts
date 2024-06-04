import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      first_name: string;
      username: string;
      photo_url: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    first_name: string;
    username: string;
    photo_url: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    first_name: string;
    username: string;
    photo_url: string;
  }
}
