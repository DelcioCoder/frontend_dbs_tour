import { HotelType } from "@/types";
import { Evaluation } from "@/types/api";
import { RatingBadge } from "@/components/Rating/RatingBadge";
import { Hotel, Clock } from "lucide-react";

interface HotelInfoProps {
    hotel: HotelType & {
        averageRating: number;
        evaluations: Evaluation[];
    }
    cloudinaryName: string;
}

export default function HotelInfo ({
    hotel, 
    cloudinaryName
}: HotelInfoProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                    {hotel.name}
                </h1>

                <div className="flex items-center space-x-3">
                    <RatingBadge 
                        rating={hotel.averageRating} 
                        count={hotel.evaluations.length} 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                    <Hotel className="w-5 h-5 text-blue-600" />
                    <span>{hotel.description}</span>
                </div>

                <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Abre às {hotel.opening_hours}</span>
                </div>
        
            </div>
        </div>
    )
}