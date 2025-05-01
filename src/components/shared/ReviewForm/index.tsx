"use client"

import { StarRating } from "@/components/StarRating";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ReviewForm(obj:any) {
    const[rated, setRated] = useState(0);
    const[comment, setComment] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (e: any) => {
        try {
          e.preventDefault();
          const formData = {
            username: localStorage.getItem("username"),
            obj_id: obj.obj.object,
            content: obj.obj.content,
            comment: comment,
            stars: rated,
          };
        
          console.log(JSON.stringify(formData));
          const response = await fetch('/api/evaluations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
    
          if (!response.ok) 
            throw new Error('Erro ao enviar');
          
          const result = await response.json();
          console.log('Sucesso:', result);
          setRated(0);
          setComment("");
          router.refresh();
    
        } catch (error) {
          console.error('Falha:', error);
        }
      };
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Deixe sua avaliação.</h3>
            <div className="mb-4">
                <StarRating rating={rated} rated={rated} onRated={setRated} votePage={1} />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <textarea className="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Compartilhe a sua experiência..."
                    value={comment}
                    onChange={(e) =>{setComment(e.target.value)} }
                />

                <button
                 className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Send className="w-4 h-4"/>
                    <span>Enviar avaliação</span>
                </button>
        
            </form>
        </div>
    )
}