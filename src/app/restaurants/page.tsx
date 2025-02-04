import Image from "next/image";
import Link from "next/link";
import { RestaurantType, ImageType } from "@/types";
import fetchData from "@/services/fetchData";
import { RestaurantSchema, ImageSchema } from "../../../schemas";

// Função auxiliar para extrair o número da página da URL retornada pela API
function getPageNumberFromUrl(url: string | null) {
  if (!url) return null;
  const urlObj = new URL(url);
  return urlObj.searchParams.get("page");
}

// Recebendo searchParams no componente (válido para o App Router do Next.js)
export default async function RestaurantsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // Define a página atual (padrão é 1)
  const page = searchParams.page || "1";

  const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME; // Nome da Cloudinary

  if (!cloudinaryName) {
    console.error("Erro: CLOUDINARY_CLOUD_NAME não está definido.");
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">Erro interno. Contate o suporte.</p>
      </div>
    );
  }

  let restaurantsWithImages: RestaurantType[] = [];
  let restaurantsData: any; // Será usado para pegar os links de paginação

  try {
    // Buscando os dados, passando o parâmetro da página na URL da API
    const [restaurantsResponse, imagesData, evaluationsData] = await Promise.all([
      fetchData(`restaurants/?page=${page}`),
      fetchData("images/"),
      fetchData("evaluations/"), // Pegar avaliações
    ]);

    restaurantsData = restaurantsResponse;

    // Validar os dados dos restaurantes
    const validateRestaurants = RestaurantSchema.array().parse(restaurantsResponse.results);

    // Validar os dados das imagens
    const validateImages = ImageSchema.array().parse(imagesData.results);

    const evaluations = evaluationsData.results;

    // Relacionar imagens e avaliações com os restaurantes
    restaurantsWithImages = validateRestaurants.map((restaurant: RestaurantType) => {
      const images = validateImages.filter((image: ImageType) => image.object_id === restaurant.id);

      // Filtrar avaliações do restaurante e calcular a média
      const restaurantEvaluations = evaluations.filter(
        (evaluation: any) => evaluation.object_id === restaurant.id
      );
      const totalStars = restaurantEvaluations.reduce(
        (sum: number, evalItem: any) => sum + evalItem.stars,
        0
      );
      const averageRating =
        restaurantEvaluations.length > 0 ? totalStars / restaurantEvaluations.length : 0;

      return { ...restaurant, images, averageRating };
    });
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">
          Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.
        </p>
      </div>
    );
  }

  // Extrair números das páginas dos links retornados pela API
  const nextPage = getPageNumberFromUrl(restaurantsData.next);
  const currentPage = parseInt(page, 10);

  return (
    <div>
      {/* Lista de restaurantes */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800">Restaurantes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {restaurantsWithImages.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
              <div className="relative h-48">
                {restaurant.images && restaurant.images.length > 0 ? (
                  <Image
                    src={`https://res.cloudinary.com/${cloudinaryName}/${restaurant.images[0].image}`}
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
                <p className="text-sm text-gray-600">{restaurant.description}</p>
              </div>

              {/* Média das avaliações */}
              <div className="flex items-center gap-1" aria-label={`Avaliação média: ${restaurant.averageRating.toFixed(1)} estrelas`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${star <= Math.round(restaurant.averageRating) ? "text-yellow-500" : "text-gray-300"}`}
                    aria-hidden="true"
                  >
                    ★
                  </span>
                ))}
                <span className="text-sm text-gray-500 ml-2">({restaurant.averageRating.toFixed(1)})</span>
              </div>

              <Link
                href={`/restaurants/${restaurant.id}`}
                className="inline-block w-full py-2 px-4 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 mt-auto"
                aria-label={`Ver detalhes do ${restaurant.name}`}
              >
                Ver mais detalhes
              </Link>
            </div>
          ))}
        </div>
      </div>

      ...

      {/* Navegação de Paginação */}
      <div className="container mx-auto px-4 py-4 flex justify-between">
        {currentPage > 1 ? (
          <Link href={`/restaurants?page=${currentPage - 1}`} className="px-4 py-2 bg-gray-200 rounded">
            Anterior
          </Link>
        ) : (
          <span />
        )}
        {nextPage ? (
          <Link href={`/restaurants?page=${nextPage}`} className="px-4 py-2 bg-gray-200 rounded">
            Próxima
          </Link>
        ) : null}
      </div>

    </div>
  );
}
