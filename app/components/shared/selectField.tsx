import * as Select from '@radix-ui/react-select';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { css, cx } from '../../../styled-system/css';

type Props = {
	selectList: string[];
};

const SelectFiled = ({ selectList }: Props) => {
	const [nowSelectItem, setNowSelectItem] = useState(selectList[0]);

	return (
		<Select.Root defaultValue={nowSelectItem} onValueChange={setNowSelectItem}>
			<Select.Trigger
				className={css({
					display: 'flex',
					gap: '4',
					justifyContent: 'space-between',
					alignItems: 'center',
					w: 'full',
					py: '1',
					px: '3',
					fontSize: 'sm',
					bg: 'white',
					_focus: {
						outline: 'none',
					},
				})}
				aria-label="Food"
			>
				<Select.Value placeholder="選択" />
				<Select.Icon className="SelectIcon">
					<IoIosArrowDown />
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					className={css({
						bg: 'white',
					})}
				>
					<Select.ScrollUpButton className="SelectScrollButton">sa</Select.ScrollUpButton>
					<Select.Viewport className="SelectViewport">
						<Select.Group>
							{selectList.map((item) => (
								<SelectItem
									key={item}
									value={item}
									className={css({
										fontSize: 'sm',
									})}
								>
									{item}
								</SelectItem>
							))}
						</Select.Group>
					</Select.Viewport>
					<Select.ScrollDownButton className="SelectScrollButton">sa</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};

const SelectItem = React.forwardRef<HTMLDivElement, Select.SelectItemProps>(
	({ children, className, value, ...props }, forwardedRef) => {
		return (
			<Select.Item
				className={cx(
					css({
						display: 'flex',
						gap: '4',
						justifyContent: 'space-between',
						alignItems: 'center',
						w: 'full',
						py: '1',
						px: '3',
						_focus: {
							outline: 'none',
						},
					}),
					className,
				)}
				value={value} // `value` プロパティを渡す
				{...props}
				ref={forwardedRef}
			>
				<Select.ItemText>{children}</Select.ItemText>
				<Select.ItemIndicator>
					<FaCheck />
				</Select.ItemIndicator>
			</Select.Item>
		);
	},
);

export default SelectFiled;
