import { cva } from '../../styled-system/css';

export const containerStyle = cva({
	base: {
		w: '[600px]',
		maxW: 'full',
		minH: '[dvh]',
		mx: 'auto',
		py: '8',
		px: '4',
		pb: '24',
	},
});
