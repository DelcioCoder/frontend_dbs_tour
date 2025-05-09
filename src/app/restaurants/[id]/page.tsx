import fetchData from "@/utils/fetchData";
import { RestaurantType, ImageType } from "@/types";
import { PaginatedResponse, Evaluation, User } from "@/types/api";
import { RestaurantSchema, ImageSchema, UserSchema } from "../../../../schemas";
import { calculateAverageRating } from "@/utils/ratings";
import RestaurantHeader from "@/components/restaurantComponents/RestaurantHeader";
import RestaurantInfo from "@/components/restaurantComponents/RestaurantInfo";
import ReviewForm from "@/components/shared/ReviewForm";
import ReviewsList from "@/components/shared/ReviewsList";
import { notFound } from "next/navigation";

interface Params {
    id: string;
  };
  
interface PageProps {
    params: Promise<any> & Params;
}
export default async function Page({params}: PageProps) {
    const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const resolvedParams = await params;

    if (!cloudinaryName) {
        throw new Error("CLOUDINARY_CLOUD_NAME não está definido.");
    }

    try {
        const [restaurantData, imagesData, evaluationsData, usersData] = await Promise.all([
            fetchData<RestaurantType>(`restaurants/${resolvedParams.id}`),
            fetchData<PaginatedResponse<ImageType>>(`images/`),
            fetchData<PaginatedResponse<Evaluation>>(`evaluations/`),
            fetchData<PaginatedResponse<User>>(`users/`),
        ]);

        if (!restaurantData || !imagesData || !evaluationsData || !usersData) {
            notFound();
        }
       

        const validateRestaurant = RestaurantSchema.parse(restaurantData);
        const validateImages = ImageSchema.array().parse(imagesData.results);
        const validateUsers = UserSchema.array().parse(usersData.results);

        const data = {
            "object": resolvedParams.id,
            "content": 12,
            "kind": "restaurants"
        }

        const restaurantImages = validateImages.filter(
            (image: ImageType) => 
            image.object_id === validateRestaurant.id && image.content_type === 12
        );

        const restaurantEvaluations = evaluationsData.results.filter(
            (evaluation: Evaluation) => 
            evaluation.object_id === validateRestaurant.id && evaluation.content_type === 12
        );

        const evaluationUsers = validateUsers.filter(
            (user: User) =>
                restaurantEvaluations.some(
                    (evaluation: Evaluation) => evaluation.user === user.id
                )
            )

        const averageRating = calculateAverageRating(restaurantEvaluations);

        const restaurantWithDetails = {
            ...validateRestaurant,
            users: evaluationUsers,
            images: restaurantImages,
            averageRating,
            evaluations: restaurantEvaluations,
        };

        console.log(restaurantWithDetails)

        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header Section with Image and Map */}
                <RestaurantHeader restaurant={restaurantWithDetails} kind={"res"} cloudinaryName={cloudinaryName} />

                {/* Restaurant Info Section */}
                <RestaurantInfo restaurant={restaurantWithDetails} />


                {/* Reviews Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Avaliações e Comentários
                    </h2>

                    {/* Review Form */}
                    <ReviewForm obj={data} />



                    {/* Reviews List */}
                    <ReviewsList evaluations={restaurantWithDetails.evaluations} users={restaurantWithDetails.users} />

                </div>
            </div>
        );
    } catch (e) {
        console.error("Error fetching data:", e);
        throw e;
    }
}