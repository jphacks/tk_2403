import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './migrations',
	dialect: 'postgresql',
	schema: './app/db/schema.ts',
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
