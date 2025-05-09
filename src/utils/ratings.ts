import { Evaluation } from "@/types/api";

export function calculateAverageRating(evaluations: Evaluation[]): number {
    if (evaluations.length == 0) return 0;
    
    const total = evaluations.reduce((sum, evaluation) => sum + evaluation.stars, 0);
    
    return total / evaluations.length;
}


