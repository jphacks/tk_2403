import { relations } from 'drizzle-orm';
import {} from 'drizzle-orm/pg-core';
import { areaTable, evacuationPlaceTable, profileTable, requestTable } from './schema';

export const profileRelations = relations(profileTable, ({ many }) => ({
	requests: many(requestTable),
	evacuationPlaces: many(evacuationPlaceTable),
}));

export const evacuationPlaceRelations = relations(evacuationPlaceTable, ({ one, many }) => ({
	profile: one(profileTable, {
		fields: [evacuationPlaceTable.profileId],
		references: [profileTable.userId],
	}),
	area: one(areaTable, {
		fields: [evacuationPlaceTable.areaId],
		references: [areaTable.id],
	}),
	requests: many(requestTable),
}));

export const areaRelations = relations(areaTable, ({ many }) => ({
	evacuationPlaces: many(evacuationPlaceTable),
}));

export const requestRelations = relations(requestTable, ({ one }) => ({
	profile: one(profileTable, {
		fields: [requestTable.profileId],
		references: [profileTable.userId],
	}),
	evacuationPlace: one(evacuationPlaceTable, {
		fields: [requestTable.evacuationPlaceId],
		references: [evacuationPlaceTable.id],
	}),
}));
