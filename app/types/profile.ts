import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import type { profileTable } from '../db/schema';
import type { AllOptional } from './utils';

export type Profile = InferSelectModel<typeof profileTable>;
export type CreateProfileValue = InferInsertModel<typeof profileTable>;
export type UpdateProfileValue = AllOptional<CreateProfileValue>;
