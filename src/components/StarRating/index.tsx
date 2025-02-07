interface StarRatingProps {
    rating: number;
}


export function StarRating({ rating }: StarRatingProps) {
    return (
        <div className="flex items-center gap-1 p-4"
            aria-label={`Avaliação média: ${rating.toFixed(1)} estrelas`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-xl ${star <= Math.round(rating) ? "text-yellow-500" : "text-gray-300"
                        }`}
                    aria-hidden="true"
                >
                    ★
                </span>
            ))}
            <span className="text-sm text-gray-500 ml-2">({rating.toFixed(1)})</span>
        </div>
    );

}