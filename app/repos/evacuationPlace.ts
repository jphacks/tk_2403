import { and, desc, eq, gte, like, lte } from 'drizzle-orm';
import type { DB } from '../db/client';
import { evacuationPlaceTable, favoriteEvacuationPlaceTable, profileTable, requestTable } from '../db/schema';
import type { CreateEvacuationPlaceValue, UpdateEvacuationPlaceValue } from '../types/evacuationPlace';

export async function getEvacuationPlaces(
	db: DB,
	authUserId: string,
	filter: {
		headcount?: number;
		areaAddress?: string;
		desiredPeriodStart?: string;
		desiredPeriodEnd?: string;
		hasPet: boolean;
		needBarrierFree: boolean;
		hostGender?: 'male' | 'female' | 'other';
	},
) {
	const values = await db
		.select({
			evacuvationPlace: evacuationPlaceTable,
			profile: profileTable,
			favoriteId: favoriteEvacuationPlaceTable.id,
			requestStatus: requestTable.status,
		})
		.from(evacuationPlaceTable)
		.innerJoin(profileTable, eq(profileTable.userId, evacuationPlaceTable.profileId))
		.leftJoin(
			favoriteEvacuationPlaceTable,
			and(
				eq(favoriteEvacuationPlaceTable.evacuationPlaceId, evacuationPlaceTable.id),
				eq(favoriteEvacuationPlaceTable.profileId, authUserId),
			),
		)
		.leftJoin(
			requestTable,
			and(eq(requestTable.evacuationPlaceId, evacuationPlaceTable.id), eq(requestTable.profileId, authUserId)),
		)
		.where(
			and(
				filter.headcount !== undefined ? gte(evacuationPlaceTable.maxHeadcount, filter.headcount) : undefined,
				filter.areaAddress !== undefined ? like(evacuationPlaceTable.address, `${filter.areaAddress}%`) : undefined,
				filter.desiredPeriodStart !== undefined
					? lte(evacuationPlaceTable.availablePeriodStart, filter.desiredPeriodStart)
					: undefined,
				filter.desiredPeriodEnd !== undefined
					? gte(evacuationPlaceTable.availablePeriodEnd, filter.desiredPeriodEnd)
					: undefined,
				filter.hasPet ? eq(evacuationPlaceTable.petAllowed, true) : undefined,
				filter.needBarrierFree ? eq(evacuationPlaceTable.barrierFree, true) : undefined,
				filter.hostGender !== undefined ? eq(profileTable.gender, filter.hostGender) : undefined,
			),
		)
		.orderBy(desc(evacuationPlaceTable.createdAt));

	return values.map((value) => ({
		...value.evacuvationPlace,
		profile: value.profile,
		isFavorite: value.favoriteId !== null,
		requestStatus: value.requestStatus,
	}));
}

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

export async function updateEvacuationPlace(db: DB, id: number, value: UpdateEvacuationPlaceValue) {
	const [place] = await db.update(evacuationPlaceTable).set(value).where(eq(evacuationPlaceTable.id, id)).returning();
	return place;
}
