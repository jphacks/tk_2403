import { Link, type ReactNode } from '@tanstack/react-router';
import { cva } from '../../../styled-system/css';

type Props = {
	children: ReactNode;
	color: 'primary' | 'safe';
	to: '/guest/register' | '/host/register';
};

export default function Card({ children, color, to }: Props) {
	const colorStyle = cva({
		base: {
			display: 'flex',
			gap: '5',
			justifyContent: 'center',
			alignItems: 'center',
			rounded: 'xl',
			borderWidth: '2px',
			height: '[230px]',
			fontSize: '[24px]',
			fontWeight: 'bold',
		},
		variants: {
			color: {
				primary: { borderColor: 'primary', color: 'primary' },
				safe: { borderColor: 'safe', color: 'safe' },
			},
		},
	});

	return (
		<div>
			<Link to={to} className={colorStyle({ color })}>
				{children}
			</Link>
		</div>
	);
}
