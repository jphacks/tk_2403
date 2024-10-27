import type { InferInsertModel } from 'drizzle-orm';
import type { favoriteEvacuationPlaceTable } from '../db/schema';

export type CreateFavoriteValue = InferInsertModel<typeof favoriteEvacuationPlaceTable>;
