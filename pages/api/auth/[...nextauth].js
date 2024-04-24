import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsPrividor from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsPrividor({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.username === "admin" &&
          credentials.password === "admin"
        ) {
          return {
            name: "Pet Owner",
            email: "petOwner@pocketpets.com",
          };
        } else {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
