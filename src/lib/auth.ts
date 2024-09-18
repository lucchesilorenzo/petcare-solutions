import prisma from "./db";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authFormSchema } from "./validations";

const authOptions: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login

        // validation
        const valdidatedCredentials = authFormSchema.safeParse(credentials);
        if (!valdidatedCredentials.success) return null;

        // extract values
        const { email, password } = valdidatedCredentials.data;

        // find user
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) return null;

        // compare passwords
        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      // runs on every request with middleware

      // check if user is logged in
      const isLoggedIn = !!auth?.user;

      // check if user is trying to access app route
      const isTryingToAccessApp = request.nextUrl.pathname.startsWith("/app");

      if (!isLoggedIn && isTryingToAccessApp) return false;

      if (isLoggedIn && isTryingToAccessApp) return true;

      if (isLoggedIn && !isTryingToAccessApp) {
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }

      if (!isLoggedIn && !isTryingToAccessApp) return true;

      return false;
    },
    // adds user id to token when user logs in
    jwt: ({ token, user }) => {
      if (user) {
        // on sign in
        token.userId = user.id; // token.sub also stores the user id by default
      }

      return token;
    },
    // adds user id to the session
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }

      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authOptions);
