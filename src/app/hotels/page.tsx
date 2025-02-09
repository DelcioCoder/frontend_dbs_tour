import { Suspense } from "react";
import { HotelCard } from "@/components/HotelCard";
import { Pagination } from "@/components/Pagination";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { HotelSchema, ImageSchema } from "../../../schemas";
import { calculateAverageRating } from "@/utils/ratings";
import { PaginatedResponse, Evaluation } from "@/types/api";
import fetchData from "@/services/fetchData";
import { getPageNumberFromUrl } from "@/utils/getPage";

export default async function HotelsPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const page = searchParams.page || "1";
    const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;

    if (!cloudinaryName) {
        throw new Error("CLOUDINARY_CLOUD_NAME não está definido.");
    }

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <HotelsContent page={page} cloudinaryName={cloudinaryName} />
        </Suspense>
    );
}



async function HotelsContent({
    page,
    cloudinaryName,
}: {
    page: string;
    cloudinaryName: string;
}) {
    try {
        const [hotelsResponse, imagesData, evaluationsData] = await Promise.all([
            fetchData<PaginatedResponse<HotelType>>(`hotels/?page=${page}`),
            fetchData<PaginatedResponse<ImageType>>("images/"),
            fetchData<PaginatedResponse<Evaluation>>("evaluations/"),
        ]);

        const validateHotels = HotelSchema.array().parse(hotelsResponse.results);
        const validateImages = ImageSchema.array().parse(imagesData.results);

        const hotelsWithImages = validateHotels.map((hotel: HotelType) => {
            const images = validateImages.filter(
                (image: ImageType) => image.object_id === hotel.id
            );

            const hotelEvaluations = evaluationsData.results.filter(
                (evaluation: Evaluation) => evaluation.object_id === hotel.id
            );

            const averageRating = calculateAverageRating(hotelEvaluations);

            return {...hotel, images, averageRating };
        });

        const nextPage = getPageNumberFromUrl(hotelsResponse.next);
        const currentPage = parseInt(page, 10);

        return (
            <div>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Hotéis</h1>

                    {hotelsWithImages.length === 0? (
                        <p className="text-gray-600 text-center py-8">
                            Nenhum hotel encontrado.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {hotelsWithImages.map((hotel) => (
                                <HotelCard
                                    key={hotel.id}
                                    hotel={hotel}
                                    cloudinaryName={cloudinaryName}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    nextPage={nextPage}
                    basePath="/hotels"
                />
            </div>
        )
    } catch (error) {
        console.error("Error ao carregar os dados:", error);
        throw error;
    }
}

