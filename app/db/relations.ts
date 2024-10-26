import { relations } from 'drizzle-orm';
import {} from 'drizzle-orm/pg-core';
import {
	areaTable,
	evacuationPlaceTable,
	guestProfileTable,
	hostProfileTable,
	profileTable,
	requestTable,
} from './schema';

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
