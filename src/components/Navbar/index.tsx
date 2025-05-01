"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import LogoutButton from "../LogoutButton";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";


export default function Navbar({ isAuthenticated }: Readonly<{ isAuthenticated: boolean }>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [params, setParams] = useState("")
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = ["/auth/login", "/auth/register"].includes(pathname);

  if (isAuthPage) {
    return null;
  }

  const handleSubmit = async(event : any): Promise<void> =>{
    event.preventDefault();
    if(params !== ""){
      router.push(`/search?q=${params}`);
      setParams("")
      if(menuOpen)
        setMenuOpen(false)
    }else{
      alert("Informe os dados para a pesquisa!")
    }
  }

  return (
    <header className="bg-gray-900 text-white shadow-lg p-3">
      <nav className="container mx-auto flex items-center justify-between space-x-3 py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
            aria-label="Go to homepage"
          >
            <div className="relative h-10 w-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
              <span className="text-2xl">🌴</span>
              <div className="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                DBS-TOUR
              </span>
              <span className="text-xs text-gray-400 -mt-1">Descubra Angola</span>
            </div>
          </Link>
        </div>

        {/* Search input */}
        <div className="hidden md:flex items-center w-1/2">
          <form className="relative w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Encontre restaurantes, hotéis..."
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e) => setParams(e.target.value)}
              value={params}
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-blue-800 focus:outline-none"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Links de Navegação */}
        <div className="hidden md:flex justify-center items-center space-x-6 text-sm">
          <Link
            href="/"
            className="hover:text-yellow-300 transition-colors"
            aria-label="Go to Home"
          >
            Início
          </Link>
          <Link
            href="/restaurants"
            className="hover:text-yellow-300 transition-colors"
            aria-label="Explore Restaurants"
          >
            Restaurantes
          </Link>
          <Link
            href="/hotels"
            className="hover:text-yellow-300 transition-colors"
            aria-label="Explore Hotels"
          >
            Hotéis
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-300 transition-colors"
            aria-label="Contact Us"
          >
            Contacto
          </Link>
          {/* Renderiza Logout ou Entrar conforme o estado */}
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <Link href="auth/login" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              <LogIn className="w-5 h-5" />
              <span>Login</span>

            </Link>
          )}

        </div>

        {/* Mobile menu toggle */}
        <button
          className="block md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <Menu className="w-6 h-6 transition-transform" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="container mx-auto flex flex-col space-y-4 p-6">
            <Link
              href="/"
              className="hover:text-yellow-300 transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Go to Home"
            >
              Início
            </Link>
            <Link
              href="/restaurants"
              className="hover:text-yellow-300 transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Explore Restaurants"
            >
              Restaurantes
            </Link>
            <Link
              href="/hotels"
              className="hover:text-yellow-300 transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Explore Hotels"
            >
              Hotéis
            </Link>
            <Link
              href="/contact"
              className="hover:text-yellow-300 transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Contact Us"
            >
              Contacto
            </Link>

            {/* Botão de Entrar ou Logout no menu mobile */}
            <div className="pt-2 border-t border-gray-700">
              {isAuthenticated ? (
                <div onClick={() => setMenuOpen(false)}>
                  <LogoutButton />
                </div>
              ) : (
                <Link
                  href="auth/login"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>



            <form className="relative w-full" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Pesquisar..."
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={(e) => setParams(e.target.value)}
                value={params}
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-blue-800 focus:outline-none"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
