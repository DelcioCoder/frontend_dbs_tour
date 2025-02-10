"use client";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  const isAuthPage = ["/auth/login", "/auth/register"].includes(pathname);

  return (
    <html lang="pt-pt">
      <body className="antialiased flex flex-col min-h-screen">
        {!isAuthPage && <Navbar />}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
