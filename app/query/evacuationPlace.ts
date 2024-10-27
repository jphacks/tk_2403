export const getMyEvacuationPlaceFnQueryKey = ['evacuationPlace', 'mine'];
export const createGetEvacuationPlacesFnQueryKey = (filter: Record<string, unknown>) => [
	'evacuationPlace',
	'list',
	filter,
];
