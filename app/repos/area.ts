import type { DB } from '../db/client';

export async function getAreas(db: DB) {
	const areas = await db.query.areaTable.findMany();
	return areas;
}
