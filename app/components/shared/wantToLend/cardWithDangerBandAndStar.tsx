import { Link } from '@tanstack/react-router';
import { css } from '../../../../styled-system/css';
import DangerBand from '../dangerBand';

type Props = {
	houseName: string;
	houseImgList: string[];
	type: 'safe' | 'caution' | 'danger';
	address: string;
	intro: string;
};

export default function CardWithDangerBandAndStar({ houseName, houseImgList, type, address, intro }: Props) {
	return (
		<Link
			to="/host/place"
			className={css({ display: 'block', roundedTop: 'md', roundedBottom: 'xl', overflow: 'hidden' })}
		>
			<DangerBand type={type} address={address} />
			<div
				className={css({
					py: '[15px]',
					bg: 'white',
				})}
			>
				<h2
					className={css({
						mb: '[15px]',
						px: '[15px]',
						fontSize: '[16px]',
					})}
				>
					{houseName}
				</h2>
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
							// biome-ignore lint/suspicious/noArrayIndexKey:
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
			</div>
		</Link>
	);
}
