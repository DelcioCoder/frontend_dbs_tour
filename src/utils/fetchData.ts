import { API_URL } from "@/services";

export default async function fetchData(endpoint: string){
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    const res = await fetch(`${API_URL}/${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok){
        throw new Error(`Falha ao carregar ${endpoint}`);
    }

    return await res.json();
}