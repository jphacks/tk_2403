import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';
import { getSupabaseServerClient } from '../utils/supabase';

export const getAuthUserFn = createServerFn('GET', async () => {
	const supabase = getSupabaseServerClient();
	const { data } = await supabase.auth.getUser();

	if (data.user?.email === undefined) {
		return null;
	}

	return data.user;
});

export const logoutFn = createServerFn('POST', async () => {
	const supabase = getSupabaseServerClient();
	await supabase.auth.signOut();

	throw redirect({ to: '/login' });
});
