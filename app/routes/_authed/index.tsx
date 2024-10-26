import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/start';
import { logoutFn } from '../../server/auth';

export const Route = createFileRoute('/_authed/')({
	component: Home,
});

function Home() {
	const logout = useServerFn(logoutFn);

	return (
		<main>
			<button
				type="button"
				onClick={async () => {
					await logout();
				}}
			>
				ログアウト
			</button>
		</main>
	);
}
