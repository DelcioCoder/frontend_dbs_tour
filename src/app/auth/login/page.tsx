"use client";

import { useState, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleShowPass = () => setShowPass((prev) => !prev);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.success) {
        router.push("/");
        router.refresh();
      } else if (result.error){
        setError(result.error);
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col justify-center items-center p-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 shadow-md w-full max-w-sm animate-fade-in">
          <p className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        </div>
      )}
      
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Bem-vindo</h2>
          <p className="text-gray-600 mt-1">Entre na sua conta para continuar</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-10 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                Nome de usuário
              </label>
              <input
                placeholder="Digite seu nome de usuário"
                type="text"
                name="username"
                id="username"
                className="w-full border border-gray-300 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Digite sua senha"
                  className="w-full border border-gray-300 bg-gray-50 text-gray-800 text-sm placeholder-gray-400 py-3 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleShowPass}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPass ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm">
                <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Não tem uma conta? Registre-se
                </Link>
              </p>
              <Link href="/auth/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Esqueceu a senha?
              </Link>
            </div>
            
            <button
              type="submit"
              disabled={isPending}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isPending ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
