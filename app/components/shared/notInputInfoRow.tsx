import { css } from '../../../styled-system/css';

type Props = {
	label: string;
	value: string;
};

export default function NotInputInfoRow({ value, label }: Props) {
	return (
		<div
			className={css({
				display: 'flex',
				gap: '2',
				flexDir: 'column',
				borderBottomWidth: '1px',
				borderColor: 'border',
				padding: '3',
				fontSize: 'sm',
			})}
		>
			<div
				className={css({
					display: 'flex',
				})}
			>
				<div className={css({ flex: '1', color: 'text.muted' })}>{label}</div>
				<p
					className={css({
						flex: '1',
						color: 'primary',
					})}
				>
					{value}
				</p>
			</div>
		</div>
	);
}
