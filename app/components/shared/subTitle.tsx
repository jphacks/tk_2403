import { css } from '../../../styled-system/css';

type Props = {
	text: string;
};

export default function Subtitle({ text }: Props) {
	return (
		<div
			className={css({
				color: 'text.muted',
				fontSize: 'lg',
				fontWeight: 'bold',
			})}
		>
			{text}
		</div>
	);
}
