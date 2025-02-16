import { HotelType, ImageType } from "@/types";
import { Evaluation } from "@/types/api";
import MainImage from "@/components/shared/MainImage";

interface HotelHeaderProps {
    hotel: HotelType & {
        images: ImageType[];
        averageRating: number;
        evaluations: Evaluation[];
    }
    cloudinaryName: string;
}

export default function HotelHeader({
    hotel,
    cloudinaryName
}: HotelHeaderProps) {

    return (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Imagem principal */}
            <div className="md:col-span-2">
                {hotel.images.length > 0 ? (
                    <MainImage
                        image={hotel.images[0].image}
                        alt={hotel.name}
                        cloudinaryName={cloudinaryName}
                    />
                ) : (
                    <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Sem imagem disponível</span>
                    </div>
                )}
            </div>

            {/* Map Section */}
            <div className="h-96 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.123456789012!2d13.123456!3d-8.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwMDcnMzQuNiJTIDEzwrAwNyczNC42IkU!5e0!3m2!1sen!2sao!4v1234567890123!5m2!1sen!2sao"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        </div>
    )
}