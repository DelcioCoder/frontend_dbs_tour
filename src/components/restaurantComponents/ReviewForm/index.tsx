"use client"

import { StarRating } from "@/components/StarRating";
import { Send } from "lucide-react";

export default function ReviewForm() {
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Deixe sua avaliação.</h3>
            <div className="mb-4">
                <StarRating rating={0} />
            </div>

            <form className="space-y-4">
                <textarea className="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Compartilhe a sua experiência..."
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