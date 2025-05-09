'use client';
import { useEffect, useState } from 'react';
import { Suspense } from 'react';
import { calculateAverageRating } from "@/utils/ratings";
import { RestaurantSchema, HotelSchema, ImageSchema } from "../../../schemas";
import { Evaluation } from "@/types/api";
import { HotelCard } from "@/components/HotelCard";
import { RestaurantCard } from "@/components/RestaurantCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useSearchParams } from 'next/navigation';
import { RestaurantType, HotelType, ImageType } from "@/types";
import { getCloudinaryName } from "@/utils/env";

export default function SearchResults() {
  console.log("Search a funcionar")
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [hoteis, setHoteis] = useState<HotelType[]>([]);
  const [restaurantes, setRestaurantes] = useState<RestaurantType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cloudinaryName = getCloudinaryName();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/search?q=${query}`);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        
        const result = await response.json();

        // Validar imagens e avaliações
        const images = ImageSchema.array().parse(result.images.results);
        const evaluations = result.evaluations.results;

        // Processar restaurantes
        const validatedRestaurants = RestaurantSchema.array().parse(result.data.Restaurantes);
        const restaurantsWithData = validatedRestaurants.map(restaurant => {
          const restaurantImages = images.filter(
            img => img.object_id === restaurant.id && img.content_type === 12
          );
          
          const restaurantEvaluations = evaluations.filter(
            (e: Evaluation) => e.object_id === restaurant.id && e.content_type === 12
          );

          return {
            ...restaurant,
            images: restaurantImages,
            averageRating: calculateAverageRating(restaurantEvaluations)
          };
        });

        // Processar hoteis
        const validatedHotels = HotelSchema.array().parse(result.data.Hoteis);
        const hotelsWithData = validatedHotels.map(hotel => {
          const hotelImages = images.filter(
            img => img.object_id === hotel.id && img.content_type === 10
          );
          
          const hotelEvaluations = evaluations.filter(
            (e: Evaluation) => e.object_id === hotel.id && e.content_type === 10
          );

          return {
            ...hotel,
            images: hotelImages,
            averageRating: calculateAverageRating(hotelEvaluations)
          };
        });

        setHoteis(hotelsWithData);
        setRestaurantes(restaurantsWithData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  //if (loading) return <div className="p-4 text-center"><LoadingSpinner /></div>;
  //if (error) return <div className="p-4 text-red-500">Erro: {error}</div>;

  console.log("A entrar para o suspense")
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="container mx-auto px-4 py-8">
        {/* Seção de Hotéis */}
        {hoteis.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Hotéis Encontrados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hoteis.map(hotel => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  cloudinaryName={cloudinaryName}
                />
              ))}
            </div>
          </section>
        )}

        {/* Seção de Restaurantes */}
        {restaurantes.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Restaurantes Encontrados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurantes.map(restaurante => (
                <RestaurantCard
                  key={restaurante.id}
                  restaurant={restaurante}
                  cloudinaryName={cloudinaryName}
                />
              ))}
            </div>
          </section>
        )}

        {/* Mensagem sem resultados */}
        {hoteis.length === 0 && restaurantes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum resultado encontrado para "{query}"</p>
          </div>
        )}
      </div>
    </Suspense>
  );
}