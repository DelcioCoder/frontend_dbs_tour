import { cookies } from "next/headers";

export async function CreateCookie(name:string, value:any): Promise<any>{
    const cookie = await cookies();
    cookie.set(name, value, {
      secure: process.env.NODE_ENV === "production", // false em desenvolvimento
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 dia
      path: "/",
    });
}