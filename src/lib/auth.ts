import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid credentials";
}

const authConfig: NextAuthConfig = {
  providers: [
    // if you using Normal credentials Auth username and password from the db
    Credentials({
      name: "Credentials",
      credentials: {
        login: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.BASE_URL}/i-hide-the-real-end-point`, {
          method: "POST",
          body: JSON.stringify({
            login: credentials?.login,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const payload: LoginResponse = await response.json();

        if ("error" in payload) {
          throw new InvalidLoginError();
        }

        // Return the user to be encoded using JWT callback
        return {
          id: payload.user.id.toString(),
          token: payload.token,
          user: payload.user,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
        token.user = user.user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      session.token = token.accessToken;
      return session;
    },

    // True if the user is authenticated to make it can go through the middleware, next js will call this function when the user try to gose to a protected route on the matcher
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
