import { type QueryKey, queryOptions, useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/start';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function serverFnQuery<TServerFn extends (...deps: Array<any>) => Promise<any>>(serverFn: TServerFn) {
	return {
		serverQueryOptions: <T extends QueryKey, U>({
			queryKey,
			queryFn,
		}: {
			queryKey: T;
			queryFn: (fn: TServerFn) => Promise<U>;
		}) =>
			queryOptions({
				queryKey,
				queryFn: () => queryFn(serverFn),
			}),
		useQuery: <T extends QueryKey, U>({
			queryKey,
			queryFn,
		}: {
			queryKey: T;
			queryFn: (fn: TServerFn) => Promise<U>;
		}) => {
			const fn = useServerFn(serverFn) as unknown as TServerFn;
			return useQuery({ queryKey, queryFn: () => queryFn(fn) });
		},
	};
}
