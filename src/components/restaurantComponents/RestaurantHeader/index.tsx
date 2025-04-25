import { RestaurantType, ImageType } from "@/types"
import { Evaluation } from "@/types/api";
import MainImage from "../../shared/MainImage";
import { MapPinned } from "lucide-react";
import map from "./map.jpg"
import Image from "next/image";

interface RestaurantHeaderProps {
    restaurant: RestaurantType & {
        images: ImageType[];
        averageRating: number;
        evaluations: Evaluation[];
    }
    cloudinaryName: string;
    kind: string;
}

export default function RestaurantHeader({
    restaurant,
    cloudinaryName,
    kind
}: RestaurantHeaderProps) {
    return (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Imagem principal */}
            <div className="md:col-span-2">
                {restaurant.images.length > 0 ? (
                    <MainImage
                        image={restaurant.images[0].image}
                        alt={restaurant.name}
                        cloudinaryName={cloudinaryName}
                    />
                ) : (
                    <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Sem imagem disponível</span>
                    </div>
                )}
            </div>
            {kind === "res" &&(
            <div className="flex justify-center items-center relative overflow-hidden rounded group hover:opacity-90 " >
                <Image
                    src={map}
                    alt="Map default image"
                    width={4800}
                    height={3200}
                    quality={100}
                    className=" w-full h-full z-0 absolute blur-sm"
                />
                
               
               
                <a href={`https://www.google.com/maps/search/?api=1&query=restaurante ${restaurant.name} luanda`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="list-none text-white z-10 bg-black p-8 rounded flex group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-in-out">
                    <MapPinned className=" text-white mr-2 group-hover:animate-pulse" />
                    Visualizar no Mapa
                </a>

            </div>
            )}

            {/* Map Section */}
            {/*<div className="h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src="https://www.google.com/maps/place/EPIC+SANA+Luanda+Hotel/@-8.8144567,13.2324588,17z/data=!3m1!5s0x1a51f24e85c92dbb:0x1f4ad89ae3434a12!4m9!3m8!1s0x1a51f24e8277acab:0x8bbb561fd5396f18!5m2!4m1!1i2!8m2!3d-8.8144567!4d13.2350337!16s%2Fg%2F1tdrzlpy?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                />
            </div>*/}
        </div>
    )
}