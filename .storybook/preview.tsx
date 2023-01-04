import React, { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { DecoratorFn } from '@storybook/react';

import { CssBaseline } from '@mui/material';
import { darkTheme } from '../src/styles/darkTheme';
import { lightTheme } from '../src/styles/lightTheme';

export const WithTheme: DecoratorFn = (Story, context) => {
	// The theme global we just declared
	// eslint-disable-next-line react/destructuring-assignment
	const { theme: themeKey } = context.globals;

	// only recompute the theme if the themeKey changes
	const theme = useMemo(() => (themeKey === 'dark' ? darkTheme : lightTheme), [themeKey]);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Story />
		</ThemeProvider>
	);
};

export const globalTypes = {
	theme: {
		name: 'Theme',
		title: 'Theme',
		description: 'Theme for your components',
		defaultValue: 'light',
		toolbar: {
			icon: 'paintbrush',
			dynamicTitle: true,
			items: [
				{ value: 'light', left: '☀️', title: 'Light mode' },
				{ value: 'dark', left: '🌙', title: 'Dark mode' },
			],
		},
	},
};

// export all decorators that should be globally applied in an array
export const decorators = [WithTheme];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
