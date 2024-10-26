import { useMemo, useState } from 'react';
import { css } from '../../styled-system/css';
import type { Image } from '../types/image';

type Props = {
	defaultUrls?: string[];
	onChange: (value: { newImages: Image[]; deleteIndices: number[] }) => void;
};

export default function ImageInput({ defaultUrls = [], onChange }: Props) {
	const [newImages, setNewImages] = useState<Image[]>([]);
	const [deleteIndices, setDeleteIndices] = useState<number[]>([]);
	const urls = useMemo(
		() => [...defaultUrls, ...newImages.map((image) => `data:${image.type};base64,${image.base64}`)],
		[defaultUrls, newImages],
	);
	const showIndices = useMemo(() => urls.map((_, i) => i), [urls]).filter((i) => !deleteIndices.includes(i));
	const [currentIndex, setCurrentIndex] = useState<number | null>(showIndices.length > 0 ? 0 : null);

	function getImageInfo(file: File): Promise<Image> {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = () => {
				const dataUrl = reader.result as string;
				const base64 = dataUrl.split(',')[1]!;
				resolve({ base64, type: file.type });
			};
			reader.readAsDataURL(file);
		});
	}

	const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageInfo = await getImageInfo(file);
			const updatedNewImages = [...newImages, imageInfo];
			setNewImages([...newImages, imageInfo]);
			onChange({ newImages: updatedNewImages, deleteIndices });
			setCurrentIndex(showIndices.length);
		}
		e.target.value = '';
	};

	const handleDeleteImage = (index: number) => {
		if (index < defaultUrls.length) {
			const updatedDeleteIndices = [...deleteIndices, index];
			setDeleteIndices(updatedDeleteIndices);
			onChange({ newImages, deleteIndices: updatedDeleteIndices });
		} else {
			const updatedNewImages = newImages.filter((_, i) => i !== index - defaultUrls.length);
			setNewImages(updatedNewImages);
			onChange({ newImages: updatedNewImages, deleteIndices });
		}

		if (showIndices.length === 1) {
			setCurrentIndex(null);
		} else if (currentIndex! > showIndices.length - 2) {
			setCurrentIndex(showIndices.length - 2);
		}
	};

	const handleThumbnailClick = (index: number) => {
		setCurrentIndex(showIndices.indexOf(index));
	};

	return (
		<div className={css({ mx: '-4', spaceY: '2' })}>
			{currentIndex !== null ? (
				<img
					src={urls[showIndices[currentIndex]!]}
					alt="Selected house"
					className={css({
						objectFit: 'cover',
						rounded: 'xl',
						w: '[260px]',
						h: '[260px]',
						mx: 'auto',
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

			{urls.length > 0 && (
				<div className={css({ overflowX: 'scroll' })}>
					<div
						className={css({
							display: 'flex',
							gap: '4',
							width: '[max-content]',
							px: '[15px]',
						})}
					>
						{urls.map((url, i) => {
							if (deleteIndices.includes(i)) return null;
							return (
								// biome-ignore lint/suspicious/noArrayIndexKey:
								<div key={i} className={css({ position: 'relative', flexShrink: '0' })}>
									<img
										src={url}
										alt=""
										onClick={() => handleThumbnailClick(i)}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												handleThumbnailClick(i);
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
								</div>
							);
						})}

						{urls.length > 0 && (
							<label
								className={css({
									display: 'flex',
									flexShrink: '0',
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
				</div>
			)}
		</div>
	);
}
