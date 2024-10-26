import { eq } from 'drizzle-orm';
import type { DB } from '../db/client';
import { guestProfileTable } from '../db/schema';
import type { CreateGuestProfileValue } from '../types/guestProfile';

export async function getGuestProfile(db: DB, filter: { profileId: string }) {
	const profile = await db.query.guestProfileTable.findFirst({
		where: eq(guestProfileTable.profileId, filter.profileId),
	});
	return profile;
}

export async function createGuestProfile(db: DB, value: CreateGuestProfileValue) {
	const [profile] = await db.insert(guestProfileTable).values(value).returning();
	return profile!;
}
