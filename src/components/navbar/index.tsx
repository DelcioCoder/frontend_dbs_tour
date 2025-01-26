"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-lg">
    <nav className="container mx-auto flex items-center justify-between py-4 px-6">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link href="/" aria-label="Go to homepage">
          🌴 Belas Explorer
        </Link>
      </div>
  
      {/* Search input */}
      <div className="hidden md:flex items-center w-1/2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Encontre restaurantes, hotéis..."
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            aria-label="Search"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-blue-800 focus:outline-none"
            onClick={() => alert("Buscando...")}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
  
      {/* Links */}
      <div className="hidden md:flex space-x-6 text-sm">
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
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              aria-label="Search"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-blue-800 focus:outline-none"
              onClick={() => alert("Buscando...")}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )}
  </header>
  
  );
}
