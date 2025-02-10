"use client";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log(pathname)
  let isAuthPage = false
  if (pathname === '/auth/login' || pathname === '/auth/register'){
    isAuthPage = true
  }
  console.log(isAuthPage)
  return (
    <html lang="pt-pt">
      <body className={`antialiased`}>
        {!isAuthPage && <Navbar />}
        <div className=" min-h-[60vh]"> {children} </div>
        <Footer />
      </body>
    </html>
  );
}
