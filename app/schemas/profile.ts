import { z } from 'zod';

export const getProfileSchema = z.object({
	userId: z.string(),
});

export const createProfileSchema = z.object({
	name: z.string().min(1, '名前は1文字以上で入力してください'),
	gender: z.enum(['male', 'female', 'other']),
	dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DDの形式で入力してください'),
});
