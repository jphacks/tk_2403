import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login/')({
	component: Login,
});

function Login() {
	return (
		<main>
			<button
				type="button"
				onClick={() => {
					location.href = '/api/auth/google';
				}}
			>
				Googleでログイン
			</button>
		</main>
	);
}
