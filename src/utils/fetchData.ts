import { cookies } from "next/headers";
import { refreshTokenAction } from "@/actions/auth";

async function fetchData<T>(endpoint: string, options: RequestInit = { method: "GET" }): Promise<T> {
  const backendDomain = process.env.BACKEND_DOMAIN;
  if (!backendDomain) {
    throw new Error("BACKEND_DOMAIN não está definido no .env");
  }

  const fetchWithToken = async (token: string | undefined) => {
    return await fetch(`${backendDomain}/${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...(options.headers || {}),
      },
      cache: "no-store",
    });
  };

  // Aguardar os cookies antes de acessar o token
  const token = (await cookies()).get("access_token")?.value;
  let res = await fetchWithToken(token);

  // Se o token expirou (401), tenta renovar
  if (res.status === 401) {
    const refreshResult = await refreshTokenAction();
    if (!refreshResult.success) {
      throw new Error(refreshResult.error || "Erro ao renovar a sessão");
    }

    // Obtém o novo token após a renovação
    const newToken = (await cookies()).get("access_token")?.value;
    res = await fetchWithToken(newToken); // Tenta novamente
  }

  if (!res.ok) {
    throw new Error(`Falha ao carregar ${endpoint}: ${res.statusText}`);
  }

  return await res.json();
}

export default fetchData;