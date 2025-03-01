import Link from 'next/link';
import { MapPin, Search, ArrowLeft, Home } from 'lucide-react';
import  Goback  from '@/components/Goback';

export default function NotFound() {
    return (
        <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 text-center">
            <div className="max-w-lg rounded-lg bg-white p-8 shadow-xl">
                <div className="relative mb-8 flex justify-center">
                    <MapPin size={64} className="text-gray-200" />
                    <Search size={36} className="absolute bottom-0 right-1/3 text-blue-500" strokeWidth={2.5} />
                </div>

                <h1 className="mb-2 text-6xl font-bold text-gray-800">404</h1>
                <h2 className="mb-6 text-2xl font-semibold text-gray-700">Página não encontrada</h2>

                <p className="mb-4 text-gray-600">
                    Oops! Parece que você se perdeu.
                </p>
                <p className="mb-8 text-gray-600">
                    Não conseguimos encontrar a página que você está procurando.
                    O endereço pode estar incorreto ou a página pode ter sido movida.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Goback />

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
                    >
                        <Home size={16} />
                        <span>Ir para página inicial</span>
                    </Link>
                </div>
            </div>

            <div className="mt-8 text-sm text-gray-500">
                <p>Se você acredita que isso é um erro, por favor entre em contato com nosso suporte.</p>
            </div>
        </main>
    );
}