import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SRJ - File Converter",
  description: `Unleash your creativity with Modifio – the ultimate online tool for
  unlimited and free multimedia conversion. Transform images, audio, and
  videos effortlessly, without restrictions. Start converting now and
  elevate your content like never before!`,
  creator: "Sooraj-Rao",
  keywords:
    "image converter, video converter, audio converter, image converter, video converter, jpg to jpeg, png to jpeg ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Navbar/>
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
