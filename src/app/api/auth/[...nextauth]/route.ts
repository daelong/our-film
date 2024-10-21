// app/api/auth/[...nextauth]/route.js

import NextAuth, { AuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
// import { NextApiHandler } from "next";
// import { NextRequest, NextResponse } from "next/server";

// 다른 프로바이더들도 추가할 수 있습니다 (예: GitHub, Facebook 등)

export const authOptions: AuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
      clientSecret: process.env.NEXT_AUTH_KAKAO_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "", // 보안을 위해 secret 설정 필요
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin", // 커스텀 로그인 페이지
  },
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
