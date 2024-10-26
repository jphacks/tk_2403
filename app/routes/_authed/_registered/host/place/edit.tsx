import { useForm } from '@tanstack/react-form';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/start';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useState } from 'react';
import { css, cx } from '../../../../../../styled-system/css';
import ImageInput from '../../../../../components/imageInput';
import { InfoRow } from '../../../../../components/shared/infoRow';
import SelectInfoRow from '../../../../../components/shared/selectInfoRow';
import Subtitle from '../../../../../components/subtitle';
import Textarea from '../../../../../components/textarea';
import { createEvacuationPlaceSchema } from '../../../../../schemas/evacuationPlace';
import { getMyEvacuationPlaceFn, updateEvacuationPlaceFn } from '../../../../../server/evacuationPlace';
import { buttonStyle } from '../../../../../styles/button';
import { containerStyle } from '../../../../../styles/layout';
import type { Image } from '../../../../../types/image';

export const Route = createFileRoute('/_authed/_registered/host/place/edit')({
	loader: async () => {
		const place = await getMyEvacuationPlaceFn();
		if (place === undefined) {
			throw redirect({ to: '/host/place/create' });
		}
		return { place };
	},
	component: EditPlace,
});

function EditPlace() {
	const { place } = Route.useLoaderData();
	const navigate = useNavigate();

	const [deletePictureIndices, setDeletePictureIndices] = useState<number[]>([]);
	const [newPictures, setNewPictures] = useState<Image[]>([]);
	const [picturesLength, setPicturesLength] = useState(place.pictureUrls.length);
	const [showPicturesError, setShowPicturesError] = useState(false);
	const [showInvalidAddressError, setShowInvalidAddressError] = useState(false);

	const updateEvacuationPlace = useServerFn(updateEvacuationPlaceFn);

	const form = useForm({
		defaultValues: {
			description: place.description,
			address: place.address,
			maxHeadcount: place.maxHeadcount.toString(),
			availablePeriodStart: place.availablePeriodStart,
			availablePeriodEnd: place.availablePeriodEnd,
			petAllowed: place.petAllowed,
			barrierFree: place.barrierFree,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			if (picturesLength === 0) {
				return;
			}
			const { error } = await updateEvacuationPlace({ ...value, deletePictureIndices, newPictures });
			if (error === 'invalid-address') {
				setShowInvalidAddressError(true);
				return;
			}
			await navigate({ to: '/host/place' });
		},
	});

	return (
		<main
			className={cx(
				containerStyle(),
				css({
					spaceY: '16',
				}),
			)}
		>
			<h2
				className={css({
					color: 'text.muted',
					textAlign: 'center',
					fontSize: 'xl',
					fontWeight: 'bold',
				})}
			>
				提供場所を編集する
			</h2>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (!showInvalidAddressError && form.state.canSubmit && !form.state.isSubmitting) {
						form.handleSubmit();
					}
					if (picturesLength === 0) {
						setShowPicturesError(true);
					}
				}}
				className={css({ spaceY: '16' })}
			>
				<div className={css({ spaceY: '4' })}>
					<Subtitle text="提供場所の写真" />
					<div className={css({ spaceY: '2' })}>
						<ImageInput
							defaultUrls={place.pictureUrls}
							onChange={({ deleteIndices, newImages }) => {
								setDeletePictureIndices(deleteIndices);
								setNewPictures(newImages);
								const updatedPicturesLength = place.pictureUrls.length + newImages.length - deleteIndices.length;
								setPicturesLength(updatedPicturesLength);
								if (updatedPicturesLength === 0) {
									setShowPicturesError(true);
								} else {
									setShowPicturesError(false);
								}
							}}
						/>
						{showPicturesError && (
							<p
								className={css({
									color: 'alert',
									fontSize: 'xs',
								})}
							>
								写真を1枚以上追加してください。
							</p>
						)}
					</div>
				</div>

				<div
					className={css({
						display: 'flex',
						flexDirection: 'column',
						spaceY: '4',
					})}
				>
					<Subtitle text="家の説明文" />
					<form.Field
						name="description"
						validators={{
							onChange: createEvacuationPlaceSchema.shape.description,
						}}
					>
						{(field) => (
							<Textarea
								placeholder="説明文を入力してください..."
								value={field.state.value}
								errors={field.state.meta.errors}
								onChange={(value) => field.handleChange(value)}
								onBlur={field.handleBlur}
							/>
						)}
					</form.Field>
				</div>

				<div
					className={css({
						spaceY: '4',
					})}
				>
					<Subtitle text="基本情報" />
					<div
						className={css({
							borderTopWidth: '[1px]',
							borderColor: 'border',
						})}
					>
						<form.Field
							name="address"
							validators={{
								onChange: createEvacuationPlaceSchema.shape.address,
							}}
						>
							{(field) => (
								<InfoRow
									label="住所"
									value={field.state.value}
									placeholder="例: 東京都千代田区千代田1-1"
									errors={
										showInvalidAddressError
											? [...field.state.meta.errors, '有効な住所を入力してください']
											: field.state.meta.errors
									}
									onChange={(value) => {
										field.handleChange(value);
										setShowInvalidAddressError(false);
									}}
									onBlur={field.handleBlur}
								/>
							)}
						</form.Field>
						<form.Field
							name="maxHeadcount"
							validators={{
								onChange: createEvacuationPlaceSchema.shape.maxHeadcount,
							}}
						>
							{(field) => (
								<InfoRow
									label="受け入れ可能人数"
									value={field.state.value}
									placeholder="例: 1"
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={field.handleBlur}
								/>
							)}
						</form.Field>
						<form.Field
							name="availablePeriodStart"
							validators={{
								onChange: createEvacuationPlaceSchema.shape.availablePeriodStart,
							}}
						>
							{(field) => (
								<InfoRow
									label="提供可能期間（開始）"
									value={field.state.value}
									placeholder="例: 2000-01"
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={field.handleBlur}
								/>
							)}
						</form.Field>
						<form.Field
							name="availablePeriodEnd"
							validators={{
								onChange: createEvacuationPlaceSchema.shape.availablePeriodEnd,
							}}
						>
							{(field) => (
								<InfoRow
									label="提供可能期間（終了）"
									value={field.state.value}
									placeholder="例: 2000-01"
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={field.handleBlur}
								/>
							)}
						</form.Field>
						<form.Field
							name="petAllowed"
							validators={{
								onChange: createEvacuationPlaceSchema.shape.petAllowed,
							}}
						>
							{(field) => (
								<SelectInfoRow
									selectList={{ true: '可', false: '否' }}
									label="ペットの受け入れ"
									value={field.state.value === undefined ? undefined : field.state.value ? 'true' : 'false'}
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value === 'true')}
									onBlur={field.handleBlur}
								/>
							)}
						</form.Field>
						<form.Field
							name="barrierFree"
							validators={{
								onChange: createEvacuationPlaceSchema.shape.barrierFree,
							}}
						>
							{(field) => (
								<SelectInfoRow
									selectList={{ true: '有', false: '無' }}
									label="バリアフリー"
									value={field.state.value === undefined ? undefined : field.state.value ? 'true' : 'false'}
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value === 'true')}
									onBlur={field.handleBlur}
								/>
							)}
						</form.Field>
					</div>
				</div>

				<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
					{([canSubmit, isSubmitting]) => (
						<button
							type="submit"
							className={buttonStyle({ type: 'normal' })}
							disabled={showPicturesError || showInvalidAddressError || !canSubmit || isSubmitting}
						>
							登録する
						</button>
					)}
				</form.Subscribe>
			</form>
		</main>
	);
}
