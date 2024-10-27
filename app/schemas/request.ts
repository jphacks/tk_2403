import { z } from 'zod';

export const createRequestSchema = z.object({
	evacuationPlaceId: z.number(),
});

export const cancelRequestSchema = z.object({
	evacuationPlaceId: z.number(),
});

export const approveRequestSchema = z.object({
	requestId: z.number(),
});

export const rejectRequestSchema = z.object({
	requestId: z.number(),
});
