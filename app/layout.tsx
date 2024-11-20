import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "To-Do List",
  description: "A simple and elegant to-do list application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Providers>
          <Navbar />
          <main className="container mx-auto max-w-4xl">{children}</main>
        </Providers>
      </body>
    </html>
  );
}