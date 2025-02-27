"use server"

import { cookies } from "next/headers"

const authDomain = process.env.AUTH_DOMAIN;

export async function loginAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await fetch(`${authDomain}/auth/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return { success: false, error: "Credenciais inválidas" };
    }

    const data = await response.json();

    // Definir tokens nos cookies
    cookies().set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false em desenvolvimento
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 horas
      path: "/",
    });

    cookies().set("refresh_token", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false em desenvolvimento
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // 30 dias
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao conectar com o servidor" };
  }
}

export async function refreshTokenAction() {
  const refreshToken = (await cookies()).get('refresh_token')?.value;

  if (!refreshToken) {
    return { success: false, error: 'Nenhum refresh token disponível' };
  }

  try {
    const response = await fetch(`${authDomain}/auth/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || "Falha ao renovar o token" };
    }

    const data = await response.json();

    // Atualizar o access token no cookie
    (await cookies()).set('access_token', data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'strict',
      maxAge: 24 * 60 * 60,
      path: '/',
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao conectar com o servidor' };
  }
}


export async function logoutAction() {
  (await cookies()).delete("access_token");
  (await cookies()).delete("refresh_token");
  return { success: true };
}