import { useRouter } from '@tanstack/react-router';
import { RxCaretLeft } from 'react-icons/rx';
import { css } from '../../../styled-system/css';

type Props = {
	title: string;
	backToPage?: boolean;
};

export default function Header({ title, backToPage = false }: Props) {
	const router = useRouter();
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
			{backToPage && (
				<RxCaretLeft
					onClick={() => router.history.back}
					className={css({
						position: 'absolute',
						top: '1',
						left: '3',
						width: '10',
						height: '10',
						color: 'text.muted',
						cursor: 'pointer',
					})}
				/>
			)}
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
