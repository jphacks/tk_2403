import { useState } from 'react';
import { css } from '../../styled-system/css';

type Props = {
	deleteMode: boolean;
};

export default function ImagePreview({ deleteMode }: Props) {
	const [imageList, setImageList] = useState<string[]>([]);
	const [nowImage, setNowImage] = useState<string | null>(null);
	const [imageError, setImageError] = useState<string | null>(null); // Error for image selection
	const [thumbnailError, setThumbnailError] = useState<string | null>(null); // Error for thumbnails

	const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target?.files?.[0];
		if (file) {
			const newImageUrl = URL.createObjectURL(file);
			const updatedList = [...imageList, newImageUrl];
			setImageList(updatedList);
			setNowImage(newImageUrl);
			setImageError(null); // Clear error when a valid image is added
		} else {
			setImageError('画像を選択してください');
		}
	};

	const handleDeleteImage = (index: number) => {
		const newList: string[] = imageList.filter((_, i) => i !== index);
		setImageList(newList);
		if (newList.length > 0) {
			setNowImage(newList[0]!);
		} else {
			setNowImage(null);
		}
		setThumbnailError(null); // Clear any errors related to thumbnails
	};

	const handleThumbnailClick = (image: string) => {
		if (image) {
			setNowImage(image);
			setThumbnailError(null); // Clear error when a valid thumbnail is clicked
		} else {
			setThumbnailError('画像を選択してください');
		}
	};

	return (
		<div>
			{nowImage ? (
				<img
					src={nowImage}
					alt="Selected house"
					className={css({
						rounded: 'xl',
						w: '[260px]',
						h: '[260px]',
						mx: 'auto',
						mb: '[10px]',
						bg: '[#aaa]',
					})}
				/>
			) : (
				<label
					className={css({
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderColor: 'border',
						borderRadius: 'xl',
						borderWidth: '1px',
						width: '[260px]',
						height: '[260px]',
						mx: 'auto',
						mb: '[10px]',
						fontSize: '3xl',
						bg: 'white',
						borderStyle: 'dashed',
						cursor: 'pointer',
					})}
				>
					＋
					<input type="file" accept="image/*" onChange={handleAddImage} style={{ display: 'none' }} />
				</label>
			)}

			{/* Error message for the main image */}
			{imageError && (
				<p className={css({ mb: '4', color: 'alert', textAlign: 'center', fontSize: 'sm' })}>{imageError}</p>
			)}

			{imageList.length > 0 && (
				<div
					className={css({
						display: 'flex',
						gap: '4',
						mb: '[15px]',
						px: '[15px]',
						overflowX: 'scroll',
					})}
				>
					{imageList.map((houseImg, i) => (
						<div key={houseImg} className={css({ position: 'relative' })}>
							<img
								src={houseImg}
								alt={`House ${i}`}
								onClick={() => handleThumbnailClick(houseImg)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										handleThumbnailClick(houseImg);
									}
								}}
								className={css({
									flexShrink: '0',
									objectFit: 'cover',
									rounded: 'xl',
									w: '[70px]',
									h: '[70px]',
									cursor: 'pointer',
								})}
							/>
							{deleteMode && (
								<button
									type="button"
									onClick={() => handleDeleteImage(i)}
									className={css({
										display: 'flex',
										position: 'absolute',
										top: '0',
										right: '0',
										justifyContent: 'center',
										alignItems: 'center',
										rounded: 'full',
										width: '5',
										height: '5',
										p: '1',
										pb: '2',
										color: 'white',
										bg: 'alert',
									})}
								>
									×
								</button>
							)}
						</div>
					))}

					{/* Smaller plus button for adding more images, shown after first image is added */}
					{imageList.length > 0 && (
						<label
							className={css({
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								objectFit: 'cover',
								borderColor: 'border',
								borderRadius: 'xl',
								borderWidth: '1px',
								width: '[70px]',
								height: '[70px]',
								borderStyle: 'dashed',
								cursor: 'pointer',
							})}
						>
							＋
							<input type="file" accept="image/*" onChange={handleAddImage} style={{ display: 'none' }} />
						</label>
					)}
				</div>
			)}

			{/* Error message for the thumbnails */}
			{thumbnailError && (
				<p className={css({ mt: '4', color: 'alert', textAlign: 'center', fontSize: 'sm' })}>{thumbnailError}</p>
			)}
		</div>
	);
}
