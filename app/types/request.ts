import type { InferInsertModel } from 'drizzle-orm';
import type { requestTable } from '../db/schema';

export type CreateRequestValue = InferInsertModel<typeof requestTable>;
