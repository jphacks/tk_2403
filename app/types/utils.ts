export type AllOptional<T> = {
	[K in keyof T]?: T[K];
};
