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
    async jwt({ token, account }) {
      if (account && account.access_token) {
        // console.log("access_token",account.access_token);
       try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SOURCE_URL}/user/google-login?token=${account.access_token}`,
        );
        if (res.data.status) {
            
          const user = res?.data?.data;
          const accessToken = res?.data?.accessToken;
          token.userData = user;
          token.accessToken = accessToken;
        }
       } catch (err) {
        const error = err as Error;
        console.error("Error:", error.message);
      }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.accessToken) {
        session.user = { userData: token.userData, accessToken: token.accessToken };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };