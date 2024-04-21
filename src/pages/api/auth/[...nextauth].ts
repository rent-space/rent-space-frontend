import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/utils/types";
import { createUser, getUser } from "@/services/api/userService";

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const email = session?.user?.email ?? "";
        const user: User = await getUser(email);

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...(user.id && { id: user.id }),
          },
        };

        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ profile, ...rest }) {
      try {
        if (!profile) {
          throw new Error("Empty profile while trying to sign in");
        }

        if (!profile.name) {
          throw new Error("Empty name while trying to sign in");
        }

        if (!profile.email) {
          throw new Error("Empty email while trying to sign in");
        }
        
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
