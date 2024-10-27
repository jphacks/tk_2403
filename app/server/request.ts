import { notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { db } from '../db/client';
import { getAreas } from '../repos/area';
import { getEvacuationPlaceByUserId } from '../repos/evacuationPlace';
import {} from '../repos/image';
import {} from '../repos/profile';
import {
	createRequest,
	deleteRequest,
	getRequest,
	getRequestByGuestAndPlace,
	getRequestByPlaceId,
	getUserRequests,
	updateRequest,
} from '../repos/request';
import {
	approveRequestSchema,
	cancelRequestSchema,
	createRequestSchema,
	getRequestsSchema,
	rejectRequestSchema,
} from '../schemas/request';
import { serverZodValidator } from '../utils/server';
import { getAuthUserFn } from './auth';

export const getMyRequestsFn = createServerFn('GET', async () => {
	const user = await getAuthUserFn();
	if (user === null) {
		throw new Error('Unauthorized');
	}

	const requests = await getUserRequests(db, user.id, { userId: user.id });

	const areas = await getAreas(db);
	return requests.map((request) => ({
		...request,
		area: areas.find((area) => request.evacuationPlace.address.startsWith(area.address)),
	}));
});

export const getRecievedRequestsFn = createServerFn('GET', async () => {
	const user = await getAuthUserFn();
	if (user === null) {
		throw new Error('Unauthorized');
	}

	const place = await getEvacuationPlaceByUserId(db, { userId: user.id });
	if (place === undefined) {
		return [];
	}

	const requests = await getRequestByPlaceId(db, { evacuationPlaceId: place.id });
	return requests;
});

export const getRequestFn = createServerFn(
	'GET',
	serverZodValidator(getRequestsSchema, async ({ requestId }) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const request = await getRequest(db, { requestId });
		if (request === undefined) {
			throw notFound();
		}
		if (request.evacuationPlace.profileId !== user.id) {
			throw new Error('Forbidden');
		}
		return request;
	}),
);

export const createRequestFn = createServerFn(
	'POST',
	serverZodValidator(createRequestSchema, async (value) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const request = await db.transaction(async (tx) => {
			const requests = await getUserRequests(tx, user.id, { userId: user.id });
			if (requests.filter((request) => request.status !== 'rejected').length > 0) {
				throw new Error('You already have a pending request');
			}
			const request = await createRequest(tx, {
				profileId: user.id,
				evacuationPlaceId: value.evacuationPlaceId,
				status: 'requesting',
			});
			return request;
		});
		return request;
	}),
);

export const cancelRequestFn = createServerFn(
	'POST',
	serverZodValidator(cancelRequestSchema, async ({ evacuationPlaceId }) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		await db.transaction(async (tx) => {
			const request = await getRequestByGuestAndPlace(tx, { guestId: user.id, evacuationPlaceId });
			if (request === undefined) {
				throw new Error('Request not found');
			}
			if (request.profileId !== user.id) {
				throw new Error('Forbidden');
			}
			if (request.status !== 'requesting') {
				throw new Error('Request is not in requesting status');
			}
			await deleteRequest(tx, request.id);
		});
	}),
);

export const approveRequestFn = createServerFn(
	'POST',
	serverZodValidator(approveRequestSchema, async ({ requestId }) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const request = await db.transaction(async (tx) => {
			const oldRequest = await getRequest(tx, { requestId });
			if (oldRequest === undefined) {
				throw new Error('Request not found');
			}
			if (oldRequest.evacuationPlace.profileId !== user.id) {
				throw new Error('Forbidden');
			}
			if (oldRequest.status !== 'requesting') {
				throw new Error('Request is not in requesting status');
			}
			const request = await updateRequest(tx, requestId, { status: 'approved' });
			return request;
		});
		return request;
	}),
);

export const rejectRequestFn = createServerFn(
	'POST',
	serverZodValidator(rejectRequestSchema, async ({ requestId }) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const request = await db.transaction(async (tx) => {
			const oldRequest = await getRequest(tx, { requestId });
			if (oldRequest === undefined) {
				throw new Error('Request not found');
			}
			if (oldRequest.evacuationPlace.profileId !== user.id) {
				throw new Error('Forbidden');
			}
			if (oldRequest.status !== 'requesting') {
				throw new Error('Request is not in requesting status');
			}
			const request = await updateRequest(tx, requestId, { status: 'rejected' });
			return request;
		});
		return request;
	}),
);
