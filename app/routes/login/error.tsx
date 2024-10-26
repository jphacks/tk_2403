import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login/error')({
	component: () => (
		<main>
			<p>ログインに失敗しました。</p>
			<Link to="/login">もう一度ログインする</Link>
		</main>
	),
});
