import { createServerFn } from '@tanstack/start';
import { db } from '../db/client';
import { createProfile, getProfile } from '../repos/profile';
import { createProfileSchema, getProfileSchema } from '../schemas/profile';
import { serverZodValidator } from '../utils/server';
import { getAuthUserFn } from './auth';

export const getProfileFn = createServerFn(
	'GET',
	serverZodValidator(getProfileSchema, async ({ userId }) => {
		const profile = await getProfile(db, { userId });
		return profile;
	}),
);

export const createProfileFn = createServerFn(
	'POST',
	serverZodValidator(createProfileSchema, async (value) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const profile = await createProfile(db, { userId: user.id, ...value });
		return profile;
	}),
);
