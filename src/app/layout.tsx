import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../providers/ThemeProvider"
import {
  ClerkProvider
} from '@clerk/nextjs'
import LayoutProvider from "@/providers/LayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InstaChat-A social media app",
  description: "A social media app to share photos and videos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
        <LayoutProvider>{children}</LayoutProvider>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
