export async function getFormattedAddress(address: string) {
	const res = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&language=ja&key=${process.env.GOOGLE_MAPS_API_KEY}`,
	);
	const json = await res.json();

	return formatAddress(json.results);
}

export async function getFormattedAddressFromCoordinates(lat: number, lng: number) {
	const res = await fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ja&key=${process.env.GOOGLE_MAPS_API_KEY}`,
	);
	const json = await res.json();

	return formatAddress(json.results);
}

type AddressComponent = {
	long_name: string;
	short_name: string;
	types: string[];
};

type GeocodingResult = {
	address_components: AddressComponent[];
};

export function formatAddress(results: GeocodingResult[]) {
	if (results.length === 0) {
		return null;
	}

	const addressComponents = results[0]!.address_components;
	const country = addressComponents.find((component) => component.types.includes('country'))?.short_name;

	if (country !== 'JP') {
		return null;
	}

	let address = '';

	for (const component of addressComponents) {
		if (component.types.includes('country')) {
			break;
		}
		address = component.long_name + address;
	}

	return address;
}
