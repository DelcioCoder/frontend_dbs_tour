import { StarRating } from "@/components/StarRating";
import Image from "next/image";
import fetchData from "@/utils/fetchData";
import { RestaurantType, ImageType} from "@/types";
import { RestaurantSchema, ImageSchema } from "../../../../schemas";
import { calculateAverageRating } from "@/utils/ratings";
import { MapPin, Clock, Wallet, Utensils, Send } from "lucide-react";
import { RatingBadge } from "@/components/Rating/RatingBadge";

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
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Main Image */}
                    <div className="md:col-span-2">
                        {restaurantWithDetails.images.length > 0 ? (
                            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src={`https://res.cloudinary.com/${cloudinaryName}/${restaurantWithDetails.images[0].image}`}
                                    alt={restaurantWithDetails.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
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

                {/* Restaurant Info Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                            {restaurantWithDetails.name}
                        </h1>


                        <div className="flex items-center space-x-3">
                            <RatingBadge rating={restaurantWithDetails.averageRating} count={restaurantWithDetails.evaluations.length} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-3">
                            <Utensils className="w-5 h-5 text-blue-600" />
                            <span>{restaurantWithDetails.description}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span>Abre às {restaurantWithDetails.opening_hours}</span>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Avaliações e Comentários
                    </h2>

                    {/* Review Form */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Deixe sua avaliação</h3>
                        <div className="mb-4">
                            <StarRating rating={0} />
                        </div>
                        <form className="space-y-4">
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                                placeholder="Compartilhe sua experiência..."
                            />
                            <button
                                type="submit"
                                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                <span>Enviar Avaliação</span>
                            </button>
                        </form>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {restaurantWithDetails.evaluations.map((evaluation, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                            JD
                                        </div>
                                        <div>
                                            <div className="font-semibold">D.Armando</div>
                                            <StarRating rating={evaluation.stars} />
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">3 dias atrás</span>
                                </div>
                                <p className="text-gray-700">{evaluation.comment || "Sem comentário."}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (e) {
        console.error("Error fetching data:", e);
        throw e;
    }
}