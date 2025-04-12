import fetchData from "@/utils/fetchData";
import { cookies } from "next/headers"
import { HotelType, ImageType } from "@/types";
import { HotelSchema, ImageSchema, UserSchema } from "../../../../schemas";
import { calculateAverageRating } from "@/utils/ratings";
import { PaginatedResponse, Evaluation, User } from "@/types/api";
import HotelHeader from "@/components/hotelComponents/HotelHeader";
import HotelInfo from "@/components/hotelComponents/HotelInfo";
import ReviewForm from "@/components/shared/ReviewForm";
import ReviewsList from "@/components/shared/ReviewsList";
import { notFound } from "next/navigation";
import { getCloudinaryName } from "@/utils/env";


export default async function Page({
    params,
}: { params: { id: string } }) {

    const cloudinaryName = getCloudinaryName();
    const cookieStore = await cookies();

    try {
        const [hotelData, imagesData, evaluationsData, usersData] = await Promise.all([
            fetchData<HotelType>(`hotels/${params.id}`),
            fetchData<PaginatedResponse<ImageType>>(`images/`),
            fetchData<PaginatedResponse<Evaluation>>(`evaluations/`),
            fetchData<PaginatedResponse<User>>(`users/`),
        ])

        if (!hotelData || !imagesData || !evaluationsData || !usersData) {
            notFound();
        }

        const validateHotel = HotelSchema.parse(hotelData);
        cookieStore.set("obj_id", params.id, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production", // false em desenvolvimento
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 1 dia
             path: "/",
        });

        cookieStore.set("content_type", "10", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production", // false em desenvolvimento
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 1 dia
             path: "/",
        });
        
        const validateImages = ImageSchema.array().parse(imagesData.results);
        const validateUsers = UserSchema.array().parse(usersData.results);


        const hotelImages = validateImages.filter(
            (image: ImageType) => 
            image.object_id === validateHotel.id && image.content_type === 10
        );

        const hotelEvaluations = evaluationsData.results.filter(
            (evaluation: Evaluation) => 
              evaluation.object_id === validateHotel.id && evaluation.content_type === 10
          );
          
        const evaluationUsers = validateUsers.filter(
            (user: User) =>
                hotelEvaluations.some(
                    (evaluation: Evaluation) => evaluation.user === user.id
                )
        )



        const averageRating = calculateAverageRating(hotelEvaluations);

        const hotelWithDetails = {
            ...validateHotel,
            users: evaluationUsers,
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
                    <ReviewsList evaluations={hotelWithDetails.evaluations} users={hotelWithDetails.users} />
                </div>
            </div>
        )









    } catch (e) {
        console.error("Error fetching data:", e);
        throw e;
    }


}