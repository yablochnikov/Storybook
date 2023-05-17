import { Meta, StoryObj } from '@storybook/react';
import AuthenticationForm from './AuthenticationForm';

const ArgTypes = {
	formTitle: {
		description: 'The name of the form in the header',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Sign up form' },
		},
	},
	googleLabel: {
		description: 'The name of the Google button',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Sign up with Google' },
		},
	},
	centerTitle: {
		description: 'Central title in authentication form',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'or sign up with email' },
		},
	},
	labelLog: {
		description: 'The title text for login input',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Login' },
		},
	},
	placeholderLog: {
		description: 'Placeholder text for login input',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'your@email.com' },
		},
	},
	labelPass: {
		description: 'Title text for password input',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Password' },
		},
	},
	placeholderPass: {
		description: 'Placeholder text for password input',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Please, enter your password' },
		},
	},
	submitButtonTitle: {
		description: 'Title text for submit button',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Get Start' },
		},
	},
	footerTitle: {
		description: 'Title text for footer',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Already have an account?' },
		},
	},
	logInLabel: {
		description: 'Title text for log in link',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Log in' },
		},
	},
};

/**
 * SignUpForm component is a versatile and user-friendly form in React that allows users to register or create new accounts. It provides a seamless interface for capturing user information such as email, password, and additional optional fields.
 * With the SignUpForm component, you can easily incorporate a professional and secure registration process into your React applications, facilitating user onboarding and account creation.
 */
const meta: Meta<typeof AuthenticationForm> = {
	title: 'Components/AuthenticationForm',
	component: AuthenticationForm,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};
export default meta;

type Story = StoryObj<typeof AuthenticationForm>;

export const DefaultAuthenticationForm: Story = {
	args: {
		formTitle: 'Sign up form',
		googleLabel: 'Sign up with Google',
		centerTitle: 'or sign up with email',
		labelLog: 'Login',
		labelPass: 'Password',
		placeholderLog: 'your@email.com',
		placeholderPass: 'Please, enter your password',
		submitButtonTitle: 'Get Start',
		footerTitle: 'Already have an account?',
		logInLabel: 'Log in',
	},
	render: args => <AuthenticationForm {...args} />,
};
