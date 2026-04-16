import type { Metadata } from "next";
import { Space_Grotesk, Archivo } from "next/font/google";
import "./globals.css";

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
  description: "Neo-brutalist graphic designer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${archivo.variable} antialiased bg-[#0b0b0b] text-white selection:bg-[#3eb489] selection:text-black min-h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
