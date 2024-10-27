import { Link } from '@tanstack/react-router';
import { css } from '../../../../styled-system/css';
import Tag from '../tag';

type Props = {
	requestId: number;
	houseName: string;
	houseImgList: string[];
	type: 'permit' | 'beforePermit' | 'reject';
	text: string;
	intro: string;
};

export default function CardWithTag({ requestId, houseName, houseImgList, type, text, intro }: Props) {
	return (
		<Link
			to="/host/requests/$requestId"
			params={{ requestId: requestId.toString() }}
			className={css({
				display: 'block',
				rounded: 'xl',
				py: '[15px]',
				bg: 'white',
			})}
		>
			<div
				className={css({
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: '[15px]',
					px: '[15px]',
				})}
			>
				<h2
					className={css({
						fontSize: '[16px]',
					})}
				>
					{houseName}
				</h2>
				<Tag type={type} text={text} />
			</div>
			<div
				className={css({
					display: 'flex',
					gap: '4',
					mb: '[15px]',
					px: '[15px]',
					overflowX: 'scroll',
				})}
			>
				{houseImgList.map((houseImg, i) => (
					<img
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={i}
						src={houseImg}
						alt=""
						className={css({
							flexShrink: '0',
							objectFit: 'cover',
							rounded: 'xl',
							w: '[130px]',
							h: '[130px]',
						})}
					/>
				))}
			</div>

			<p
				className={css({
					px: '[15px]',
					color: 'text.muted',
					fontSize: '[11px]',
				})}
			>
				{intro}
			</p>
		</Link>
	);
}
