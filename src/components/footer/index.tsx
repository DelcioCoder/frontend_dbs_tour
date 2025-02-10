import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-10">
      <div className="container mx-auto flex flex-col items-center text-center space-y-4">
        <p className="text-lg font-semibold">DBS-TOUR &copy; 2025</p>

        <nav className="flex space-x-6">
          <Link href="/contact" aria-label="Contacto" className="hover:text-gray-300 underline">
            Deseja Falar Conosco?
          </Link>
          <Link href="/privacy-policy" className="hover:text-gray-300">
            Política de Privacidade
          </Link>
          <Link href="/terms" className="hover:text-gray-300">
            Termos de Uso
          </Link>
        </nav>

        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            Twitter
          </a>
        </div>

        <p className="text-sm text-gray-400">Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
