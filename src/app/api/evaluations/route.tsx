//import  fetchData from '@/utils/fetchData';
import { NextResponse } from 'next/server';
const backDomain = process.env.BACKEND_DOMAIN;
export async function SendEval(request: Request) {
  
    try {
        const username = localStorage.getItem("username");
        const obj_id = localStorage.getItem("obj_id");
        const content_type = localStorage.getItem("content_type");
        const comment = localStorage.getItem("comment");
        const stars = localStorage.getItem("rated");
        var id;
        
        //getting all users
        const response1 = await fetch(`${backDomain}/users`);
        const users = response1.json();

        //getting the right id of the user
        users.then((users) => {
            users.forEach((user: any) => {
                if(user.username == username){
                    id = user.id;
                }
            })
        })

        fetch(`${backDomain}/api/evaluations/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ obj_id, comment, stars, id, content_type }),
        })
    } catch (error) {
        return NextResponse.json({ error: 'Falha ao enviar o comentário' }, { status: 500 });
    }
}