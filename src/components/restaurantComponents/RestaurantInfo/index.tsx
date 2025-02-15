import { RestaurantType } from "@/types";
import { Evaluation } from "@/types/api";
import { RatingBadge } from "@/components/Rating/RatingBadge";
import { Utensils, Clock } from "lucide-react";

interface RestaurantInfoProps {
    restaurant: RestaurantType & {
        averageRating: number;
        evaluations: Evaluation[];
    }
}
export default function RestaurantInfo({restaurant}: RestaurantInfoProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                    {restaurant.name}
                </h1>

                <div className="flex items-center space-x-3">
                    <RatingBadge 
                        rating={restaurant.averageRating} 
                        count={restaurant.evaluations.length} 
                    />
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                    <Utensils className="w-5 h-5 text-blue-600" />
                    <span>{restaurant.description}</span>
                </div>

                <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Abre às {restaurant.opening_hours}</span>
                </div>
            </div>
        </div>
    )
}