import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      userType: string,
      telephone: string,
      website: string
    } & DefaultSession
  }

  interface User extends DefaultUser {
    userType: string,
    telephone: string,
    website: string
  }
}