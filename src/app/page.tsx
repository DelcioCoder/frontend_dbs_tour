import { ImageType, RestaurantType } from "@/types";
import Image from "next/image";
import fetchData from "@/utils/fetchData";

export default async function Home() {
  const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME; // Cloudinary Cloud Name

  try {
    const restaurantsData = await fetchData("restaurants/");
    const imagesData = await fetchData("images/");

    // Relacionar imagens com os restaurantes
    const restaurantsWithImages = restaurantsData.results.map(
      (restaurant: RestaurantType) => {
        const images = imagesData.results.filter(
          (image: ImageType) => image.object_id === restaurant.id
        );
        return { ...restaurant, images };
      }
    );

    return (
      <div>
        {/* Background */}
        <div className="relative h-screen w-full">
          <div className="absolute inset-0">
            <Image
              src="/luanda.png"
              alt="Background image"
              fill
              style={{ objectFit: "cover" }} // Atualizado para a nova forma de usar objectFit
              quality={100}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative flex h-full items-center justify-center text-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                Explore os Melhores Locais do Município de Belas
              </h1>
              <p className="mt-4 text-lg md:text-xl drop-shadow-lg">
                Descubra restaurantes, hotéis e muito mais com um clique.
              </p>
              <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-medium rounded-xl hover:bg-yellow-600 shadow-lg">
                Comece Agora
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Restaurantes */}
        <div className="flex flex-wrap justify-center bg-gray-100 py-10">
          {restaurantsWithImages.slice(0, 4).map((restaurant: RestaurantType) => (
            <div
              key={restaurant.id}
              className="w-80 bg-white rounded-lg shadow-md m-4 overflow-hidden transform hover:scale-105 transition-transform"
            >
              {/* Imagem */}
              {restaurant.images.length > 0 ? (
                <Image
                  src={`https://res.cloudinary.com/${cloudinaryName}/${restaurant.images[0].image}`}
                  alt={restaurant.images[0].description || "Imagem do restaurante"}
                  width={350}
                  height={200}
                  style={{ objectFit: "cover" }} // Atualizado para a nova forma de usar objectFit
                  className="w-full h-48"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 text-gray-700">
                  Imagem não disponível
                </div>
              )}

              {/* Conteúdo */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">
                  {restaurant.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {restaurant.description || "Descrição não disponível"}
                </p>
                <div className="mt-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-2xl ${
                        restaurant.rating >= star ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">
          Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.
        </p>
      </div>
    );
  }
}
