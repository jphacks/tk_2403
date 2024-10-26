import type { InferInsertModel } from 'drizzle-orm';
import type { profileTable } from '../db/schema';

export type CreateProfileValue = InferInsertModel<typeof profileTable>;
