import { drizzle } from 'drizzle-orm/node-postgres';
import * as relations from './relations';
import * as schema from './schema';

export const db = drizzle({
	connection: process.env.DATABASE_URL!,
	schema: { ...schema, ...relations },
});

export type DB = typeof db;