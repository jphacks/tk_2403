import { z } from 'zod';

export const createEvacuationPlaceSchema = z.object({
	name: z.string().min(1, '1文字以上で入力してください'),
	description: z.string().min(1, '1文字以上で入力してください'),
	address: z.string().min(1, '1文字以上で入力してください'),
	maxHeadcount: z.number().int().min(1, '1以上の数字を入力してください'),
	availablePeriodStart: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MMの形式で入力してください'),
	availablePeriodEnd: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MMの形式で入力してください'),
	petAllowed: z.boolean(),
	barrierFree: z.boolean(),
	pictures: z
		.object({
			base64: z.string(),
			type: z.string(),
		})
		.array(),
});
