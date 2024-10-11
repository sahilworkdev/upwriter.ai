import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  // debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.access_token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SOURCE_URL}/auth/google-login?token=${account.access_token}`,
        );

        if (res.data.status === true) {
            
          const user = res?.data?.genToken?.user;
          const accessToken = res?.data?.genToken?.accessToken;
          const refreshToken = res?.data?.genToken?.refreshToken;

          console.log("data", res.data)

          token.userData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            credits: user.credits,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.userData) {
        session.user = { ...session.user, ...token.userData };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST, handler };
