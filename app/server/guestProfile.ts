import { createServerFn } from '@tanstack/start';
import { db } from '../db/client';
import { createGuestProfile, getGuestProfile } from '../repos/guestProfile';
import { createGuestProfileSchema, getGuestProfileSchema } from '../schemas/guestProfile';
import { serverZodValidator } from '../utils/server';
import { getAuthUserFn } from './auth';

export const getGuestProfileFn = createServerFn(
	'GET',
	serverZodValidator(getGuestProfileSchema, async ({ profileId }) => {
		const profile = await getGuestProfile(db, { profileId });
		return profile;
	}),
);

export const createGuestProfileFn = createServerFn(
	'POST',
	serverZodValidator(createGuestProfileSchema, async (value) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const profile = await createGuestProfile(db, { profileId: user.id, ...value });
		return profile;
	}),
);
