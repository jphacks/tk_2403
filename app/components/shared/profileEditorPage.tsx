import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/start';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useState } from 'react';
import { css } from '../../../styled-system/css';
import { updateProfileSchema } from '../../schemas/profile';
import { updateProfileFn } from '../../server/profile';
import { buttonStyle } from '../../styles/button';
import { containerStyle } from '../../styles/layout';
import type { Image } from '../../types/image';
import type { Profile } from '../../types/profile';
import ImageInput from '../imageInput';
import Subtitle from '../subtitle';
import Textarea from '../textarea';
import { InfoRow } from './infoRow';
import SelectInfoRow from './selectInfoRow';

type Props = {
	profile: Profile;
	to: string;
};

export default function ProfileEditorPage({ profile, to }: Props) {
	const navigate = useNavigate();

	const [deletePictureIndices, setDeletePictureIndices] = useState<number[]>([]);
	const [newPictures, setNewPictures] = useState<Image[]>([]);
	const [picturesLength, setPicturesLength] = useState(profile.pictureUrls.length);
	const [showPicturesError, setShowPicturesError] = useState(false);

	const updateProfile = useServerFn(updateProfileFn);

	const form = useForm({
		defaultValues: {
			name: profile.name,
			biography: profile.biography,
			gender: profile.gender,
			dateOfBirth: profile.dateOfBirth,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			if (picturesLength === 0) {
				return;
			}
			await updateProfile({
				...value,
				deletePictureIndices,
				newPictures,
			});
			await navigate({ to });
		},
	});

	return (
		<main className={css(containerStyle.raw(), { spaceY: '16' })}>
			<h2
				className={css({
					color: 'text.muted',
					textAlign: 'center',
					fontSize: 'xl',
					fontWeight: 'bold',
				})}
			>
				プロフィールを編集する
			</h2>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (form.state.canSubmit && !form.state.isSubmitting) {
						form.handleSubmit();
					}
					if (picturesLength === 0) {
						setShowPicturesError(true);
					}
				}}
				className={css({ spaceY: '16' })}
			>
				<div className={css({ spaceY: '4' })}>
					<Subtitle text="写真" />
					<div className={css({ spaceY: '2' })}>
						<ImageInput
							defaultUrls={profile.pictureUrls}
							onChange={({ deleteIndices, newImages }) => {
								setDeletePictureIndices(deleteIndices);
								setNewPictures(newImages);
								const updatedPicturesLength = profile.pictureUrls.length + newImages.length - deleteIndices.length;
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
							name="name"
							validators={{
								onChange: updateProfileSchema.shape.name,
							}}
						>
							{(field) => (
								<InfoRow
									label="名前"
									value={field.state.value}
									placeholder="例: 山田 太郎"
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={field.handleBlur}
								/>
							)}
						</form.Field>
						<form.Field
							name="gender"
							validators={{
								onChange: updateProfileSchema.shape.gender,
							}}
						>
							{(field) => (
								<SelectInfoRow
									selectList={{ male: '男', female: '女', other: 'その他' }}
									label="性別"
									value={field.state.value}
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={field.handleBlur}
								/>
							)}
						</form.Field>
						<form.Field
							name="dateOfBirth"
							validators={{
								onChange: updateProfileSchema.shape.dateOfBirth,
							}}
						>
							{(field) => (
								<InfoRow
									label="生年月日"
									value={field.state.value}
									placeholder="例: 2000-01-01"
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={field.handleBlur}
								/>
							)}
						</form.Field>
					</div>
				</div>

				<div
					className={css({
						display: 'flex',
						flexDirection: 'column',
						spaceY: '4',
					})}
				>
					<Subtitle text="自己紹介" />
					<form.Field
						name="biography"
						validators={{
							onChange: updateProfileSchema.shape.biography,
						}}
					>
						{(field) => (
							<Textarea
								placeholder="自己紹介を入力してください..."
								value={field.state.value}
								errors={field.state.meta.errors}
								onChange={(value) => field.handleChange(value)}
								onBlur={field.handleBlur}
							/>
						)}
					</form.Field>
				</div>

				<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
					{([canSubmit, isSubmitting]) => (
						<button
							type="submit"
							className={buttonStyle({ type: 'normal' })}
							disabled={showPicturesError || !canSubmit || isSubmitting}
						>
							保存する
						</button>
					)}
				</form.Subscribe>
			</form>
		</main>
	);
}
