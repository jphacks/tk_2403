import { createServerFn } from '@tanstack/start';
import { db } from '../db/client';
import { createHostProfile, getHostProfile } from '../repos/hostProfile';
import { createHostProfileSchema, getHostProfileSchema } from '../schemas/hostProfile';
import { serverZodValidator } from '../utils/server';
import { getAuthUserFn } from './auth';

export const getHostProfileFn = createServerFn(
	'GET',
	serverZodValidator(getHostProfileSchema, async ({ profileId }) => {
		const profile = await getHostProfile(db, { profileId });
		return profile;
	}),
);

export const createHostProfileFn = createServerFn(
	'POST',
	serverZodValidator(createHostProfileSchema, async (value) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const profile = await createHostProfile(db, { profileId: user.id, ...value });
		return profile;
	}),
);
