import { eq } from 'drizzle-orm';
import type { DB } from '../db/client';
import { profileTable } from '../db/schema';
import type { CreateProfileValue } from '../types/profile';

export async function getProfile(db: DB, filter: { userId: string }) {
	const profile = await db.query.profileTable.findFirst({
		where: eq(profileTable.userId, filter.userId),
	});
	return profile;
}

export async function createProfile(db: DB, value: CreateProfileValue) {
	const [profile] = await db.insert(profileTable).values(value).returning();
	return profile!;
}