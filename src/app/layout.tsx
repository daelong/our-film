import type { Metadata } from "next";
import { NextAuthProvider } from "@/app/context/AuthContext";

import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <NextAuthProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </NextAuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
