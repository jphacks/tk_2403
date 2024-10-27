import { useServerFn } from '@tanstack/start';
import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { css } from '../../../styled-system/css';
import { createFavoriteFn, deleteFavoriteFn } from '../../server/favorite';

type Props = {
	title: string;
	placeId: number;
	isFavorite: boolean;
	backToPage?: boolean;
	to?: string;
};

export default function HeaderWithStar({ title, placeId, isFavorite }: Props) {
	const createFavorite = useServerFn(createFavoriteFn);
	const deleteFavorite = useServerFn(deleteFavoriteFn);
	const [currentIsFavorite, setCurrentIsFavorite] = useState(isFavorite);

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
			{currentIsFavorite ? (
				<FaStar
					className={css({
						position: 'absolute',
						right: '6',
						bottom: '4',
						width: '5',
						height: '5',
						color: 'warn',
						cursor: 'pointer',
					})}
					onClick={async (e) => {
						e.stopPropagation();
						await deleteFavorite({ evacuationPlaceId: placeId });
						setCurrentIsFavorite(false);
					}}
				/>
			) : (
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
					onClick={async (e) => {
						e.stopPropagation();
						await createFavorite({ evacuationPlaceId: placeId });
						setCurrentIsFavorite(true);
					}}
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
