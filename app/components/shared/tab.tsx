import * as Tabs from '@radix-ui/react-tabs';
import type { ReactNode } from '@tanstack/react-router';
import { useState } from 'react';
import { css, cva } from '../../../styled-system/css';

type Props = {
	children: ReactNode;
};

export default function Tab({ children }: Props) {
	const tabList = ['すべて', '認証前', '承認済'];
	const [value, setValue] = useState('すべて');

	const tabStyle = cva({
		base: {
			rounded: 'md',
			py: '1',
			px: '3',
			color: 'white',
		},
		variants: {
			type: {
				isActive: { color: 'white', bg: '[#78716C]' },
				isNonActive: { color: 'black', bg: 'white' }, // Corrected here
			},
		},
	});

	return (
		<Tabs.Root value={value} onValueChange={setValue} defaultValue="認証前">
			<Tabs.List
				className={css({
					display: 'flex',
					gap: '[25px]',
					alignItems: 'center',
					rounded: 'lg',
					w: '[max-content]',
					mx: 'auto',
					py: '2',
					px: '3',
					bg: 'white',
				})}
			>
				{tabList.map((tab) => (
					<Tabs.Trigger
						key={tab}
						className={tabStyle({ type: tab === value ? 'isActive' : 'isNonActive' })}
						value={tab}
					>
						{tab}
					</Tabs.Trigger>
				))}
			</Tabs.List>
			{children}
		</Tabs.Root>
	);
}
