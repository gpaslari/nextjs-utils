import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/default.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next App Utils by GP",
  description: "Collection of useful functionalities for NextJS App building",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">{children}</main>
      </body>
    </html>
);
}
