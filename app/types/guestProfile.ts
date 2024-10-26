import type { InferInsertModel } from 'drizzle-orm';
import type { guestProfileTable } from '../db/schema';

export type CreateGuestProfileValue = InferInsertModel<typeof guestProfileTable>;
