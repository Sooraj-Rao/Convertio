import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { MetaData } from "@/utils/helper";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: MetaData.title,
  description: MetaData.description,
  creator: MetaData.creator,
  keywords: MetaData.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={roboto.className}>
        <div className=" sticky top-0">
          <Navbar />
        </div>
        <div className=" text-slate-800">{children}</div>
      </body>
    </html>
  );
}
