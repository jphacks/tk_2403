import { eq } from 'drizzle-orm';
import type { DB } from '../db/client';
import { hostProfileTable } from '../db/schema';
import type { CreateHostProfileValue } from '../types/hostProfile';

export async function getHostProfile(db: DB, filter: { profileId: string }) {
	const profile = await db.query.hostProfileTable.findFirst({
		where: eq(hostProfileTable.profileId, filter.profileId),
	});
	return profile;
}

export async function createHostProfile(db: DB, value: CreateHostProfileValue) {
	const [profile] = await db.insert(hostProfileTable).values(value).returning();
	return profile!;
}
