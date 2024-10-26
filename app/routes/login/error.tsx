import { Link, createFileRoute } from '@tanstack/react-router';
import { container } from '../../../styled-system/patterns';

export const Route = createFileRoute('/login/error')({
	component: () => (
		<main className={container()}>
			<p>ログインに失敗しました。</p>
			<Link to="/login">もう一度ログインする</Link>
		</main>
	),
});
