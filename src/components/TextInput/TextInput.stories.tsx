import { Meta, StoryObj } from '@storybook/react';
import { EmailOutlined, SearchOutlined, Person2Outlined, SendOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import TextInput from './TextInput';

const ArgTypes = {
	variant: {
		description: 'The variant of the text input.',
		table: {
			type: { summary: 'select' },
			defaultValue: { summary: 'outlined' },
		},
	},
	size: {
		description: 'The size of the text input.',
		table: {
			type: { summary: 'select' },
			defaultValue: { summary: 'small' },
		},
	},
	disabled: {
		description: 'If true, the text input will be disabled.',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	fullWidth: {
		description: 'If true, the text input will take up the full width of its container.',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	color: {
		description: 'The color of the text input.',
		table: {
			type: { summary: 'select' },
			defaultValue: { summary: 'primary' },
		},
	},
	type: {
		description: 'The type of the text input.',
		table: {
			type: { summary: 'select' },
			defaultValue: { summary: 'text' },
		},
	},
	margin: {
		description: 'The margin of the text input.',
		table: {
			type: { summary: 'select' },
			defaultValue: { summary: 'none' },
		},
	},
	label: {
		description: 'The label of the text input.',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Input' },
		},
	},
	placeholder: {
		description: 'The placeholder of the text input.',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Placeholder' },
		},
	},
	helperText: {
		description: 'The helper text of the text input.',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Helper text' },
		},
	},
	error: {
		description: 'If true, the text input will be displayed in an error state.',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	autoFocus: {
		description: 'If true, the text input will be focused on mount.',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	required: {
		description: 'If true, the text input will be required.',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	multiline: {
		description: 'If true, the text input will be multiline.',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	rows: {
		description: 'The number of rows to display when multiline option is set to true.',
		table: {
			type: { summary: 'number' },
			defaultValue: { summary: 1 },
		},
	},
	minRows: {
		description: 'The minimum number of rows to display when multiline option is set to true.',
		table: {
			type: { summary: 'number' },
			defaultValue: { summary: 1 },
		},
	},
	maxRows: {
		description: 'The maximum number of rows to display when multiline option is set to true.',
		table: {
			type: { summary: 'number' },
			defaultValue: { summary: 1 },
		},
	},
	id: {
		description: 'The id of the text input.',
	},
	name: {
		description: 'The name of the text input.',
	},
	value: {
		description: 'The value of the text input.',
	},
	onChange: {
		description: 'The function to be executed when the text input value changes.',
	},
	startAdornment: {
		description: 'The start adornment of the text input.',
	},
	endAdornment: {
		description: 'The end adornment of the text input.',
	},
	sx: {
		description: 'The sx prop of the text input.',
	},
	inputRef: {
		description: 'The ref prop of the text input.',
	},
};

const meta: Meta<typeof TextInput> = {
	title: 'Components/TextInput',
	component: TextInput,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const DefaultTextInput: Story = {
	args: {
		variant: 'outlined',
		size: 'small',
		disabled: false,
		fullWidth: false,
		color: 'primary',
		type: 'text',
		margin: 'none',
		label: 'Input',
		placeholder: 'Placeholder',
		helperText: 'Helper text',
		error: false,
		autoFocus: false,
		required: false,
		multiline: false,
		rows: 1,
		minRows: 1,
		maxRows: 1,
	},
	render: args => <TextInput {...args} />,
};

export const BasicTextInput: Story = {
	args: {
		...DefaultTextInput.args,
		variant: 'standard',
		size: 'small',
		color: 'success',
		margin: 'dense',
		label: 'Label',
		placeholder: 'Placeholder',
		helperText: 'Helper text',
	},
	render: args => <TextInput {...args} />,
};

export const FormTextInput: Story = {
	args: {
		...DefaultTextInput.args,
		label: 'Password',
		type: 'password',
		required: true,
	},
	render: args => (
		<>
			<TextInput {...args} label="Password" sx={{ marginRight: '10px' }} />
			<TextInput {...args} type="email" label="Email" />
		</>
	),
};

export const MultilineTextInput: Story = {
	args: {
		variant: 'filled',
		placeholder: 'Message',
		fullWidth: true,
		multiline: true,
		rows: 3,
	},
	render: args => <TextInput {...args} />,
};

export const AdornmentsTextInput: Story = {
	args: {
		variant: 'standard',
	},
	render: args => (
		<>
			<TextInput {...args} startAdornment={<EmailOutlined />} sx={{ marginRight: '10px' }} />
			<TextInput {...args} endAdornment={<SearchOutlined />} />
		</>
	),
};
