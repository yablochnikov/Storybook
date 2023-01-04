import React from 'react';
import { Box, CssBaseline, Paper, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './styles/lightTheme';

export const App = () => {
	return (
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			<Box height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
				<Paper elevation={3} sx={{ padding: '1rem', backgroundColor: 'secondary.light' }}>
					<Typography color="primary.dark" variant="h1">
						FIVE REACT MATERIAL
					</Typography>
				</Paper>
			</Box>
		</ThemeProvider>
	);
};
