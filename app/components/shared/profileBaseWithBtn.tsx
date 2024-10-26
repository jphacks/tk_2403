import type { ReactNode } from '@tanstack/react-router';
import { css } from '../../../styled-system/css';

type Props = {
	children: ReactNode;
	text: string;
};

export default function ProfileBaseWithBtn({ children, text }: Props) {
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
			<div
				className={css({
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderBottomWidth: '2px',
					borderColor: 'border',
					p: '5',
				})}
			>
				<p
					className={css({
						color: 'warn',
						fontSize: '[14px]',
						fontWeight: 'bold',
					})}
				>
					{text}
				</p>
				<button
					type="button"
					className={css({
						borderColor: 'safe',
						rounded: 'md',
						borderWidth: '[2px]',
						py: '2',
						px: '4',
						color: 'safe',
						fontSize: '[12px]',
					})}
				>
					申請する
				</button>
			</div>
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
