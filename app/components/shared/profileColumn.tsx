import { css } from '../../../styled-system/css';

type Props = {
	name: string;
	src: string;
};

export default function ProfileColumn({ name, src }: Props) {
	return (
		<div
			className={css({
				display: 'flex',
				gap: '3',
				alignItems: 'center',
			})}
		>
			<img
				src={src}
				alt=""
				className={css({
					rounded: 'full',
					w: '[36px]',
					h: '[36px]',
				})}
			/>
			<p>{name}</p>
		</div>
	);
}
