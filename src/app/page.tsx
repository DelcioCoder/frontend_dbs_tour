import { ImageType, RestaurantType } from "@/types";
import { RestaurantSchema, ImageSchema } from "../../schemas";
import Image from "next/image";
import fetchData from "@/utils/fetchData";
import { Metadata } from "next";
import Link from "next/link";
import GastronomyImage from "../../public/gasthronomic.jpg";
import acommodationImage from "../../public/hospedagem.jpg";
import cultureImage from "../../public/culture.jpg";
import belasImage from "../../public/belas.jpg";

// Definição  do novo tipo que inclui a propriedade images
type RestaurantWithImages = RestaurantType & { images: ImageType[] };

export const metadata: Metadata = {
  title: "DBS-TOUR | Explore Belas, Angola",
  description: "Encontre os melhores locais de lazer e turismo no município de Belas, Angola",
  keywords: "restaurante, hotéis, lazer, turismo, belas, angola, luanda",
};

export default async function Home() {
  const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!cloudinaryName) {
    console.error("Erro: CLOUDINARY_CLOUD_NAME não está definido.");
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">Erro interno. Contate o suporte.</p>
      </div>
    );
  }

  let restaurantsWithImages: RestaurantWithImages[] = [];

  try {
    const [restaurantsData, imagesData] = await Promise.all([
      fetchData<{ results: RestaurantType[] }>("restaurants/"),
      fetchData<{ results: ImageType[] }>("images/"),
    ]);

    if (!restaurantsData || !imagesData) {
      throw new Error("Erro ao carregar dados");
    }

    // Validar os dados dos restaurantes
    const validateRestaurants = RestaurantSchema.array().parse(restaurantsData.results);

    // Validar os dados das imagens
    const validateImages = ImageSchema.array().parse(imagesData.results);

    // Relacionar imagens com os restaurantes
    restaurantsWithImages = validateRestaurants.map((restaurant: RestaurantType) => {
      const images = validateImages.filter((image: ImageType) => image.object_id === restaurant.id);
      return { ...restaurant, images } as RestaurantWithImages;
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

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0">
          <Image
            src="/luanda.png"
            alt="Vista panorâmica de Belas, Angola"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative flex h-full items-center justify-center text-center">
          <div className="text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
              Explore os Melhores Locais do Município de Belas
            </h1>
            <p className="mt-4 text-lg md:text-xl drop-shadow-lg">
              Descubra restaurantes, hotéis e atrações turísticas em um dos lugares mais vibrantes de Luanda, Angola.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/restaurants"
                className="px-6 py-3 bg-yellow-500 text-black font-medium rounded-xl hover:bg-yellow-600 shadow-lg transition-colors"
              >
                Explorar Restaurantes
              </Link>
              <Link
                href="/hotels"
                className="px-6 py-3 bg-white text-gray-800 font-medium rounded-xl hover:bg-gray-100 shadow-lg transition-colors"
              >
                Encontrar Hotéis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destaques Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Destaques em Belas</h2>
          <div className="flex flex-wrap justify-center">
            {restaurantsWithImages.slice(0, 4).map((restaurant) => (
              <div
                key={restaurant.id}
                className="w-full sm:w-80 bg-white rounded-lg shadow-md m-4 overflow-hidden transform hover:scale-105 transition-transform"
              >
                {/* Imagem */}
                {restaurant.images?.length > 0 ? (
                  <Image
                    src={`https://res.cloudinary.com/${cloudinaryName}/${restaurant.images[0].image}`}
                    alt={restaurant.images[0].description || "Imagem do restaurante"}
                    width={350}
                    height={200}
                    style={{ objectFit: "cover" }}
                    className="w-full h-48"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-48 bg-gray-300 text-gray-700">
                    Imagem não disponível
                  </div>
                )}

                {/* Conteúdo */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">
                    {restaurant.description || "Descrição não disponível"}
                  </p>
                  <div className="mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={restaurant.rating != null ? (restaurant.rating >= star ? "text-yellow-500" : "") : "text-yellow-200"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/all-attractions"
              className="inline-block px-6 py-3 bg-yellow-500 text-black font-medium rounded-xl hover:bg-yellow-600 shadow-lg transition-colors"
            >
              Ver Mais Locais
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre Belas Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={belasImage}
                  alt="Paisagem de Belas"
                  fill
                  style={{ objectFit: "cover" }}
                  quality={100}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Conheça o Município de Belas</h2>
              <p className="text-gray-700 mb-4">
                O município de Belas, localizado na província de Luanda, é um dos destinos mais promissores de Angola
                para turismo e lazer. Com uma riqueza cultural única e paisagens deslumbrantes, Belas oferece
                experiências inesquecíveis para todos os visitantes.
              </p>
              <p className="text-gray-700 mb-6">
                Desde a gastronomia local até as atrações turísticas, cada canto do município tem uma história para
                contar. A hospitalidade angolana se destaca em cada estabelecimento, tornando sua visita ainda mais
                especial.
              </p>
              <Link
                href="/about-belas"
                className="inline-block px-6 py-3 border-2 border-yellow-500 text-yellow-500 font-medium rounded-xl hover:bg-yellow-500 hover:text-white transition-colors"
              >
                Saiba Mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias de Turismo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Experiências em Belas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gastronomia */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={GastronomyImage}
                  alt="Gastronomia Angolana"
                  fill
                  style={{ objectFit: "cover" }}
                  quality={100}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Gastronomia</h3>
                <p className="text-gray-600 mb-4">
                  Descubra os sabores autênticos da culinária angolana nos melhores restaurantes de Belas.
                </p>
                <Link href="/restaurants" className="text-yellow-500 font-medium hover:underline">
                  Explorar restaurantes →
                </Link>
              </div>
            </div>

            {/* Hospedagem */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={acommodationImage}
                  alt="Hotéis em Belas"
                  fill
                  style={{ objectFit: "cover" }}
                  quality={100}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Hospedagem</h3>
                <p className="text-gray-600 mb-4">
                  Encontre hotéis e pousadas confortáveis para sua estadia perfeita em Belas.
                </p>
                <Link href="/hotels" className="text-yellow-500 font-medium hover:underline">
                  Encontrar hotéis →
                </Link>
              </div>
            </div>

            {/* Cultura & Lazer */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={cultureImage}
                  alt="Cultura em Belas"
                  fill
                  style={{ objectFit: "cover" }}
                  quality={100}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Cultura & Lazer</h3>
                <p className="text-gray-600 mb-4">
                  Conheça os pontos culturais e atividades de lazer que Belas tem a oferecer.
                </p>
                <Link href="/cultura-lazer" className="text-yellow-500 font-medium hover:underline">
                  Descobrir atrações →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">O Que Dizem Nossos Visitantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Maria Silva</h4>
                  <p className="text-sm text-gray-500">Visitou em Janeiro 2025</p>
                </div>
              </div>
              <p className="text-gray-700">
                "A gastronomia de Belas é incrível! Experimentei pratos tradicionais angolanos que nunca tinha provado
                antes. Os restaurantes são aconchegantes e o atendimento é maravilhoso."
              </p>
              <div className="mt-3 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-500">
                    ⭐
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">João Pereira</h4>
                  <p className="text-sm text-gray-500">Visitou em Dezembro 2024</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Os hotéis em Belas oferecem excelente custo-benefício. Fiquei impressionado com a hospitalidade dos
                angolanos e com a beleza natural da região. Voltarei com certeza!"
              </p>
              <div className="mt-3 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-500">
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-yellow-500">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Fique por dentro das novidades</h2>
          <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
            Inscreva-se para receber atualizações sobre novos estabelecimentos, eventos e promoções especiais em Belas.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-grow px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}