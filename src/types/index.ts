export type EstablishmentType = {
    id: number;
    name: string;
    description: string;
    image?: ImageType | null;  // O frontend precisa associar a imagem pelo object_id
    rating?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    phone_number?: string | null;
    opening_hours?: string | null;
    website?: string | null;
    date_added: string;
    category: number;
    centrality: number;
};

export type HotelType = EstablishmentType;
export type RestaurantType = EstablishmentType;

export interface ImageType {
    id: number;
    object_id: number; // Relaciona com um restaurante ou hotel pelo ID
    image: string; // URL do arquivo da imagem
    description?: string | null;
    content_type: number;
}
