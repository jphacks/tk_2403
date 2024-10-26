import { useForm } from '@tanstack/react-form';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/start';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useState } from 'react';
import { css } from '../../../styled-system/css';
import ImageInput from '../../components/imageInput';
import { InfoRow } from '../../components/shared/infoRow';
import SelectInfoRow from '../../components/shared/selectInfoRow';
import Subtitle from '../../components/subtitle';
import Textarea from '../../components/textarea';
import { createProfileSchema } from '../../schemas/profile';
import { createProfileFn, getProfileFn } from '../../server/profile';
import { buttonStyle } from '../../styles/button';
import { containerStyle } from '../../styles/layout';
import type { Image } from '../../types/image';

export const Route = createFileRoute('/_authed/register')({
	loader: async ({ context }) => {
		const profile = await getProfileFn({ userId: context.session.user.id });
		if (profile !== undefined) {
			throw redirect({ to: '/' });
		}

		return { session: context.session };
	},
	component: Register,
});

function Register() {
	const navigate = useNavigate();

	const [pictures, setPictures] = useState<Image[]>([]);
	const [showPicturesError, setShowPicturesError] = useState(false);
	const [ageConfirmed, setAgeConfirmed] = useState(false);
	const [termsAgreed, setTermsAgreed] = useState(false);

	const createProfile = useServerFn(createProfileFn);

	const form = useForm({
		defaultValues: {
			name: '',
			gender: undefined as unknown as 'male' | 'female' | 'other',
			dateOfBirth: '',
			biography: '',
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			if (pictures.length === 0) {
				return;
			}
			await createProfile({ ...value, pictures });
			await navigate({ to: '/' });
		},
	});

	return (
		<main className={containerStyle()}>
			<h2
				className={css({
					mb: '20',
					color: 'text.muted',
					textAlign: 'center',
					fontSize: 'xl',
					fontWeight: 'bold',
				})}
			>
				二次待避君へようこそ
			</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (ageConfirmed && termsAgreed && form.state.canSubmit && !form.state.isSubmitting) {
						form.handleSubmit();
					}
					if (pictures.length === 0) {
						setShowPicturesError(true);
					}
				}}
				className={css({ spaceY: '10' })}
			>
				<div className={css({ spaceY: '4' })}>
					<Subtitle text="写真" />
					<div className={css({ spaceY: '2' })}>
						<ImageInput
							onChange={({ newImages }) => {
								setPictures(newImages);
								if (newImages.length === 0) {
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

				<div className={css({ spaceY: '4' })}>
					<Subtitle text="基本情報" />
					<div
						className={css({
							borderTopWidth: '1px',
							borderColor: 'border',
							width: 'full',
							mb: '8',
							backgroundColor: 'white',
						})}
					>
						<form.Field name="name" validators={{ onChange: createProfileSchema.shape.name }}>
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
						<form.Field name="gender" validators={{ onChange: createProfileSchema.shape.gender }}>
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
						<form.Field name="dateOfBirth" validators={{ onChange: createProfileSchema.shape.dateOfBirth }}>
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
					<form.Field name="biography" validators={{ onChange: createProfileSchema.shape.biography }}>
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

				<div
					className={css({
						width: 'full',
					})}
				>
					<label
						className={css({
							display: 'flex',
							gap: '2',
							alignItems: 'start',
							mb: '2',
						})}
					>
						<input
							type="checkbox"
							checked={ageConfirmed}
							onChange={(e) => setAgeConfirmed(e.currentTarget.checked)}
							className={css({
								width: '5',
								height: '5',
							})}
						/>
						<p
							className={css({
								width: 'full',
								color: 'text',
								fontSize: 'sm',
								wordWrap: 'break-word',
							})}
						>
							私は18歳以上です。
						</p>
					</label>

					<label
						className={css({
							display: 'flex',
							gap: '2',
							alignItems: 'start',
							mb: '10',
						})}
					>
						<input
							type="checkbox"
							checked={termsAgreed}
							onChange={(e) => setTermsAgreed(e.currentTarget.checked)}
							className={css({
								width: '5',
								height: '5',
							})}
						/>
						<p
							className={css({
								width: 'full',
								color: 'text',
								fontSize: 'sm',
								wordWrap: 'break-word',
							})}
						>
							二次待避くんの
							<span className={css({ color: 'primary', fontSize: 'sm' })}>利用規約・プライバシーポリシー</span>
							の内容を確認のうえ、同意します。
						</p>
					</label>

					<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
						{([canSubmit, isSubmitting]) => (
							<button
								type="submit"
								className={buttonStyle({ type: 'normal' })}
								disabled={!ageConfirmed || !termsAgreed || showPicturesError || !canSubmit || isSubmitting}
							>
								二次待避くんをはじめる
							</button>
						)}
					</form.Subscribe>
				</div>
			</form>
		</main>
	);
}
