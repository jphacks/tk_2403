import { useForm } from '@tanstack/react-form';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/start';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useState } from 'react';
import { css } from '../../../styled-system/css';
import { InfoRow } from '../../components/shared/infoRow';
import SelectInfoRow from '../../components/shared/selectInfoRow';
import { createProfileSchema } from '../../schemas/profile';
import { createProfileFn, getProfileFn } from '../../server/profile';
import { containerStyle } from '../../styles/layout';

export const Route = createFileRoute('/_authed/register')({
	loader: async ({ context }) => {
		const profile = await getProfileFn({ userId: context.session.user.id });
		if (profile !== undefined) {
			throw redirect({ to: '/' });
		}
	},
	component: Register,
});

function Register() {
	const router = useRouter();

	const [ageConfirmed, setAgeConfirmed] = useState(false);
	const [termsAgreed, setTermsAgreed] = useState(false);

	const createProfile = useServerFn(createProfileFn);

	const form = useForm({
		defaultValues: {
			name: '',
			gender: undefined,
			dateOfBirth: '',
		} as unknown as typeof createProfileSchema._input,
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await createProfile(value);
			await router.invalidate();
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
				}}
			>
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
							/>
						)}
					</form.Field>
				</div>
				<div
					className={css({
						width: 'full',
					})}
				>
					<p
						className={css({
							mb: '[120px]',
							paddingLeft: '2',
							color: 'text.muted',
							fontSize: 'sm',
						})}
					>
						この設定は後から変更可能です。
					</p>

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
								className={css({
									border: 'none',
									borderRadius: 'md',
									width: 'full',
									padding: '3',
									color: 'text.muted',
									fontSize: 'sm',
									fontWeight: 'bold',
									backgroundColor: 'border',
									cursor: 'pointer',
									_disabled: {
										cursor: 'not-allowed',
									},
								})}
								disabled={!ageConfirmed || !termsAgreed || !canSubmit || isSubmitting}
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
