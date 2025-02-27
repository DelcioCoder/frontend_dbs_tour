import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="pt-pt">
      <body className="antialiased flex flex-col min-h-screen">
        {<NavbarWrapper />}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
