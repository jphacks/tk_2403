import { useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/start';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { css } from '../../../../styled-system/css';
import { createFavoriteFn, deleteFavoriteFn } from '../../../server/favorite';
import DangerBand from '../dangerBand';

type Props = {
	placeId: number;
	houseName: string;
	houseImgList: string[];
	type: 'safe' | 'caution' | 'danger';
	address: string;
	intro: string;
	isFavorite: boolean;
};

export default function CardWithDangerBand({
	placeId,
	houseName,
	houseImgList,
	type,
	address,
	intro,
	isFavorite,
}: Props) {
	const navigate = useNavigate();
	const [currentIsFavorite, setCurrentIsFavorite] = useState(isFavorite);
	const createFavorite = useServerFn(createFavoriteFn);
	const deleteFavorite = useServerFn(deleteFavoriteFn);

	return (
		<button
			type="button"
			onClick={() => {
				navigate({ to: '/guest/place/$placeId', params: { placeId: placeId.toString() } });
			}}
			className={css({ display: 'block', roundedTop: 'md', roundedBottom: 'xl', w: 'full', overflow: 'hidden' })}
		>
			<DangerBand type={type} address={address} />
			<div
				className={css({
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
							fontWeight: 'normal',
						})}
					>
						{houseName}
					</h2>
					{currentIsFavorite ? (
						<FaStar
							className={css({ color: 'primary', fontSize: 'lg' })}
							onClick={async (e) => {
								e.stopPropagation();
								await deleteFavorite({ evacuationPlaceId: placeId });
								setCurrentIsFavorite(false);
							}}
						/>
					) : (
						<FaRegStar
							className={css({ color: 'primary', fontSize: 'lg' })}
							onClick={async (e) => {
								e.stopPropagation();
								await createFavorite({ evacuationPlaceId: placeId });
								setCurrentIsFavorite(true);
							}}
						/>
					)}
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
		</button>
	);
}
