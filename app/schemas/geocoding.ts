import { z } from 'zod';

export const getLocationDataSchema = z.object({
	lat: z.number(),
	lng: z.number(),
});
