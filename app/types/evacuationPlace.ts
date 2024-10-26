import type { InferInsertModel } from 'drizzle-orm';
import type { evacuationPlaceTable } from '../db/schema';
import type { AllOptional } from './utils';

export type CreateEvacuationPlaceValue = InferInsertModel<typeof evacuationPlaceTable>;
export type UpdateEvacuationPlaceValue = AllOptional<CreateEvacuationPlaceValue>;
