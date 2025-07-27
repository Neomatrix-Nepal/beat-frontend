import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Michroma } from "next/font/google";
import "./globals.css";
import AuthSession from "../components/AuthSession";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Cute Boka Admin",
  description: "Cute Boka Admin Dashboard",
  icons: {
    icon: "./favicon.ico",
  },
};
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  weight: "400",
  variable: "--font-michroma",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable}  bg-[#151515] antialiased`}
      >
        <AuthSession>
          {children}
          <Toaster position="bottom-right" reverseOrder={false} />
        </AuthSession>
      </body>
    </html>
  );
}
