import { authServices } from "@/domain/services/authService";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        const data = await authServices.login({
          username: credentials.username,
          password: credentials.password,
        });

        if (!data) return null;

        const role = data?.user?.is_staff ? "owner" : "customer";
        return {
          id: data?.user.id,
          name: data?.user.username,
          email: data?.user.email,
          token: data?.token,
          role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
        token.username = user.name;
        token.userId = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      console.log(session)
      console.log(token)
      if (!session.user) {
        session.user = {} as any;
      }
      session.user.name = token.username as string;
      session.user.email = token.email as string;
      session.user.role = token.role as "owner" | "customer";
      session.user.id = token.userId as string;

      session.accessToken = token.accessToken as string;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages:{
    signIn:"/login"
  }
});

export { handler as GET, handler as POST };