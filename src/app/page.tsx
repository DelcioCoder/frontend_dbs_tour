import Image from "next/image";

export default async function Home() {
  const RESTAURANTS_API_URL = "http://localhost:8000/api/restaurants/";
  const IMAGES_API_URL = "http://localhost:8000/api/images/";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4MTUzNDEwLCJpYXQiOjE3Mzc4OTQxOTQsImp0aSI6IjBhNWZiZTljZDgzNTRhOTFiMmM2NzQ0NzA1ZTllN2FlIiwidXNlcl9pZCI6MX0.gh7aRF8apJTn2O4LUTNTOgyQoEw2_eSD61ZEPKEInTo";

  try {
    // Fetch restaurantes
    const restaurantsRes = await fetch(RESTAURANTS_API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!restaurantsRes.ok) {
      throw new Error("Falha ao carregar restaurantes");
    }

    const restaurantsData = await restaurantsRes.json();

    // Fetch imagens
    const imagesRes = await fetch(IMAGES_API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!imagesRes.ok) {
      throw new Error("Falha ao carregar imagens");
    }

    const imagesData = await imagesRes.json();

    // Relacionar imagens com os restaurantes
    const restaurantsWithImages = restaurantsData.results.map((restaurant) => {
      const images = imagesData.results.filter(
        (image) => image.object_id === restaurant.id
      );
      return { ...restaurant, images };
    });

    return (
      <div>
        {/* Background */}
        <div className="relative h-screen w-full">
          <div className="absolute inset-0">
            <Image
              src="/luanda.png"
              alt="Background image"
              fill
              objectFit="cover"
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
          {restaurantsWithImages.slice(0, 4).map((restaurant) => (
            <div
              key={restaurant.id}
              className="w-80 bg-white rounded-lg shadow-md m-4 overflow-hidden transform hover:scale-105 transition-transform"
            >
              {/* Imagem */}
              {restaurant.images.length > 0 ? (
                <Image
                  src={restaurant.images[0].image}
                  alt={
                    restaurant.images[0].description || "Imagem do restaurante"
                  }
                  width={350}
                  height={200}
                  className="object-cover w-full h-48"
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
                        restaurant.rating >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
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
          Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais
          tarde.
        </p>
      </div>
    );
  }
}
