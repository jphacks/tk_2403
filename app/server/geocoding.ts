import { createServerFn } from '@tanstack/start';
import { db } from '../db/client';
import { getAreas } from '../repos/area';
import { getFormattedAddressFromCoordinates } from '../repos/geocoding';
import { getLocationDataSchema } from '../schemas/geocoding';
import { serverZodValidator } from '../utils/server';

export const getLocationDataFn = createServerFn(
	'GET',
	serverZodValidator(getLocationDataSchema, async ({ lat, lng }) => {
		const address = await getFormattedAddressFromCoordinates(lat, lng);
		if (address === null) {
			return {};
		}
		const areas = await getAreas(db);
		const area = areas.find((area) => address.startsWith(area.address));
		return { address, area };
	}),
);
