import { z } from 'zod';

export const getUserRequestsSchema = z.object({
	userId: z.string(),
});

export const createRequestSchema = z.object({
	evacuationPlaceId: z.number(),
});

export const updateRequestSchema = z.object({
	requestId: z.number(),
});
