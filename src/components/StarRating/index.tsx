"use client";
interface StarRatingProps {
    rating: number;
    rated?: number;
    votePage?: number;
    onRated?: (star: number) => void;
}


export function StarRating({ rating, rated=0, onRated, votePage }: StarRatingProps) {
    return (
        <div className="flex items-center gap-1 p-1" 
            aria-label={`Avaliação média: ${rating?.toFixed(1)} estrelas`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-xl ${star <= Math.round(rating) ? votePage == 1 ? "text-yellow-500 cursor-pointer": "text-yellow-500" : votePage == 1 ? "text-gray-300 hover:text-yellow-500 cursor-pointer" : "text-gray-300"
                        }`}
                    aria-hidden="true"
                    onClick={ () => onRated?.(star) }
                >
                    ★
                </span>
            ))}
            <span className="text-sm text-gray-500 ml-2">({rating.toFixed(1)})</span>
        </div>
    );

}