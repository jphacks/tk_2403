import { useState } from 'react';
import { css } from '../../../styled-system/css';

type Props = {
	houseImgList: string[];
};

export default function ImagePreview({ houseImgList }: Props) {
	const [nowImage, setNowImage] = useState(houseImgList[0]);

	return (
		<div>
			<img
				src={nowImage}
				alt=""
				className={css({
					objectFit: 'cover',
					rounded: 'xl',
					w: '[260px]',
					h: '[260px]',
					mx: 'auto',
					mb: '[15px]',
					bg: '[#aaa]',
				})}
			/>
			<div
				className={css({
					display: 'flex',
					gap: '4',
					px: '[15px]',
					overflowX: 'scroll',
				})}
			>
				{houseImgList.map((houseImg, i) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<img
						onClick={() => setNowImage(houseImg)}
						// biome-ignore lint/suspicious/noArrayIndexKey:
						key={i}
						src={houseImg}
						alt=""
						className={css({
							flexShrink: '0',
							objectFit: 'cover',
							rounded: 'xl',
							w: '[70px]',
							h: '[70px]',
						})}
					/>
				))}
			</div>
		</div>
	);
}
