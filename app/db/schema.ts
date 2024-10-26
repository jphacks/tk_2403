import { relations } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const genderEnum = pgEnum('gender', ['male', 'female', 'other']);
export const safetyEnum = pgEnum('safety', ['safe', 'caution', 'danger']);
export const requestStatusEnum = pgEnum('request_status', ['requesting', 'approved', 'rejected']);

export const profileTable = pgTable('profile', {
	userId: text('user_id').primaryKey(),
	name: text('name').notNull(),
	gender: genderEnum('gender').notNull(),
	dateOfBirth: timestamp('date_of_birth').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const guestProfileTable = pgTable('guest_profile', {
	profileId: text('profile_id')
		.primaryKey()
		.references(() => profileTable.userId),
	biography: text('biography'),
	pictureUrls: text('picture_urls').array(),
	headcount: integer('headcount').notNull(),
	desiredAreaId: integer('desired_area_id').references(() => areaTable.id),
	desiredPeriodStart: text('desired_period_start').notNull(), // YYYY-MM
	desiredPeriodEnd: text('desired_period_end').notNull(), // YYYY-MM
	hasPet: boolean('has_pet').notNull(),
	needBarrierFree: boolean('need_barrier_free').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const hostProfileTable = pgTable('host_profile', {
	profileId: text('profile_id')
		.primaryKey()
		.references(() => profileTable.userId),
	biography: text('biography'),
	pictureUrls: text('picture_urls').array(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const evacuationPlaceTable = pgTable('evacuation_place', {
	id: serial('id').primaryKey(),
	hostProfileId: text('host_profile_id').references(() => hostProfileTable.profileId),
	name: text('name').notNull(),
	description: text('description').notNull(),
	pictureUrls: text('picture_urls').array(),
	areaId: integer('area_id').references(() => areaTable.id),
	address: text('address').notNull(),
	maxHeadcount: integer('max_headcount').notNull(),
	availablePeriodStart: text('available_period_start').notNull(), // YYYY-MM
	availablePeriodEnd: text('available_period_end').notNull(), // YYYY-MM
	petAllowed: boolean('pet_allowed').notNull(),
	barrierFree: boolean('barrier_free').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const areaTable = pgTable('area', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	safety: safetyEnum('safety').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

export const requestTable = pgTable('request', {
	id: serial('id').primaryKey(),
	guestProfileId: text('guest_profile_id').references(() => guestProfileTable.profileId),
	evacuationPlaceId: integer('evacuation_place_id').references(() => evacuationPlaceTable.id),
	status: requestStatusEnum('status').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

// リレーションの定義
export const profileRelations = relations(profileTable, ({ one }) => ({
	guestProfile: one(guestProfileTable, {
		fields: [profileTable.userId],
		references: [guestProfileTable.profileId],
	}),
	hostProfile: one(hostProfileTable, {
		fields: [profileTable.userId],
		references: [hostProfileTable.profileId],
	}),
}));

export const guestProfileRelations = relations(guestProfileTable, ({ one, many }) => ({
	profile: one(profileTable, {
		fields: [guestProfileTable.profileId],
		references: [profileTable.userId],
	}),
	area: one(areaTable, {
		fields: [guestProfileTable.desiredAreaId],
		references: [areaTable.id],
	}),
	requests: many(requestTable),
}));

export const hostProfileRelations = relations(hostProfileTable, ({ one, many }) => ({
	profile: one(profileTable, {
		fields: [hostProfileTable.profileId],
		references: [profileTable.userId],
	}),
	evacuationPlaces: many(evacuationPlaceTable),
}));

export const evacuationPlaceRelations = relations(evacuationPlaceTable, ({ one, many }) => ({
	hostProfile: one(hostProfileTable, {
		fields: [evacuationPlaceTable.hostProfileId],
		references: [hostProfileTable.profileId],
	}),
	area: one(areaTable, {
		fields: [evacuationPlaceTable.areaId],
		references: [areaTable.id],
	}),
	requests: many(requestTable),
}));

export const areaRelations = relations(areaTable, ({ many }) => ({
	guestProfiles: many(guestProfileTable),
	evacuationPlaces: many(evacuationPlaceTable),
}));

export const requestRelations = relations(requestTable, ({ one }) => ({
	guestProfile: one(guestProfileTable, {
		fields: [requestTable.guestProfileId],
		references: [guestProfileTable.profileId],
	}),
	evacuationPlace: one(evacuationPlaceTable, {
		fields: [requestTable.evacuationPlaceId],
		references: [evacuationPlaceTable.id],
	}),
}));
