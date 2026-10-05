import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Tutor in Sri Lanka | Personalised Learning | Dixi",
    template: "%s | Dixi",
  },

  description:
    "Looking for the best AI tutor in Sri Lanka? Try Dixi for personalised AI tutoring, voice-assisted learning and real-time study support at your own pace.",

  icons: {
    icon: "/logo-2.png",
  },
  verification: {
    google: "lthYtm3-HxBbVSDUzJ3YXkFNztsrHLo_Ed3B-C39J2s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#fe5933",
            },
          }}
        >
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
