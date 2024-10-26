import { createFileRoute } from '@tanstack/react-router';
import { css } from '../../../styled-system/css';
import { containerStyle } from '../../styles/layout';

export const Route = createFileRoute('/login/')({
	component: Login,
});

function Login() {
	return (
		<main className={containerStyle()}>
			<div className={css({ display: 'flex', gap: '[160px]', flexDirection: 'column' })}>
				<img src="/nijitaihikun.png" alt="" className={css({ paddingTop: '10' })} />
				<button
					type="button"
					className={css({
						position: 'relative',
						borderRadius: 'md',
						width: 'full',
						paddingY: '3',
						paddingX: '10',
						color: 'text.muted',
						fontSize: 'lg',
						fontWeight: 'bold',
						bg: 'border',
					})}
					onClick={() => {
						location.href = '/api/auth/google';
					}}
				>
					<img
						src="/google.svg"
						alt=""
						width="30px"
						height="30px"
						className={css({ position: 'absolute', top: '3', left: '5' })}
					/>
					Googleでログイン
				</button>
			</div>
		</main>
	);
}
