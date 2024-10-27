import { and, eq } from 'drizzle-orm';
import type { DB } from '../db/client';
import { favoriteEvacuationPlaceTable } from '../db/schema';
import type { CreateFavoriteValue } from '../types/favorite';
import type {} from '../types/profile';

export async function getFavorites(db: DB, filter: { userId: string }) {
	const favorites = await db.query.favoriteEvacuationPlaceTable.findMany({
		with: {
			evacuationPlace: {
				with: { profile: true },
			},
		},
		where: eq(favoriteEvacuationPlaceTable.profileId, filter.userId),
	});
	return favorites;
}

export async function createFavorite(db: DB, value: CreateFavoriteValue) {
	const [favorite] = await db.insert(favoriteEvacuationPlaceTable).values(value).returning();
	return favorite!;
}

export async function deleteFavorite(db: DB, userId: string, evacuationPlaceId: number) {
	await db
		.delete(favoriteEvacuationPlaceTable)
		.where(
			and(
				eq(favoriteEvacuationPlaceTable.profileId, userId),
				eq(favoriteEvacuationPlaceTable.evacuationPlaceId, evacuationPlaceId),
			),
		);
}
