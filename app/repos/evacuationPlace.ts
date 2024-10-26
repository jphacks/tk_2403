import type { DB } from '../db/client';
import { evacuationPlaceTable } from '../db/schema';
import type { CreateEvacuationPlaceValue } from '../types/evacuationPlace';

export async function createEvacuationPlace(db: DB, value: CreateEvacuationPlaceValue) {
	const [profile] = await db.insert(evacuationPlaceTable).values(value).returning();
	return profile!;
}
