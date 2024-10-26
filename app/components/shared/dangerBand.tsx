import { css, cva } from '../../../styled-system/css';

type Props = {
	type: 'safe' | 'caution' | 'danger';
	address: string;
};

export default function DangerBand({ type, address }: Props) {
	const dangerBandStyle = cva({
		base: {
			display: 'flex',
			gap: '2',
			alignItems: 'center',
			roundedTop: 'md',
			py: '2',
			px: '2',
		},
		variants: {
			type: {
				safe: { bg: 'safe.bg' },
				caution: { bg: 'warn.bg' },
				danger: { bg: 'alert.bg' },
			},
		},
	});

	const dangerLabelStyle = cva({
		base: {
			rounded: 'md',
			w: '[max-content]',
			py: '1',
			px: '3',
			color: 'white',
			fontSize: '[11px]',
			fontWeight: 'bold',
			bg: 'alert',
		},
		variants: {
			type: {
				safe: { bg: 'safe' },
				caution: { bg: 'warn' },
				danger: { bg: 'alert' },
			},
		},
	});

	return (
		<div className={dangerBandStyle({ type })}>
			<div className={dangerLabelStyle({ type })}>
				{type === 'safe' && '安全'}
				{type === 'caution' && '少し危険'}
				{type === 'danger' && '危険'}
			</div>
			<p
				className={css({
					fontSize: 'xs',
				})}
			>
				{address}
			</p>
		</div>
	);
}
