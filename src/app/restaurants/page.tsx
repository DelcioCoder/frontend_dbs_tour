import { Suspense } from "react";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Pagination } from "@/components/Pagination";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { RestaurantSchema, ImageSchema } from "../../../schemas";
import { calculateAverageRating } from "@/utils/ratings";
import { PaginatedResponse, Evaluation } from "@/types/api";
import fetchData from "@/services/fetchData";
import { getPageNumberFromUrl } from "@/utils/getPage";

export default async function RestaurantsPage({
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
      <RestaurantsContent page={page} cloudinaryName={cloudinaryName} />
    </Suspense>
  );
}

async function RestaurantsContent({ 
  page, 
  cloudinaryName 
}: { 
  page: string; 
  cloudinaryName: string;
}) {
  try {
    const [restaurantsResponse, imagesData, evaluationsData] = await Promise.all([
      fetchData<PaginatedResponse<RestaurantType>>(`restaurants/?page=${page}`),
      fetchData<PaginatedResponse<ImageType>>("images/"),
      fetchData<PaginatedResponse<Evaluation>>("evaluations/"),
    ]);

    const validateRestaurants = RestaurantSchema.array().parse(restaurantsResponse.results);
    const validateImages = ImageSchema.array().parse(imagesData.results);

    const restaurantsWithImages = validateRestaurants.map((restaurant: RestaurantType) => {
      const images = validateImages.filter(
        (image: ImageType) => image.object_id === restaurant.id
      );
      
      const restaurantEvaluations = evaluationsData.results.filter(
        (evaluation: Evaluation) => evaluation.object_id === restaurant.id
      );
      
      const averageRating = calculateAverageRating(restaurantEvaluations);

      return { ...restaurant, images, averageRating };
    });

    const nextPage = getPageNumberFromUrl(restaurantsResponse.next);
    const currentPage = parseInt(page, 10);

    return (
      <div>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Restaurantes</h1>
          
          {restaurantsWithImages.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              Nenhum restaurante encontrado.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {restaurantsWithImages.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  cloudinaryName={cloudinaryName}
                />
              ))}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          nextPage={nextPage}
          basePath="/restaurants"
        />
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    throw error;
  }
}