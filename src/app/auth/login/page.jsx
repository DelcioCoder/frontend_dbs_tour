"use client"
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";


export default function Login() {
  const [ShowPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!ShowPass);
  }
  return (
    <div className=" bg-gray-200 h-screen flex flex-col justify-center items-center">
      <h2 className=" text-center font-extrabold text-xl my-5 ">Login</h2>

      <form className="bg-white flex flex-col justify-start px-4 py-8 shadow rounded-md space-y-5 w-80 max-w-md mx-auto ">
        <div className=" space-y-2 ">
          <label className="block text-sm text-gray-800 " htmlFor="username">
            Username:
          </label>
          <input
            placeholder="Username"
            type="text"
            name="username"
            id="username"
            className="w-full border border-gray-300 bg-white text-gray-800 text-sm placehoder-gray-300 py-2 px-3 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out "
          />
        </div>
        <div className=" space-y-2 ">
          <label className=" block text-sm text-gray-800 " htmlFor="password">
            Password:
          </label>
          <div className="relative" >
            <input
              type={ ShowPass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full border border-gray-300 bg-white text-gray-800 text-sm placehoder-gray-300 py-2 px-3 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out "
            />
            <button type="button" onClick={handleShowPass} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 " > { ShowPass ? <EyeOff className=" size-4" /> : <Eye className="size-4" /> } </button>
          </div>
          
        </div>
        <p className=" text-gray-800 text-sm hover:underline ">
          <Link href="/auth/register">Não tem uma conta? Registra-te</Link>
        </p>
        <input 
        type="submit" 
        className="btn btn-primary bg-blue-500 text-white hover:bg-blue-600 py-2 px-3 rounded-md cursor-pointer " 
        value="Entrar"/>
      </form>
    </div>
  );
}
