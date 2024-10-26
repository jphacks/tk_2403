import { cva } from '../../styled-system/css';

export const containerStyle = cva({
	base: {
		w: '[600px]',
		maxW: 'full',
		minH: '[dvh]',
		mx: 'auto',
		py: '8',
		px: '[15px]',
		pb: '24',
	},
});

export const profileContainerStyle = cva({
	base: {
		display: 'flex',
		flex: '1',
		flexDirection: 'column',
		w: '[600px]',
		maxW: 'full',
		minHeight: '[calc(100vh - 80px - 50px)]',
		mx: 'auto',
	},
});

export const layoutStyle = cva({
	base: {
		w: '[600px]',
		maxW: 'full',
		minHeight: '[calc(100vh - 80px - 50px)]',
		mx: 'auto',
		py: '4',
		px: '[15px]',
	},
});
