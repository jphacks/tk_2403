import * as Select from '@radix-ui/react-select';
import type { ValidationError } from '@tanstack/react-form';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { css } from '../../../styled-system/css';

type Props<T extends Record<string, string>> = {
	label: string;
	selectList: T;
	value: Extract<keyof T, string> | undefined;
	errors: ValidationError[];
	onChange: (value: Extract<keyof T, string>) => void;
	onBlur: () => void;
};

export default function SelectInfoRow<T extends Record<string, string>>({
	label,
	selectList,
	value,
	errors,
	onChange,
	onBlur,
}: Props<T>) {
	return (
		<div
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
				<Select.Root
					value={value}
					onValueChange={(value) => onChange(value as Extract<keyof T, string>)}
					onOpenChange={(open) => {
						if (!open) {
							onBlur();
						}
					}}
				>
					<Select.Trigger
						className={css({
							display: 'flex',
							flex: '1',
							gap: '4',
							justifyContent: 'space-between',
							color: 'primary',
							fontSize: 'sm',
							bg: 'white',
							_placeholder: {
								color: 'primary/50',
							},
							_focus: {
								outline: 'none',
							},
						})}
						aria-label="Food"
					>
						<Select.Value placeholder="選択" />
						<Select.Icon>
							<IoIosArrowDown className={css({ color: 'primary' })} />
						</Select.Icon>
					</Select.Trigger>
					<Select.Portal>
						<Select.Content
							className={css({
								borderColor: 'border',
								rounded: 'md',
								borderWidth: '1px',
								bg: 'white',
							})}
						>
							<Select.Viewport>
								<Select.Group>
									{Object.entries(selectList).map(([value, label]) => (
										<Select.Item
											key={value}
											className={css({
												display: 'flex',
												gap: '4',
												justifyContent: 'space-between',
												alignItems: 'center',
												w: 'full',
												py: '1',
												px: '3',
												color: 'primary',
												_focus: {
													outline: 'none',
												},
											})}
											value={value}
										>
											<Select.ItemText>{label}</Select.ItemText>
											<Select.ItemIndicator>
												<FaCheck />
											</Select.ItemIndicator>
										</Select.Item>
									))}
								</Select.Group>
							</Select.Viewport>
						</Select.Content>
					</Select.Portal>
				</Select.Root>
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
		</div>
	);
}
