import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { getAuthUserFn } from '../server/auth';

export const Route = createFileRoute('/login')({
	loader: async () => {
		const user = await getAuthUserFn();
		if (user !== null) {
			throw redirect({ to: '/' });
		}
	},
	component: LoginLayout,
});

function LoginLayout() {
	return <Outlet />;
}
