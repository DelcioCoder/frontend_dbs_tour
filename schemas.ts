import { z } from 'zod';

export const ImageSchema = z.object({
    id: z.number(),
    object_id: z.number(),
    image: z.string(),
    description: z.string().nullable(),
});


export const RestaurantSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    rating: z.number().optional(),
    images: z.array(ImageSchema).optional(), // Um restaurante pode ter várias imagens

})

export type ImageType = z.infer<typeof ImageSchema>;
export type RestaurantType = z.infer<typeof RestaurantSchema>;