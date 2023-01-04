import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
	palette: {
		primary: {
			light: '#63b8ff',
			main: '#0989e3',
			dark: '#005db0',
			contrastText: '#000',
		},
		secondary: {
			main: '#4db6ac',
			light: '#82e9de',
			dark: '#00867d',
			contrastText: '#000',
		},
	},
	typography: {
		fontFamily: 'Source Sans Pro, sans-serif',
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
});
