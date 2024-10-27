import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, unique } from 'drizzle-orm/pg-core';

export const genderEnum = pgEnum('gender', ['male', 'female', 'other']);
export const safetyEnum = pgEnum('safety', ['safe', 'caution', 'danger']);
export const requestStatusEnum = pgEnum('request_status', ['requesting', 'approved', 'rejected']);

export const profileTable = pgTable('profile', {
	userId: text('user_id').primaryKey(),
	name: text('name').notNull(),
	biography: text('biography').notNull(),
	gender: genderEnum('gender').notNull(),
	dateOfBirth: text('date_of_birth').notNull(), // YYYY-MM-DD
	picturePaths: text('picture_paths').array().notNull(),
	pictureUrls: text('picture_urls').array().notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.defaultNow()
		.$onUpdate(() => new Date().toISOString())
		.notNull(),
});

export const evacuationPlaceTable = pgTable('evacuation_place', {
	id: serial('id').primaryKey(),
	profileId: text('profile_id')
		.notNull()
		.unique()
		.references(() => profileTable.userId),
	description: text('description').notNull(),
	picturePaths: text('picture_paths').array().notNull(),
	pictureUrls: text('picture_urls').array().notNull(),
	address: text('address').notNull(),
	maxHeadcount: integer('max_headcount').notNull(),
	availablePeriodStart: text('available_period_start').notNull(), // YYYY-MM
	availablePeriodEnd: text('available_period_end').notNull(), // YYYY-MM
	petAllowed: boolean('pet_allowed').notNull(),
	barrierFree: boolean('barrier_free').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.defaultNow()
		.$onUpdate(() => new Date().toISOString())
		.notNull(),
});

export const areaTable = pgTable('area', {
	id: serial('id').primaryKey(),
	address: text('address').notNull(),
	safety: safetyEnum('safety').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.defaultNow()
		.$onUpdate(() => new Date().toISOString())
		.notNull(),
});

export const requestTable = pgTable('request', {
	id: serial('id').primaryKey(),
	profileId: text('profile_id')
		.notNull()
		.references(() => profileTable.userId),
	evacuationPlaceId: integer('evacuation_place_id')
		.notNull()
		.references(() => evacuationPlaceTable.id),
	status: requestStatusEnum('status').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.defaultNow()
		.$onUpdate(() => new Date().toISOString())
		.notNull(),
});

export const favoriteEvacuationPlaceTable = pgTable(
	'favorite_evacuation_place',
	{
		id: serial('id').primaryKey(),
		profileId: text('profile_id')
			.notNull()
			.references(() => profileTable.userId),
		evacuationPlaceId: integer('evacuation_place_id')
			.notNull()
			.references(() => evacuationPlaceTable.id),
		createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
			.defaultNow()
			.$onUpdate(() => new Date().toISOString())
			.notNull(),
	},
	(table) => {
		return {
			favoriteUnique: unique('favorite_unique').on(table.profileId, table.evacuationPlaceId),
		};
	},
);
