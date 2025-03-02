import { z } from 'zod';

export const ImageSchema = z.object({
    id: z.number(),
    object_id: z.number(),
    image: z.string(),
    description: z.string().nullable().optional(),
    content_type: z.number(),
});


export const RestaurantSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    opening_hours: z.string().nullable(),
    rating: z.number().optional(),
    images: z.array(ImageSchema).optional(),
    date_added: z.string(),
    category: z.number(),
    centrality: z.number(),
  });


export const HotelSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    opening_hours: z.string().nullable(),
    rating: z.number().optional(),
    images: z.array(ImageSchema).optional(), // Um hotel pode ter várias imagens
    date_added: z.string(),
    category: z.number(),
    centrality: z.number(),
})


export const UserSchema = z.object({
    id: z.number(),
    username: z.string()
})

export type ImageType = z.infer<typeof ImageSchema>;
export type RestaurantType = z.infer<typeof RestaurantSchema>;
export type HotelType = z.infer<typeof HotelSchema>;
export type UserType = z.infer<typeof UserSchema>;

