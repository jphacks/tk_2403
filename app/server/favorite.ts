import { createServerFn } from '@tanstack/start';
import { db } from '../db/client';
import { getAreas } from '../repos/area';
import { createFavorite, deleteFavorite, getFavorites } from '../repos/favorite';
import {} from '../repos/image';
import { createFavoriteSchema, deleteFavoriteSchema } from '../schemas/favorite';
import { serverZodValidator } from '../utils/server';
import { getAuthUserFn } from './auth';

export const getFavoritesFn = createServerFn('GET', async () => {
	const user = await getAuthUserFn();
	if (user === null) {
		throw new Error('Unauthorized');
	}

	const favorites = await getFavorites(db, { userId: user.id });

	const areas = await getAreas(db);
	return favorites.map((favorite) => ({
		...favorite,
		area: areas.find((area) => favorite.evacuationPlace.address.startsWith(area.address)),
	}));
});

export const createFavoriteFn = createServerFn(
	'POST',
	serverZodValidator(createFavoriteSchema, async (value) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const favorite = await createFavorite(db, {
			profileId: user.id,
			...value,
		});
		return favorite;
	}),
);

export const deleteFavoriteFn = createServerFn(
	'POST',
	serverZodValidator(deleteFavoriteSchema, async ({ evacuationPlaceId }) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		await deleteFavorite(db, user.id, evacuationPlaceId);
	}),
);
