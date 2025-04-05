import Image from "next/image";
import Link from "next/link";
import { HotelType } from "@/types";
import { StarRating } from "../StarRating";

interface HotelCardProps {
    hotel: HotelType & { averageRating: number };
    cloudinaryName: string;
}

export function HotelCard({ hotel, cloudinaryName }: HotelCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="relative h-48">
                {hotel.images && hotel.images.length > 0? (
                    <Image
                        src={`https://res.cloudinary.com/${cloudinaryName}/${hotel.images[0].image}`}
                        alt={hotel.name}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-500">Sem imagem</span>
                    </div>
                )}
            </div>
            <div className="p-4 flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{hotel.name}</h2>
                <p className="text-sm text-gray-600">{hotel.description}</p>
            </div>

            <StarRating rating={hotel.averageRating ?? 0} />

            <Link
              href={`/hotels/${hotel.id}`}
              className="inline-block w-full py-2 px-4 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 mt-auto"
              aria-label={`Ver detalhes do ${hotel.name}`}
            >
                Ver mais detalhes
            </Link>
        </div>
    )
}