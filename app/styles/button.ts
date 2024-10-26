import { cva } from '../../styled-system/css';

export const buttonStyle = cva({
	base: {
		rounded: 'md',
		w: 'full',
		py: '2',
		fontWeight: 'bold',
	},
	variants: {
		type: {
			normal: { color: 'white', bg: 'primary' },
			delete: { borderColor: 'alert', borderWidth: '2px', color: 'alert', bg: 'white' },
			permit: { color: 'black', bg: 'white' },
			reject: { color: 'alert', bg: '[#ffdbdb]' },
		},
	},
});
