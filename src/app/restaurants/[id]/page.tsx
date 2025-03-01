import fetchData from "@/utils/fetchData";
import { RestaurantType, ImageType } from "@/types";
import { RestaurantSchema, ImageSchema } from "../../../../schemas";
import { calculateAverageRating } from "@/utils/ratings";
import RestaurantHeader from "@/components/restaurantComponents/RestaurantHeader";
import RestaurantInfo from "@/components/restaurantComponents/RestaurantInfo";
import ReviewForm from "@/components/shared/ReviewForm";
import ReviewsList from "@/components/shared/ReviewsList";
import { notFound } from "next/navigation";

export default async function Page({
    params,
}: { params: { id: string } }) {
    const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;

    if (!cloudinaryName) {
        throw new Error("CLOUDINARY_CLOUD_NAME não está definido.");
    }

    try {
        const [restaurantData, imagesData, evaluationsData] = await Promise.all([
            fetchData<RestaurantType>(`restaurants/${params.id}`),
            fetchData<PaginatedResponse<ImageType>>(`images/`),
            fetchData<PaginatedResponse<Evaluation>>(`evaluations/`),
        ]);

        if(!restaurantData) {
            notFound();
        }

        const validateRestaurant = RestaurantSchema.parse(restaurantData);
        const validateImages = ImageSchema.array().parse(imagesData.results);

        const restaurantImages = validateImages.filter(
            (image: ImageType) => image.object_id === validateRestaurant.id
        );

        const restaurantEvaluations = evaluationsData.results.filter(
            (evaluation: Evaluation) => evaluation.object_id === validateRestaurant.id
        );

        const averageRating = calculateAverageRating(restaurantEvaluations);

        const restaurantWithDetails = {
            ...validateRestaurant,
            images: restaurantImages,
            averageRating,
            evaluations: restaurantEvaluations,
        };

        console.log(restaurantWithDetails)

        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header Section with Image and Map */}
                <RestaurantHeader restaurant={restaurantWithDetails} cloudinaryName={cloudinaryName} />

                {/* Restaurant Info Section */}
                <RestaurantInfo restaurant={restaurantWithDetails} />
                

                {/* Reviews Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Avaliações e Comentários
                    </h2>

                    {/* Review Form */}
                    <ReviewForm />
                    


                    {/* Reviews List */}
                    <ReviewsList evaluations={restaurantWithDetails.evaluations} />
                   
                </div>
            </div>
        );
    } catch (e) {
        console.error("Error fetching data:", e);
        throw e;
    }
}