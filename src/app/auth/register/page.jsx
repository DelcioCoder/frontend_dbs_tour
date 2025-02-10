"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password_2, setPassword_2] = useState("");
  const [ShowPass_1, setShowPass_1] = useState(false);
  const [ShowPass_2, setShowPass_2] = useState(false);
  const [igual, setIgual] = useState(false);

  useEffect(() => {
    if (password_2 !== "" && password_2 !== password) {
      setIgual(true);
    } else {
      setIgual(false);
    }
  }, [password, password_2]);

  const prevention = (e) => {
    e.preventDefault();
  };

  const handlePass_1View = () => {
    setShowPass_1(!ShowPass_1);
  };
  const handlePass_2View = () => {
    setShowPass_2(!ShowPass_2);
  };

  return (
    <div className=" bg-gray-200 h-screen flex flex-col justify-center items-center">
      <h2 className=" text-center font-extrabold text-xl my-5 ">Register</h2>

      <form
        onSubmit={prevention}
        className="bg-white flex flex-col justify-start px-4 py-8 shadow rounded-md space-y-5 w-80 max-w-md mx-auto "
      >
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
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className=" space-y-2 ">
          <label className=" block text-sm text-gray-800 " htmlFor="password">
            Password:
          </label>
          <div className="relative">
            <input
              type={ShowPass_1 ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full border border-gray-300 bg-white text-gray-800 text-sm placehoder-gray-300 py-2 px-3 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out "
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={handlePass_1View}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white px-1"
            >
              {" "}
              {ShowPass_1 ? <EyeOff className="size-4" /> : <Eye className="size-4" />}{" "}
            </button>
          </div>
        </div>
        <div className=" space-y-2 ">
          <label className=" block text-sm text-gray-800 " htmlFor="password_2">
            Confirme a password:
          </label>
          <div className="relative">
            <input
              type={ShowPass_2 ? "text" : "password"}
              name="password_2"
              id="password_2"
              placeholder="Password"
              className="w-full border border-gray-300 bg-white text-gray-800 text-sm placehoder-gray-300 py-2 px-3 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out "
              onChange={(e) => {
                setPassword_2(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={handlePass_2View}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white px-1"
            >
              {" "}
              {ShowPass_2 ? <EyeOff className="size-4" /> : <Eye className="size-4" />}{" "}
            </button>
          </div>

          {igual && (
            <p className="ml-2 text-red-500 text-[12px] flex items-center">
              <AlertCircle className=" mr-2 text-[12px] " />A palavras passe
              devem ser iguais
            </p>
          )}
        </div>
        <p className=" text-gray-800 text-sm hover:underline ">
          <Link href="/auth/login">Já tem uma conta? Faça o Login</Link>
        </p>
        <input
          type="button"
          className="btn btn-primary bg-blue-500 text-white hover:bg-blue-600 py-2 px-3 rounded-md cursor-pointer"
          value="Entrar"
        />
      </form>
    </div>
  );
}
