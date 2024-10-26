import type { ValidationError } from '@tanstack/react-form';
import { css } from '../../styled-system/css';

type Props = {
	placeholder: string;
	value: string;
	errors: ValidationError[];
	onChange: (value: string) => void;
	onBlur: () => void;
};

export default function Textarea({ placeholder, value, errors, onChange, onBlur }: Props) {
	return (
		<label className={css({ spaceY: '2' })}>
			<textarea
				className={css({
					borderColor: 'border',
					borderRadius: 'md',
					borderWidth: '2px',
					w: 'full',
					height: '40',
					p: '3',
					fontSize: 'sm',
					_focus: {
						outline: 'none',
					},
				})}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.currentTarget.value)}
				onBlur={onBlur}
			/>
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
}
