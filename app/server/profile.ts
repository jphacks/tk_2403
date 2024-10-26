import { createServerFn } from '@tanstack/start';
import { db } from '../db/client';
import { deleteImages, getImagePublicUrl, uploadImage } from '../repos/image';
import { createProfile, getProfile, updateProfile } from '../repos/profile';
import { createProfileSchema, getProfileSchema, updateProfileSchema } from '../schemas/profile';
import { serverZodValidator } from '../utils/server';
import { getSupabaseServerClient } from '../utils/supabase';
import { getAuthUserFn } from './auth';

export const getProfileFn = createServerFn(
	'GET',
	serverZodValidator(getProfileSchema, async ({ userId }) => {
		const profile = await getProfile(db, { userId });
		return profile;
	}),
);

export const createProfileFn = createServerFn(
	'POST',
	serverZodValidator(createProfileSchema, async (value) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const supabase = getSupabaseServerClient();
		const picturePaths = await Promise.all(
			value.pictures.map(async (picture) => {
				const { path } = await uploadImage(supabase, user.id, picture);
				return path;
			}),
		);
		const pictureUrls = await Promise.all(
			picturePaths.map(async (path) => {
				const url = await getImagePublicUrl(supabase, path);
				return url;
			}),
		);

		const profile = await createProfile(db, {
			userId: user.id,
			...value,
			picturePaths,
			pictureUrls,
		});
		return profile;
	}),
);

export const updateProfileFn = createServerFn(
	'POST',
	serverZodValidator(updateProfileSchema, async (value) => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw new Error('Unauthorized');
		}

		const supabase = getSupabaseServerClient();
		const newPicturePaths = await Promise.all(
			value.newPictures.map(async (picture) => {
				const { path } = await uploadImage(supabase, user.id, picture);
				return path;
			}),
		);
		const newPictureUrls = await Promise.all(
			newPicturePaths.map(async (path) => {
				const url = await getImagePublicUrl(supabase, path);
				return url;
			}),
		);

		const { profile, deletePicturePaths } = await db.transaction(async (tx) => {
			const oldProfile = await getProfile(tx, { userId: user.id });
			if (oldProfile === undefined) {
				throw new Error('Profile not found');
			}

			const picturePaths = [
				...oldProfile.picturePaths!.filter((_, i) => !value.deletePictureIndices.includes(i)),
				...newPicturePaths,
			];
			const pictureUrls = [
				...oldProfile.pictureUrls!.filter((_, i) => !value.deletePictureIndices.includes(i)),
				...newPictureUrls,
			];
			const deletePicturePaths = oldProfile.picturePaths!.filter((_, i) => value.deletePictureIndices.includes(i));

			const profile = await updateProfile(tx, user.id, {
				...value,
				picturePaths,
				pictureUrls,
			});

			return { profile: profile!, deletePicturePaths };
		});

		await deleteImages(supabase, deletePicturePaths);

		return { profile };
	}),
);
