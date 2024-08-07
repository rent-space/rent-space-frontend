import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/utils/types";
import { createUser, getUser } from "@/services/api/user";
import { toast } from "react-toastify";

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
            ...(user.id && user),
          },
        };

        return newSession;
      } catch (error: any) {
        toast.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ profile }) {
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

        const userInDatabase: User = await getUser(profile.email);
        if (!userInDatabase) {
          const newUser: User = {
            name: profile.name,
            email: profile.email,
            profilePhoto: profile.image || "",
            telephone: "",
            userType: "",
            webSite: ""
          };
          await createUser(newUser)
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
