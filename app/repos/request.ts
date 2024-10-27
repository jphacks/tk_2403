import { and, eq } from 'drizzle-orm';
import type { DB } from '../db/client';
import { favoriteEvacuationPlaceTable, requestTable } from '../db/schema';
import type {} from '../types/profile';
import type { CreateRequestValue } from '../types/request';

export async function getUserRequests(db: DB, authUserId, filter: { userId: string }) {
	const requests = await db.query.requestTable.findMany({
		with: {
			evacuationPlace: {
				with: {
					profile: true,
					favorites: {
						where: eq(favoriteEvacuationPlaceTable.profileId, authUserId),
					},
				},
			},
			profile: true,
		},
		where: eq(requestTable.profileId, filter.userId),
	});
	return requests.map((request) => {
		const { favorites, ...evacuationPlace } = request.evacuationPlace;
		return {
			...request,
			evacuationPlace: {
				...evacuationPlace,
				isFavorite: favorites.length > 0,
			},
		};
	});
}

export async function getRequestByPlaceId(db: DB, filter: { evacuationPlaceId: number }) {
	const requests = await db.query.requestTable.findMany({
		with: { evacuationPlace: true, profile: true },
		where: eq(requestTable.evacuationPlaceId, filter.evacuationPlaceId),
	});
	return requests;
}

export async function getRequest(db: DB, filter: { requestId: number }) {
	const request = await db.query.requestTable.findFirst({
		with: { evacuationPlace: true, profile: true },
		where: eq(requestTable.id, filter.requestId),
	});
	return request;
}

export async function getRequestByGuestAndPlace(db: DB, filter: { guestId: string; evacuationPlaceId: number }) {
	const request = await db.query.requestTable.findFirst({
		with: { evacuationPlace: true, profile: true },
		where: and(
			eq(requestTable.profileId, filter.guestId),
			eq(requestTable.evacuationPlaceId, filter.evacuationPlaceId),
		),
	});
	return request;
}

export async function createRequest(db: DB, value: CreateRequestValue) {
	const [request] = await db.insert(requestTable).values(value).returning();
	return request!;
}

export async function updateRequest(
	db: DB,
	requestId: number,
	value: { status: 'requesting' | 'approved' | 'rejected' },
) {
	const [request] = await db.update(requestTable).set(value).where(eq(requestTable.id, requestId)).returning();
	return request;
}

export async function deleteRequest(db: DB, requestId: number) {
	await db.delete(requestTable).where(eq(requestTable.id, requestId));
}
