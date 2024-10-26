import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { getAuthUserFn } from '../server/auth';

export const Route = createFileRoute('/_authed')({
	beforeLoad: async () => {
		const user = await getAuthUserFn();
		if (user === null) {
			throw redirect({ to: '/login' });
		}

		return { session: { user } };
	},
	component: Authed,
});

function Authed() {
	return <Outlet />;
}
