import Link from 'next/link';
import { Utensils, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4 text-center">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-xl">
        <div className="mb-6 text-orange-500">
          <Utensils size={48} className="mx-auto" />
        </div>
        
        <h1 className="mb-2 text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mb-6 text-2xl font-semibold text-gray-700">Restaurante não encontrado</h2>
        
        <p className="mb-8 text-gray-600">
          Não conseguimos encontrar o restaurante que você está procurando. 
          Ele pode ter sido removido ou o endereço está incorreto.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/restaurants"
            className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-white transition-all hover:bg-orange-600 hover:shadow-md"
          >
            <ArrowLeft size={16} />
            <span>Voltar para restaurantes</span>
          </Link>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
          >
            <Home size={16} />
            <span>Ir para página inicial</span>
          </Link>
        </div>
      </div>
    </main>
  );
}