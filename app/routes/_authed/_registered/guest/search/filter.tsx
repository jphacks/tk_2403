import { useForm } from '@tanstack/react-form';
import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useEffect } from 'react';
import { css } from '../../../../../../styled-system/css';
import Header from '../../../../../components/shared/header';
import { InfoRow } from '../../../../../components/shared/infoRow';
import SelectInfoRow from '../../../../../components/shared/selectInfoRow';
import UserNavbar from '../../../../../components/shared/userNavbar';
import { getEvacuationPlacesSchema } from '../../../../../schemas/evacuationPlace';
import { buttonStyle } from '../../../../../styles/button';
import { layoutStyle } from '../../../../../styles/layout';

export const Route = createFileRoute('/_authed/_registered/guest/search/filter')({
	component: SearchFilter,
});

function SearchFilter() {
	const location = useLocation();
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			headcount: undefined as string | undefined,
			areaAddress: undefined as string | undefined,
			desiredPeriodStart: undefined as string | undefined,
			desiredPeriodEnd: undefined as string | undefined,
			hasPet: false,
			needBarrierFree: false,
			hostGender: undefined as 'male' | 'female' | 'other' | undefined,
			safety: undefined as 'safe' | 'caution' | 'danger' | undefined,
		},
		validatorAdapter: zodValidator(),
		onSubmit: async ({ value }) => {
			await navigate({ to: '/guest/search', search: value });
		},
	});

	useEffect(() => {
		for (const [key, value] of Object.entries(location.search)) {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			form.setFieldValue(key as any, value);
		}
	}, [location.search, form.setFieldValue]);

	return (
		<div
			className={css({
				bg: 'bg',
			})}
		>
			<Header title="検索" backToPage={true} />
			<form
				className={css(layoutStyle.raw(), {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					spaceY: '8',
				})}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (form.state.canSubmit && !form.state.isSubmitting) {
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
					<form.Field name="headcount" validators={{ onChange: getEvacuationPlacesSchema.shape.headcount }}>
						{(field) => (
							<InfoRow
								label="待避する人数"
								value={field.state.value ?? ''}
								placeholder="例: 4"
								errors={field.state.meta.errors}
								onChange={(value) => field.handleChange(value.length === 0 ? undefined : value)}
								onBlur={() => {}}
							/>
						)}
					</form.Field>
					<form.Field name="areaAddress" validators={{ onChange: getEvacuationPlacesSchema.shape.areaAddress }}>
						{(field) => (
							<InfoRow
								label="希望滞在エリア"
								value={field.state.value ?? ''}
								placeholder="例: 石川県輪島市"
								errors={field.state.meta.errors}
								onChange={(value) => field.handleChange(value.length === 0 ? undefined : value)}
								onBlur={() => {}}
							/>
						)}
					</form.Field>
					<form.Field
						name="desiredPeriodStart"
						validators={{ onChange: getEvacuationPlacesSchema.shape.desiredPeriodStart }}
					>
						{(field) => (
							<InfoRow
								label="滞在希望期間（開始）"
								value={field.state.value ?? ''}
								placeholder="例: 2000-01"
								errors={field.state.meta.errors}
								onChange={(value) => field.handleChange(value.length === 0 ? undefined : value)}
								onBlur={() => {}}
							/>
						)}
					</form.Field>
					<form.Field
						name="desiredPeriodEnd"
						validators={{ onChange: getEvacuationPlacesSchema.shape.desiredPeriodEnd }}
					>
						{(field) => (
							<InfoRow
								label="滞在希望期間（終了）"
								value={field.state.value ?? ''}
								placeholder="例: 2000-01"
								errors={field.state.meta.errors}
								onChange={(value) => field.handleChange(value.length === 0 ? undefined : value)}
								onBlur={() => {}}
							/>
						)}
					</form.Field>
					<form.Field name="hasPet" validators={{ onChange: getEvacuationPlacesSchema.shape.hasPet }}>
						{(field) => (
							<SelectInfoRow
								selectList={{ true: '有', false: '無' }}
								label="ペットの有無"
								value={field.state.value ? 'true' : 'false'}
								errors={field.state.meta.errors}
								onChange={(value) => field.handleChange(value === 'true')}
								onBlur={() => {}}
							/>
						)}
					</form.Field>
					<form.Field name="needBarrierFree" validators={{ onChange: getEvacuationPlacesSchema.shape.needBarrierFree }}>
						{(field) => (
							<SelectInfoRow
								selectList={{ true: '有', false: '無' }}
								label="バリアフリー"
								value={field.state.value ? 'true' : 'false'}
								errors={field.state.meta.errors}
								onChange={(value) => field.handleChange(value === 'true')}
								onBlur={() => {}}
							/>
						)}
					</form.Field>
					<form.Field name="hostGender" validators={{ onChange: getEvacuationPlacesSchema.shape.hostGender }}>
						{(field) => (
							<SelectInfoRow
								selectList={{ no: '指定しない', male: '男', female: '女', other: 'その他' }}
								label="ホストの性別"
								value={field.state.value ?? 'no'}
								errors={field.state.meta.errors}
								onChange={(value) => field.handleChange(value === 'no' ? undefined : value)}
								onBlur={() => {}}
							/>
						)}
					</form.Field>
					<form.Field name="safety" validators={{ onChange: getEvacuationPlacesSchema.shape.safety }}>
						{(field) => (
							<SelectInfoRow
								selectList={{
									no: '指定しない',
									safe: '安全',
									caution: '少し危険',
									danger: '危険',
								}}
								label="安全度"
								value={field.state.value ?? 'no'}
								errors={field.state.meta.errors}
								onChange={(value) => field.handleChange(value === 'no' ? undefined : value)}
								onBlur={() => {}}
							/>
						)}
					</form.Field>
				</div>

				<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
					{([canSubmit, isSubmitting]) => (
						<button type="submit" className={buttonStyle({ type: 'normal' })} disabled={!canSubmit || isSubmitting}>
							検索する
						</button>
					)}
				</form.Subscribe>
			</form>
			<UserNavbar />
		</div>
	);
}
