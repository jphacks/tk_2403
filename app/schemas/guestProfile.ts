import { z } from 'zod';

export const getGuestProfileSchema = z.object({
	profileId: z.string(),
});

export const createGuestProfileSchema = z.object({
	biography: z.string().min(1, '1文字以上で入力してください'),
	pictureUrls: z.string().array().min(1),
	headcount: z.number().int().min(1, '1以上で入力してください'),
	desiredAreaId: z.number().int(),
	desiredPeriodStart: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MMの形式で入力してください'),
	desiredPeriodEnd: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MMの形式で入力してください'),
	hasPet: z.boolean(),
	needBarrierFree: z.boolean(),
});
