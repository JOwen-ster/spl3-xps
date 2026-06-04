import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";


const blitzMain = localFont({
  src: '../public/fonts/BlitzMain.otf',
  variable: '--font-blitz',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Spl3 Western XP's",
  description: "The highest xp's for western players in the japan region",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${blitzMain.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
