import Image from "next/image";
import Link from "next/link";
import { RestaurantType } from "@/types";
import { StarRating } from "../StarRating";


interface RestaurantCardProps {
    restaurant: RestaurantType & { averageRating?: number | null };
    cloudinaryName: string;
}


export function RestaurantCard({ restaurant, cloudinaryName }: RestaurantCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="relative h-48">
                {restaurant.image? (
                    <Image
                        src={`https://res.cloudinary.com/${cloudinaryName}/${restaurant.image[0].image}`}
                        alt={restaurant.name}
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
                <h2 className="text-xl font-semibold text-gray-800">{restaurant.name}</h2>
                <p className="text-sm text-justify leading-relaxed text-gray-600">{restaurant.description?.slice(0, 100) + "..."}</p>
            </div>

            <StarRating rating={restaurant.averageRating != null ? restaurant.averageRating: 0} />

            <Link
                href={`/restaurants/${restaurant.id}`}
                className="inline-block w-full py-2 px-4 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 mt-auto"
                aria-label={`Ver detalhes do ${restaurant.name}`}
            >
                Ver mais detalhes
            </Link>
        </div>
    );
}