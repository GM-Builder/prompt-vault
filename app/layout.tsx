import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompt Vault | 1,000+ AI Prompts",
  description: "Unlock 1,000+ premium AI prompts for ChatGPT, Claude, and Gemini. IDR 8,000 one-time access.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${instrumentSerif.variable}`}>
        <body style={{ margin: 0, fontFamily: "'Geist', system-ui, sans-serif", background: "#fff", color: "#111" }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
