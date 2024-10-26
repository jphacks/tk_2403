import type { FetchFn } from '@tanstack/start';
import type { z } from 'zod';

export function serverZodValidator<T extends z.ZodSchema, U>(
	schema: T,
	fn: FetchFn<z.output<T>, U>,
): FetchFn<z.input<T>, U> {
	return (payload, ctx) => {
		return fn(schema.parse(payload), ctx);
	};
}
