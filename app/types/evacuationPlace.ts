import type { InferInsertModel } from 'drizzle-orm';
import type { evacuationPlaceTable } from '../db/schema';

export type CreateEvacuationPlaceValue = InferInsertModel<typeof evacuationPlaceTable>;
