"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerAction } from "@/actions/auth";
import { Eye, EyeOff, User, Mail, KeyRound, Check } from "lucide-react";
import Link from "next/link";

const schema = z
  .object({
    username: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "As senhas não coincidem",
    path: ["password2"],
  });

type RegisterFormData = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const result = await registerAction(data);

      if (!result.success && result.error) {
        Object.keys(result.error).forEach((field) => {
          setError(field as keyof RegisterFormData, {
            type: "server",
            message: result.error[field][0],
          });
        });
      } else {
        router.push("/");
        localStorage.setItem("username", data.username);
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Criar Conta</h2>
          <p className="text-gray-600 mt-1">Preencha os dados para se registrar</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                Nome de usuário
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <User className="size-5" />
                </span>
                <input
                  type="text"
                  id="username"
                  placeholder="Digite seu nome de usuário"
                  className={`w-full border ${errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'} text-gray-800 text-sm placeholder-gray-400 py-3 pl-10 pr-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1 flex items-start">
                  <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="size-5" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Digite seu e-mail"
                  className={`w-full border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'} text-gray-800 text-sm placeholder-gray-400 py-3 pl-10 pr-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-start">
                  <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Senha
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <KeyRound className="size-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Digite sua senha"
                  className={`w-full border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'} text-gray-800 text-sm placeholder-gray-400 py-3 pl-10 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-start">
                  <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password.message}
                </p>
              )}
              <p className="text-xs text-gray-500 pl-2">
                A senha deve ter pelo menos 6 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password2">
                Confirme a Senha
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Check className="size-5" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="password2"
                  placeholder="Confirme sua senha"
                  className={`w-full border ${errors.password2 ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'} text-gray-800 text-sm placeholder-gray-400 py-3 pl-10 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  {...register("password2")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              {errors.password2 && (
                <p className="text-red-500 text-sm mt-1 flex items-start">
                  <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password2.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-1 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrando...
                </span>
              ) : "Criar Conta"}
            </button>
          </form>
          
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Entrar
              </Link>
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Ao criar uma conta, você concorda com nossos{" "}
            <a href="#" className="text-blue-600 hover:underline">Termos de Serviço</a>{" "}
            e{" "}
            <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
}