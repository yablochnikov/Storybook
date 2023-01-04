import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
	palette: {
		primary: {
			main: '#005db0',
		},
		secondary: {
			main: '#00867d',
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
