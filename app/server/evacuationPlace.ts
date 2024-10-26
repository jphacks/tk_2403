import { createServerFn } from '@tanstack/start';
import { db } from '../db/client';
import { createEvacuationPlace } from '../repos/evacuationPlace';
import { getFormattedAddress } from '../repos/geocoding';
import { uploadImage } from '../repos/image';
import { createEvacuationPlaceSchema } from '../schemas/evacuationPlace';
import { serverZodValidator } from '../utils/server';
import { getSupabaseServerClient } from '../utils/supabase';
import { getAuthUserFn } from './auth';

export const createEvacuationPlaceFn = createServerFn(
	'POST',
	serverZodValidator(createEvacuationPlaceSchema, async (value) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const formattedAddress = await getFormattedAddress(value.address);

		if (formattedAddress === null) {
			return { error: 'invalid-address' };
		}

		const supabase = getSupabaseServerClient();
		const picturePaths = await Promise.all(
			value.pictures.map(async (picture) => {
				const { path } = await uploadImage(supabase, user.id, picture);
				return path;
			}),
		);

		const profile = await createEvacuationPlace(db, {
			profileId: user.id,
			...value,
			address: formattedAddress,
			picturePaths,
		});
		return { profile };
	}),
);
