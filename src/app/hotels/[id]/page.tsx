import fetchData from "@/utils/fetchData";
import { HotelType, ImageType } from "@/types";
import { HotelSchema, ImageSchema } from "../../../../schemas";
import { calculateAverageRating } from "@/utils/ratings";
import { PaginatedResponse, Evaluation } from "@/types/api";
import HotelHeader from "@/components/hotelComponents/HotelHeader";
import HotelInfo from "@/components/hotelComponents/HotelInfo";
import ReviewForm from "@/components/shared/ReviewForm";
import ReviewsList from "@/components/shared/ReviewsList";

export default async function Page({
    params,
}:{params: {id: string}}) {

    const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;

    if (!cloudinaryName) {
        throw new Error("CLOUDINARY_CLOUD_NAME não está definido.");
    }

    try {
        const [hotelData, imagesData, evaluationsData] = await Promise.all([
            fetchData<HotelType>(`hotels/${params.id}`),
            fetchData<PaginatedResponse<ImageType>>(`images/`),
            fetchData<PaginatedResponse<Evaluation>>(`evaluations/`),
        ])

        const validateHotel = HotelSchema.parse(hotelData);
        const validateImages = ImageSchema.array().parse(imagesData.results);

        const hotelImages = validateImages.filter(
            (image: ImageType) => image.object_id === validateHotel.id
        );

        const hotelEvaluations = evaluationsData.results.filter(
            (evaluation: Evaluation) => evaluation.object_id === validateHotel.id
        );


        const averageRating = calculateAverageRating(hotelEvaluations);
        
        const hotelWithDetails = {
            ...validateHotel,
            images: hotelImages,
            averageRating,
            evaluations: hotelEvaluations,
        }

        return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header Section with Image and Map */}
            <HotelHeader hotel={hotelWithDetails} cloudinaryName={cloudinaryName} />

            {/* Hotel Info Section */}
            <HotelInfo hotel={hotelWithDetails} cloudinaryName={cloudinaryName} />  

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Avaliações e Comentários
                </h2>

                {/* Review Form */}
                <ReviewForm />

                {/* Reviews List */}
                <ReviewsList evaluations={hotelWithDetails.evaluations} />
            </div>
        </div>
    )









    } catch (e) {
        console.error("Error fetching data:", e);
        throw e;
    }


}