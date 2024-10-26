import { eq } from 'drizzle-orm';
import type { DB } from '../db/client';
import { evacuationPlaceTable, favoriteEvacuationPlaceTable, requestTable } from '../db/schema';
import type { CreateEvacuationPlaceValue } from '../types/evacuationPlace';

export async function getEvacuationPlace(db: DB, authUserId: string, filter: { id: number }) {
	const data = await db.query.evacuationPlaceTable.findFirst({
		with: {
			profile: true,
			favorites: {
				where: eq(favoriteEvacuationPlaceTable.profileId, authUserId),
			},
			requests: {
				where: eq(requestTable.profileId, authUserId),
			},
		},
		where: eq(evacuationPlaceTable.id, filter.id),
	});
	if (data === undefined) {
		return undefined;
	}
	const { favorites, requests, ...place } = data;
	return {
		...place,
		isFavorite: favorites.length > 0,
		requestStatus: requests.length > 0 ? requests[0]!.status : null,
	};
}

export async function getEvacuationPlaceByUserId(db: DB, filter: { userId: string }) {
	const place = await db.query.evacuationPlaceTable.findFirst({
		with: { profile: true },
		where: eq(evacuationPlaceTable.profileId, filter.userId),
	});
	return place;
}

export async function createEvacuationPlace(db: DB, value: CreateEvacuationPlaceValue) {
	const [place] = await db.insert(evacuationPlaceTable).values(value).returning();
	return place!;
}
