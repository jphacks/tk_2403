import { css } from '../../../../styled-system/css';
import Tag from '../tag';

type Props = {
	houseName: string;
	houseImgList: string[];
	type: 'permit' | 'beforePermit' | 'reject';
	text: string;
};

export default function CardWithTag({ houseName, houseImgList, type, text }: Props) {
	return (
		<div>
			<div
				className={css({
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
					初めまして、とみたです。よろしくお願いします。
				</p>
			</div>
		</div>
	);
}
