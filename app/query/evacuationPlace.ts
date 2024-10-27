export const getMyEvacuationPlaceFnQueryKey = ['evacuationPlace', 'my'];
export const createGetEvacuationPlacesFnQueryKey = (filter: Record<string, unknown>) => [
	'evacuationPlace',
	'list',
	filter,
];
