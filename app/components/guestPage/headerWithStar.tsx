import { FaRegStar } from 'react-icons/fa';
import { css } from '../../../styled-system/css';

type Props = {
	title: string;
	backToPage?: boolean;
	to?: string;
};

export default function HeaderWithStar({ title }: Props) {
	return (
		<div
			className={css({
				display: 'flex',
				position: 'sticky',
				top: '0',
				left: '0',
				right: '0',
				justifyContent: 'center',
				borderBottomWidth: '1px',
				borderColor: 'border',
				h: '[50px]',
				pt: '3',
				pb: '4',
				bg: 'white',
			})}
		>
			<button type="button">
				<FaRegStar
					className={css({
						position: 'absolute',
						right: '6',
						bottom: '4',
						width: '5',
						height: '5',
						color: 'warn',
						cursor: 'pointer',
					})}
				/>
			</button>
			<p
				className={css({
					fontSize: 'md',
				})}
			>
				{title}
			</p>
		</div>
	);
}
