import { createAPIFileRoute } from '@tanstack/start/api';
import { getSupabaseServerClient } from '../../../utils/supabase';

export const Route = createAPIFileRoute('/api/auth/callback')({
	GET: async ({ request }) => {
		const { searchParams } = new URL(request.url);
		const code = searchParams.get('code');

		if (code !== null) {
			const supabase = getSupabaseServerClient();
			const { data } = await supabase.auth.exchangeCodeForSession(code);

			if (data.user !== null) {
				return new Response(null, {
					status: 302,
					headers: {
						Location: '/',
					},
				});
			}
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/login/error',
			},
		});
	},
});
