export default async function fetchData(endpoint: string){
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    const backend_domain = process.env.BACKEND_DOMAIN;
    const res = await fetch(`${backend_domain}/${endpoint}`, {
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