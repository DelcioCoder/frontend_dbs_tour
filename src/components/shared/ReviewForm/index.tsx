"use client"

import { StarRating } from "@/components/StarRating";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";

export default function ReviewForm() {
    const[rated, setRated] = useState(0);
    const[comment, setComment] = useState(" ");
    //const [username, setUsername] = useState(" ");

    /**useEffect(() => {
        const storedName =  localStorage.getItem("username");
        if(storedName)
            setUsername(storedName);
    }, []); */
    function handleSubmit() {
        localStorage.setItem("comment", comment)
        localStorage.setItem("stars", `${rated}`)
    }
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Deixe sua avaliação.</h3>
            <div className="mb-4">
                <StarRating rating={rated} rated={rated} onRated={setRated} votePage={1} />
                <p> {  } </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <textarea className="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Compartilhe a sua experiência..."
                    onChange={() =>{setComment(comment)}}
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