import { createTheme, Theme as MuiTheme } from '@mui/material/styles';

declare module '@emotion/react' {
	export interface Theme extends MuiTheme {}
}

export const lightTheme: MuiTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#1877f2',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#42b72a',
			contrastText: '#ffffff',
		},
		error: {
			main: '#f02849',
			light: '#FEE2E2',
			contrastText: '#ffffff',
		},
		warning: {
			main: '#faa61a',
			light: '#FDF3C7',
			contrastText: '#ffffff',
		},
		info: {
			main: '#55acee',
			contrastText: '#ffffff',
		},
		success: {
			main: '#42b72a',
			contrastText: '#ffffff',
		},
		text: {
			primary: '#1c1e21',
			secondary: '#65676b',
			disabled: '#b0b3b8',
		},
		background: {
			default: '#f0f2f5',
			paper: '#ffffff',
		},
		action: {
			active: '#1c1e21',
			hover: '#e4e6eb',
			selected: '#e7f3ff',
			disabled: '#f0f2f5',
		},
		divider: '#e4e6eb',
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'Segoe UI',
			'Roboto',
			'Oxygen-Sans',
			'Ubuntu',
			'Cantarell',
			'Helvetica Neue',
			'sans-serif',
		].join(','),
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		h1: {
			fontWeight: 600,
			fontSize: '2.5rem',
			lineHeight: 1.2,
		},
		h2: {
			fontWeight: 600,
			fontSize: '2rem',
			lineHeight: 1.2,
		},
		h3: {
			fontWeight: 600,
			fontSize: '1.75rem',
			lineHeight: 1.2,
		},
		h4: {
			fontWeight: 600,
			fontSize: '1.5rem',
			lineHeight: 1.2,
		},
		h5: {
			fontWeight: 600,
			fontSize: '1.25rem',
			lineHeight: 1.2,
		},
		h6: {
			fontWeight: 600,
			fontSize: '1rem',
			lineHeight: 1.2,
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1400,
			xl: 1536,
		},
	},
	spacing: [0, 4, 8, 16, 32, 64],
});
