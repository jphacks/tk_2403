import { type QueryKey, queryOptions, useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/start';

export function serverFnQueryWrapper<
	T extends QueryKey,
	// biome-ignore lint/suspicious/noExplicitAny:
	U extends (...deps: Array<any>) => Promise<any>,
	V,
>({ queryKey, serverFn, queryFn }: { queryKey: T; serverFn: U; queryFn: (fn: U) => Promise<V> }) {
	return {
		serverQueryOptions: queryOptions({
			queryKey,
			queryFn: () => queryFn(serverFn),
		}),
		useQuery: () => {
			const fn = useServerFn(serverFn) as unknown as U;
			return useQuery({ queryKey, queryFn: () => queryFn(fn) });
		},
	};
}
