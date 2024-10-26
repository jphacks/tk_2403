import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { css, cx } from '../../../../../../styled-system/css';
import Header from '../../../../../components/shared/header';
import { InfoRow } from '../../../../../components/shared/infoRow';
import SelectInfoRow from '../../../../../components/shared/selectInfoRow';
import UserNavbar from '../../../../../components/shared/userNavbar';
import { buttonStyle } from '../../../../../styles/button';
import { layoutStyle } from '../../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/guest/search/filter')({
	component: Page7,
});

function Page7() {
	const [ageConfirmed, setAgeConfirmed] = useState(false);
	const [termsAgreed, setTermsAgreed] = useState(false);
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			name: '',
			formattedAddress: '',
			gender: '',
			AvailablePeriod: '',
			petAllowed: 'false',
			barrierFree: 'false',
			safety: 'safe',
			dateOfBirth: '',
		},
	});

	return (
		<div
			className={css({
				bg: 'bg',
			})}
		>
			<Header title="検索" backToPage={true} />
			<div
				className={cx(
					layoutStyle(),
					css({
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						spaceY: '8',
					}),
				)}
			>
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
							rounded: 'md',
							width: 'full',
							mb: '8',
							backgroundColor: 'white',
						})}
					>
						<form.Field name="name">
							{(field) => (
								<InfoRow
									label="家族構成(人数)"
									value={field.state.value ?? ''}
									placeholder="例: 4"
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={() => {}}
								/>
							)}
						</form.Field>
						<form.Field name="formattedAddress">
							{(field) => (
								<InfoRow
									label="希望滞在場所"
									value={field.state.value ?? ''}
									placeholder="例: 石川県輪島市"
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={() => {}}
								/>
							)}
						</form.Field>
						<form.Field name="AvailablePeriod">
							{(field) => (
								<InfoRow
									label="滞在可能期間"
									value={field.state.value}
									placeholder="例: 4"
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={() => {}}
								/>
							)}
						</form.Field>
						<form.Field name="petAllowed">
							{(field) => (
								<SelectInfoRow
									selectList={{ true: '有', false: '無' }}
									label="ペットの有無"
									value={field.state.value as 'true' | 'false' | undefined}
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={() => {}}
								/>
							)}
						</form.Field>
						<form.Field name="barrierFree">
							{(field) => (
								<SelectInfoRow
									selectList={{ true: '有', false: '無' }}
									label="バリアフリー"
									value={field.state.value as 'true' | 'false' | undefined}
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={() => {}}
								/>
							)}
						</form.Field>
						<form.Field name="gender">
							{(field) => (
								<SelectInfoRow
									selectList={{ male: '男', female: '女', other: 'その他' }}
									label="ホストの性別"
									value={field.state.value as 'male' | 'female' | 'other' | undefined}
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={() => {}}
								/>
							)}
						</form.Field>
						<form.Field name="safety">
							{(field) => (
								<SelectInfoRow
									selectList={{
										safe: '安全',
										caution: '少し危険',
										danger: '危険',
									}}
									label="安全度"
									value={field.state.value as 'safe' | 'caution' | 'danger' | undefined}
									errors={field.state.meta.errors}
									onChange={(value) => field.handleChange(value)}
									onBlur={() => {}}
								/>
							)}
						</form.Field>
					</div>
				</form>
				<button
					type="button"
					onClick={() => navigate({ to: '/guest/search' })}
					className={buttonStyle({ type: 'normal' })}
				>
					検索する
				</button>
			</div>
			<UserNavbar />
		</div>
	);
}
