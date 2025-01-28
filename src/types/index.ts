export type RestaurantType = {
    id: number,
    name: string,
    description: string,
    image: ImageType,
    rating: number,
    latitude: string,
    longitude: string,
    phone_number: string,
    opening_hours: string,
    website: string,
    date_added: string,
    category: number,
    centrality: number
}

export type ImageType = {
    object_id: number,
    image: string,
    description: string
}