import { desc, sql } from 'drizzle-orm';
import type { DB } from '../db/client';
import { areaTable } from '../db/schema';

export async function getAreas(db: DB) {
	const areas = await db.query.areaTable.findMany({
		orderBy: desc(sql`LENGTH(${areaTable.address})`),
	});
	return areas;
}
