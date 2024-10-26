import { createAPIFileRoute } from '@tanstack/start/api';
import { getSupabaseServerClient } from '../../../utils/supabase';

export const Route = createAPIFileRoute('/api/auth/google')({
	GET: async ({ request }) => {
		const url = new URL(request.url);
		const supabase = getSupabaseServerClient();
		const { data } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${url.origin}/api/auth/callback`,
			},
		});

		if (data.url === null) {
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/login/error',
				},
			});
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: data.url,
			},
		});
	},
});
