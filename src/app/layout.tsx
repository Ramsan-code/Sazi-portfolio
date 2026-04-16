import type { Metadata } from "next";
import { Space_Grotesk, Archivo } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sazi | Graphic Designer",
  description: "High-converting Neo-Brutalist graphic designer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${archivo.variable} antialiased bg-obsidian text-white selection:bg-mint selection:text-black min-h-screen overflow-x-hidden flex flex-col font-sans`}
      >
        <Navigation />
        <div className="flex-1 mt-24">
          {children}
        </div>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
