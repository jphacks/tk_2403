import { z } from 'zod';

export const getEvacuationPlaceSchema = z.object({
	id: z.number(),
});

export const createEvacuationPlaceSchema = z.object({
	description: z.string().min(1, '1文字以上で入力してください'),
	address: z.string().min(1, '1文字以上で入力してください'),
	maxHeadcount: z.string().regex(/^\d*[1-9]\d*$/, '1以上の整数で入力してください'),
	availablePeriodStart: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MMの形式で入力してください'),
	availablePeriodEnd: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MMの形式で入力してください'),
	petAllowed: z.boolean({ required_error: 'ペットの受け入れ可否を選択してください' }),
	barrierFree: z.boolean({ required_error: 'バリアフリーの有無を選択してください' }),
	pictures: z
		.object({
			base64: z.string(),
			type: z.string(),
		})
		.array(),
});

export const updateEvacuationPlaceSchema = z.object({
	description: z.string().min(1, '1文字以上で入力してください'),
	address: z.string().min(1, '1文字以上で入力してください'),
	maxHeadcount: z.string().regex(/^\d*[1-9]\d*$/, '1以上の整数で入力してください'),
	availablePeriodStart: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MMの形式で入力してください'),
	availablePeriodEnd: z.string().regex(/^\d{4}-\d{2}$/, 'YYYY-MMの形式で入力してください'),
	petAllowed: z.boolean({ required_error: 'ペットの受け入れ可否を選択してください' }),
	barrierFree: z.boolean({ required_error: 'バリアフリーの有無を選択してください' }),
	deletePictureIndices: z.number().int().array(),
	newPictures: z
		.object({
			base64: z.string(),
			type: z.string(),
		})
		.array(),
});
