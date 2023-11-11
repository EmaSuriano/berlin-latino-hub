import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import SideNav from "./sidebar/sidenav";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Latino Berlin Hub",
  description:
    "The place to find all relevant info of the Latino World in Berlin",
  metadataBase: new URL("https://berlin-latino-hub.vercel.app/"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow py-4 md:overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
