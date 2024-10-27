import { z } from 'zod';

export const createFavoriteSchema = z.object({
	evacuationPlaceId: z.number(),
});

export const deleteFavoriteSchema = z.object({
	evacuationPlaceId: z.number(),
});
