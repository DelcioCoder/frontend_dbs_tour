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
    const cookieStore = await cookies();
    cookieStore.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false em desenvolvimento
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 dia
      path: "/",
    });

    cookieStore.set("refresh_token", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false em desenvolvimento
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao conectar com o servidor" };
  }
}

type RegisterData = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

export async function registerAction(data: RegisterData) {
  const { username, email, password, password2 } = data;

  try {
    const response = await fetch(`${authDomain}/auth/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, password2 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData };
    }

    const dataResponse = await response.json();
    const cookieStore = await cookies();
    cookieStore.set("access_token", dataResponse.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    cookieStore.set("refresh_token", dataResponse.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return { success: true };

  } catch (error) {
    return { success: false, error: "Erro ao conectar com o servidor" };
  }
}


export async function refreshTokenAction() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh_token')?.value;

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
    cookieStore.set('access_token', data.access, {
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
  const cookieStore = await cookies()

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  return { success: true };
}