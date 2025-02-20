import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth, { SessionStrategy } from "next-auth";
import Kakao from "next-auth/providers/kakao";

export const authOptions = {
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async redirect({ url, baseUrl }: any) {
      return `${baseUrl}/app/dashboard`;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
