import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UserProfile } from "../../../../common.types";
import { createUser, getUser } from "@/services/userService";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        // const data = await getUser(email) as UserProfile

        const newSession = {
          ...session,
          user: {
            ...session.user,
            // ...data
          },
        };

        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        console.log("SignIn initialized");
        const userExists = false; // Call endpoint to find user

        if (!userExists) {
          // Call endpoint to create user
          const user: UserProfile = {
            userType: "",
            name: (profile as any)?.name,
            profilePhoto: (profile as any)?.picture,
            email: (profile as any)?.email,
            telephone: "",
            webSite: "",
          };

          // await createUser(user, (profile as any)?.sub);
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
