import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
export async function POST(request: NextRequest) {
    try {
      const Cookie = await cookies()  
      const token = Cookie.get("access_token")?.value;
      const backDomain = process.env.BACKEND_DOMAIN;
  
      // Validação do token
      if (!token) {
        console.error("Erro: Token não encontrado");
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }
  
      // Receber dados
      const body = await request.json();
      console.log("Dados recebidos:", body);
  
      // Validação de dados
      if (!body.username || !body.obj_id || !body.stars) {
        console.error("Dados incompletos:", body);
        return NextResponse.json(
          { error: "Dados obrigatórios faltando" },
          { status: 400 }
        );
      }
  
      // Buscar usuários
      console.log("Buscando usuários...");
      const usersResponse = await fetch(`${backDomain}/users/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        cache: "no-store"
      });
  
      if (!usersResponse.ok) {
        const error = await usersResponse.text();
        console.error("Erro ao buscar usuários:", error);
        return NextResponse.json(
          { error: "Falha ao buscar usuários" },
          { status: usersResponse.status }
        );
      }
  
      const users = await usersResponse.json();
      console.log("Usuários encontrados:", users);
  
      // Buscar usuário específico
      const user = users.results.find((u: any) => u.username === body.username);
      if (!user) {
        console.error("Usuário não encontrado:", body.username);
        return NextResponse.json(
          { error: "Usuário não encontrado" },
          { status: 404 }
        );
      }
      console.log("Usuário encontrado:", user.id);
  
      // Enviar avaliação
      console.log("Enviando avaliação...");
      const evaluationResponse = await fetch(`${backDomain}/evaluations/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          object_id: Number(body.obj_id),
          comment: body.comment,
          stars: Number(body.stars),
          user: user.id,
          content_type: Number(body.content)
        }),
      });
  
      if (!evaluationResponse.ok) {
        const errorData = await evaluationResponse.json();
        console.error("Erro ao enviar avaliação:", errorData);
        return NextResponse.json(
          { error: errorData.detail || "Erro no backend" },
          { status: evaluationResponse.status }
        );
      }
  
      console.log("Avaliação enviada com sucesso!");
      return NextResponse.json(await evaluationResponse.json());
  
    } catch (error: any) {
      console.error("Erro geral:", error);
      return NextResponse.json(
        { error: error.message || "Erro interno" },
        { status: 500 }
      );
    }
  }