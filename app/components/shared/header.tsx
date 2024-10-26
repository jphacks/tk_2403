import { Link, useRouter } from '@tanstack/react-router';
import { FaPen } from 'react-icons/fa';
import { RxCaretLeft } from 'react-icons/rx';
import { css } from '../../../styled-system/css';

type Props = {
	title: string;
	backToPage?: boolean;
	to?: string;
};

export default function Header({ title, backToPage = false, to }: Props) {
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
					onClick={() => router.history.back()}
					className={css({
						position: 'absolute',
						left: '3',
						bottom: '1',
						width: '10',
						height: '10',
						color: 'text.muted',
						cursor: 'pointer',
					})}
				/>
			)}
			{to && (
				<Link to={to}>
					<FaPen
						className={css({
							position: 'absolute',
							right: '6',
							bottom: '3',
							width: '5',
							height: '5',
							color: 'text.muted',
							cursor: 'pointer',
						})}
					/>
				</Link>
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
