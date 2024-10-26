import type { SupabaseClient } from '@supabase/supabase-js';

export async function getImagePublicUrl(supabase: SupabaseClient, path: string) {
	const { data } = await supabase.storage.from('images').getPublicUrl(path);
	return data.publicUrl;
}

export async function uploadImage(supabase: SupabaseClient, userId: string, image: { base64: string; type: string }) {
	const fileName = crypto.randomUUID();
	const file = Buffer.from(image.base64, 'base64');
	const { data, error } = await supabase.storage
		.from('images')
		.upload(`${userId}/${fileName}`, file, { contentType: image.type });
	if (error) {
		throw error;
	}
	return data;
}

export async function deleteImages(supabase: SupabaseClient, paths: string[]) {
	await supabase.storage.from('images').remove(paths);
}
