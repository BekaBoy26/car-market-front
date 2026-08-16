import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Layout from "./layout.c";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Marketplace",
  description: "Buy and Sell car easily",
};

export const inter = Inter({
  style: "normal",
  subsets: ["cyrillic", "latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Layout children={children} />
      </body>
    </html>
  );
}
