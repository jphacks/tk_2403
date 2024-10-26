import type { ValidationError } from '@tanstack/react-form';
import { css } from '../../../styled-system/css';

type Props = {
	label: string;
	value: string;
	placeholder?: string;
	errors: ValidationError[];
	onChange: (value: string) => void;
};

export const InfoRow = ({ label, value, placeholder, errors, onChange }: Props) => {
	return (
		<label
			className={css({
				display: 'flex',
				gap: '2',
				flexDir: 'column',
				borderBottomWidth: '1px',
				borderColor: 'border',
				padding: '3',
				fontSize: 'sm',
			})}
		>
			<div
				className={css({
					display: 'flex',
				})}
			>
				<div className={css({ flex: '1', color: 'text.muted' })}>{label}</div>
				<input
					className={css({
						flex: '1',
						color: 'primary',
						_placeholder: {
							color: 'primary/50',
						},
						_focus: {
							outline: 'none',
						},
					})}
					value={value}
					placeholder={placeholder}
					onChange={(e) => onChange(e.currentTarget.value)}
				/>
			</div>
			{errors.length > 0 && (
				<div>
					{errors.map((error, i) => (
						<p
							// biome-ignore lint/suspicious/noArrayIndexKey:
							key={i}
							className={css({
								color: 'alert',
								fontSize: 'xs',
							})}
						>
							{error}
						</p>
					))}
				</div>
			)}
		</label>
	);
};
