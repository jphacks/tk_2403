import { createServerFn } from '@tanstack/start';
import { db } from '../db/client';
import { getAreas } from '../repos/area';
import { createEvacuationPlace, getEvacuationPlace, getEvacuationPlaceByUserId } from '../repos/evacuationPlace';
import { getFormattedAddress } from '../repos/geocoding';
import { getImagePublicUrl, uploadImage } from '../repos/image';
import { createEvacuationPlaceSchema, getEvacuationPlaceSchema } from '../schemas/evacuationPlace';
import { serverZodValidator } from '../utils/server';
import { getSupabaseServerClient } from '../utils/supabase';
import { getAuthUserFn } from './auth';

export const getEvacuationPlaceFn = createServerFn(
	'GET',
	serverZodValidator(getEvacuationPlaceSchema, async ({ id }) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const evacuationPlace = await getEvacuationPlace(db, user.id, { id });
		if (evacuationPlace === undefined) {
			return undefined;
		}

		const areas = await getAreas(db);
		return {
			...evacuationPlace,
			area: areas.find((area) => evacuationPlace.address.startsWith(area.address)),
		};
	}),
);

export const getMyEvacuationPlaceFn = createServerFn('GET', async () => {
	const user = await getAuthUserFn();
	if (user === null) {
		throw new Error('Unauthorized');
	}

	const evacuationPlace = await getEvacuationPlaceByUserId(db, { userId: user.id });
	if (evacuationPlace === undefined) {
		return undefined;
	}

	const areas = await getAreas(db);
	return {
		...evacuationPlace,
		area: areas.find((area) => evacuationPlace.address.startsWith(area.address)),
	};
});

export const createEvacuationPlaceFn = createServerFn(
	'POST',
	serverZodValidator(createEvacuationPlaceSchema, async (value) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const formattedAddress = await getFormattedAddress(value.address);

		if (formattedAddress === null) {
			return { error: 'invalid-address' as const };
		}

		const supabase = getSupabaseServerClient();
		const picturePaths = await Promise.all(
			value.pictures.map(async (picture) => {
				const { path } = await uploadImage(supabase, user.id, picture);
				return path;
			}),
		);
		const pictureUrls = await Promise.all(
			picturePaths.map(async (path) => {
				const url = await getImagePublicUrl(supabase, path);
				return url;
			}),
		);

		const place = await createEvacuationPlace(db, {
			profileId: user.id,
			...value,
			address: formattedAddress,
			maxHeadcount: Number.parseInt(value.maxHeadcount),
			picturePaths,
			pictureUrls,
		});
		return { place };
	}),
);
