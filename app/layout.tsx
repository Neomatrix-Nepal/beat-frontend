
import type { Metadata } from "next";
import { Geist, Geist_Mono, } from "next/font/google";
import { Michroma } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/toaster";
 const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: 'Your App',
  description: 'Description here',
  icons: {
    icon: './favicon.ico',
  },
}
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
