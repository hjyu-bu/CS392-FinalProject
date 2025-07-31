import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Header  from "@/components/Header";

export const metadata: Metadata = {
  title: "Final Project",
  description: "CS392 Final Project",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Header/>
        {children}
      </body>
    </html>
  );
}
