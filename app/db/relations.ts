import { relations } from 'drizzle-orm';
import {} from 'drizzle-orm/pg-core';
import { areaTable, evacuationPlaceTable, favoriteEvacuationPlaceTable, profileTable, requestTable } from './schema';

export const profileRelations = relations(profileTable, ({ many }) => ({
	requests: many(requestTable),
	favoriteEvacuationPlaces: many(favoriteEvacuationPlaceTable),
	evacuationPlaces: many(evacuationPlaceTable),
}));

export const evacuationPlaceRelations = relations(evacuationPlaceTable, ({ one, many }) => ({
	profile: one(profileTable, {
		fields: [evacuationPlaceTable.profileId],
		references: [profileTable.userId],
	}),
	requests: many(requestTable),
	favorites: many(favoriteEvacuationPlaceTable),
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

export const favoriteEvacuationPlaceRelations = relations(favoriteEvacuationPlaceTable, ({ one }) => ({
	profile: one(profileTable, {
		fields: [favoriteEvacuationPlaceTable.profileId],
		references: [profileTable.userId],
	}),
	evacuationPlace: one(evacuationPlaceTable, {
		fields: [favoriteEvacuationPlaceTable.evacuationPlaceId],
		references: [evacuationPlaceTable.id],
	}),
}));
