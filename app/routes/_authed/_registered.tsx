import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { getProfileFn } from '../../server/profile';

export const Route = createFileRoute('/_authed/_registered')({
	beforeLoad: async ({ context }) => {
		const profile = await getProfileFn({ userId: context.session.user.id });
		if (profile === undefined) {
			throw redirect({ to: '/register' });
		}

		return { session: { ...context.session, profile } };
	},
	component: Registered,
});

function Registered() {
	return <Outlet />;
}
