import { Evaluation } from "@/types/api";
import { StarRating } from "@/components/StarRating";

interface ReviewsListProps {
    evaluations: Evaluation[];
}

export default function ReviewsList({evaluations}: ReviewsListProps) {
    return (
        <div className="space-y-6">
        {evaluations.map((evaluation, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <div className="font-semibold">D.Armando</div>
                  <StarRating rating={evaluation.stars} />
                </div>
              </div>
              <span className="text-sm text-gray-500">3 dias atrás</span>
            </div>
            <p className="text-gray-700">
              {evaluation.comment || "Sem comentário."}
            </p>
          </div>
        ))}
      </div>
    )
}