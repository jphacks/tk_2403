import { defineConfig } from '@pandacss/dev';

export default defineConfig({
	preflight: true,
	include: ['./app/**/*.{js,jsx,ts,tsx}'],
	exclude: [],
	theme: {
		extend: {
			semanticTokens: {
				colors: {
					primary: { value: '#ff9900' },
					text: {
						DEFAULT: { value: '#09090b' },
						muted: { value: '#78716c' },
					},
					border: { value: '#f0f0f0' },
					bg: { value: '#f2f2f2' },
					white: { value: '#ffffff' },
					safe: {
						DEFAULT: { value: '#00ba16' },
						bg: { value: '#BAFFC2' },
					},
					warn: {
						DEFAULT: { value: '#ff9900' },
						bg: { value: '#FFE9BA' },
					},
					alert: {
						DEFAULT: { value: '#ff3c00' },
						bg: { value: '#FFA9A9' },
					},
				},
			},
		},
	},
	strictTokens: true,
	outdir: 'styled-system',
});
