"use client"

import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";

export default function TokenExpiredPopup() {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/auth/login");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-200 transform transition-all">
                <div className="flex items-start gap-4">
                    {/* Ícone com destaque */}
                    <div className="bg-red-100 p-3 rounded-full shadow-sm">
                        <TriangleAlert 
                            size={28} 
                            className="text-red-600 animate-pulse" 
                        />
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            Sessão Expirada
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Sua sessão de autenticação expirou. Por favor, faça login novamente para continuar acessando o sistema.
                        </p>

                        {/* Botão com transição suave */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleLogin}
                                className="px-6 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Refazer Login
                                <span className="ml-2" aria-hidden="true">→</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Linha decorativa */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600/20 via-red-600/20 to-yellow-600/20 rounded-b-2xl"></div>
            </div>
        </div>
    )
}