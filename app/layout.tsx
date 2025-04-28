import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoQuest Wallet - Join the Adventure",
  description: "Begin your financial adventure with CryptoQuest Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='grid grid-cols-3'>
          <div className='col-span-2'>{children}</div>
          <div className='col-span-1'>Placeholder for wallet</div>
        </main>
      </body>
    </html>
  );
}
