import { z } from 'zod';

export const getHostProfileSchema = z.object({
	profileId: z.string(),
});

export const createHostProfileSchema = z.object({
	biography: z.string().min(1, '1文字以上で入力してください'),
	pictureUrls: z.string().array().min(1),
});
