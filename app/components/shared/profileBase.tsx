import type { ReactNode } from '@tanstack/react-router';
import { css } from '../../../styled-system/css';

type Props = {
	children: ReactNode;
	text: string;
};

export default function ProfileBase({ children, text }: Props) {
	return (
		<div
			className={css({
				display: 'flex',
				flex: '1',
				flexDirection: 'column',
				roundedTop: '3xl',
				bg: 'white',
			})}
		>
			<p
				className={css({
					borderBottomWidth: '2px',
					borderColor: 'border',
					p: '5',
					color: 'warn',
					fontSize: '[14px]',
					fontWeight: 'bold',
				})}
			>
				{text}
			</p>
			<div
				className={css({
					height: 'full',
					pt: '[30px]',
				})}
			>
				{children}
			</div>
		</div>
	);
}
