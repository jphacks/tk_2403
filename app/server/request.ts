import { createServerFn } from '@tanstack/start';
import { db } from '../db/client';
import {} from '../repos/image';
import {} from '../repos/profile';
import { createRequest, deleteRequest, getRequest, getUserRequests, updateRequest } from '../repos/request';
import { createRequestSchema, getUserRequestsSchema, updateRequestSchema } from '../schemas/request';
import { serverZodValidator } from '../utils/server';
import { getAuthUserFn } from './auth';

export const getUserRequestsFn = createServerFn(
	'GET',
	serverZodValidator(getUserRequestsSchema, async ({ userId }) => {
		const requests = await getUserRequests(db, { userId });
		return requests;
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
			const requests = await getUserRequests(tx, { userId: user.id });
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
	serverZodValidator(updateRequestSchema, async ({ requestId }) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		await db.transaction(async (tx) => {
			const oldRequest = await getRequest(tx, { requestId });
			if (oldRequest === undefined) {
				throw new Error('Request not found');
			}
			if (oldRequest.profileId !== user.id) {
				throw new Error('Forbidden');
			}
			if (oldRequest.status !== 'requesting') {
				throw new Error('Request is not in requesting status');
			}
			await deleteRequest(tx, requestId);
		});
	}),
);

export const approveRequestFn = createServerFn(
	'POST',
	serverZodValidator(updateRequestSchema, async ({ requestId }) => {
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
	serverZodValidator(updateRequestSchema, async ({ requestId }) => {
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
