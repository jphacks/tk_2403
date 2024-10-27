import { cva } from '../../../styled-system/css';

type Props = {
	type: 'permit' | 'beforePermit' | 'reject';
	text: string;
};

export const TagStyle = cva({
	base: {
		display: 'flex',
		flexShrink: '0',
		justifyContent: 'center',
		alignItems: 'center',
		rounded: 'md',
		w: '[80px]',
		py: '1',
		px: '5',
		color: 'white',
		fontSize: '[12px]',
		fontWeight: 'bold',
	},
	variants: {
		type: {
			permit: { bg: 'safe' },
			beforePermit: { bg: 'warn' },
			reject: { bg: 'alert' },
		},
	},
});

export default function Tag({ type, text }: Props) {
	return <div className={TagStyle({ type })}>{text}</div>;
}
