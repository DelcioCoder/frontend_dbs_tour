'use client';
import { useEffect, useState } from 'react';
import { calculateAverageRating } from "@/utils/ratings";
import { RestaurantSchema, HotelSchema } from "../../../schemas";
import { Evaluation } from "@/types/api";
import { HotelCard } from "@/components/HotelCard";
import { RestaurantCard } from "@/components/RestaurantCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useSearchParams } from 'next/navigation';
import { RestaurantType, HotelType } from "@/types";

interface RestaurantCardProps {
  id: number;
  name: string;
  description: string | null; // Aligned with RestaurantSchema
  rating?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  phone_number?: string | null;
  opening_hours?: string | null;
  website?: string | null;
  date_added: string;
  category: number;
  centrality: number;
  averageRating: number;
};

interface HotelCardProps {
  id: number;
  name: string;
  description: string | null; // Aligned with RestaurantSchema
  rating?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  phone_number?: string | null;
  opening_hours?: string | null;
  website?: string | null;
  date_added: string;
  category: number;
  centrality: number;
  averageRating: number;
};

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [hotel, setHoteis] = useState<HotelCardProps[]>([]);
  const [restaurant, setRestaurantes] = useState<RestaurantCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/search?q=${query}`);
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        
        const result = await response.json();
        
       const validateRestaurants = RestaurantSchema.array().parse(result.data.Restaurantes);
       const Restaurant = validateRestaurants.map((restaurant: RestaurantType) =>{
         const RestaurantEvaluations = result.evaluations.results.filter(
           (evaluation: Evaluation) => evaluation.object_id == restaurant.id && evaluation.content_type == 12
          )

          console.log(RestaurantEvaluations)
          const averageRating = calculateAverageRating(RestaurantEvaluations);
          return {...restaurant, averageRating}
       })

       const validateHotels = HotelSchema.array().parse(result.data.Hoteis);
       const Hotel = validateHotels.map((hotel: HotelType) =>{
        const HotelsEvaluations = result.evaluations.results.filter(
          (evaluation: Evaluation) => evaluation.object_id === hotel.id && evaluation.content_type === 10
        )

        const averageRating = calculateAverageRating(HotelsEvaluations);
        return {...hotel, averageRating}
     })

     setHoteis(Hotel)
     setRestaurantes(Restaurant)
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro na busca:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) return <div className="p-4 text-center">{<LoadingSpinner />}</div>;
  if (error) return <div className="p-4 text-red-500">Erro: {error}</div>;

  

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seção de Hotéis */}
      {hotel.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Hotéis Encontrados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel.map(Hotel => (
               <HotelCard
                key={Hotel.id}
                hotel={Hotel}
                cloudinaryName=""
                />
            ))}
          </div>
        </section>
      )}

      {/* Seção de Restaurantes */}
      {restaurant.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Restaurantes Encontrados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurant.map(Restaurante => (
              <RestaurantCard
              key={Restaurante.id}
              restaurant={Restaurante}
              cloudinaryName=""
            />
            ))}
          </div>
        </section>
      )}

      {/* Mensagem quando não há resultados */}
      {hotel.length === 0 && restaurant.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum resultado encontrado para "{query}"</p>
        </div>
      )}
    </div>
  );
}