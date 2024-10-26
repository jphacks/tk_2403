import type { InferInsertModel } from 'drizzle-orm';
import type { hostProfileTable } from '../db/schema';

export type CreateHostProfileValue = InferInsertModel<typeof hostProfileTable>;
