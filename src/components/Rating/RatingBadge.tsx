import { StarRating } from "../StarRating";
export const RatingBadge = ({ rating, count }: { rating: number; count: number }) => (
    <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
      <span className="text-2xl font-bold text-blue-600">
        {rating.toFixed(1)}
      </span>
      <div>
        <StarRating rating={rating} />
        <span className="text-sm text-gray-500">
          ({count} {count === 1 ? 'avaliação' : 'avaliações'})
        </span>
      </div>
    </div>
);