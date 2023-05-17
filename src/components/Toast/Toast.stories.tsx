import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Box, Button } from '@mui/material';
import Toast, { IToastProps } from './Toast';

const ArgTypes = {
	id: {
		description: 'Id of the toast',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'toast' },
		},
	},
	title: {
		description: 'Title of the toast',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Toast' },
		},
	},
	timeoutMs: {
		description: 'Timeout of the toast',
		table: {
			type: { summary: 'number' },
			defaultValue: { summary: 5000 },
		},
	},
	type: {
		description: 'Type of the toast',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'info' },
		},
	},
	message: {
		description: 'Message of the toast',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'This is a toast' },
		},
	},
	action: {
		description: 'Action of the toast',
		table: {
			type: { summary: 'node' },
		},
	},
	showToast: {
		description: 'If true, the toast will be shown',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	variant: {
		description: 'Variant of the toast',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'filled' },
		},
	},
	stylesRoot: {
		description: 'Styles of the toast root',
	},
	onClose: {
		description: 'Function to be executed when the toast is closed',
	},
};

/**
 * Toast component is a lightweight and customizable notification system that provides a sleek and non-intrusive way to display temporary messages or alerts to users.
 */
const meta: Meta<typeof Toast> = {
	title: 'Components/Toast',
	component: Toast,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};

export default meta;
type Story = StoryObj<typeof Toast>;

const DefaultTemplate = (args: IToastProps) => {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Button variant="outlined" onClick={handleClick}>
				Open snackbar
			</Button>
			<Toast
				{...args}
				showToast={open}
				onClose={handleClose}
				action={
					<Button
						onClick={() => {
							console.log('clicked');
						}}
					>
						Some action
					</Button>
				}
			/>
		</div>
	);
};

export const DefaultToast: Story = {
	args: {
		id: 'toast',
		title: 'Toast',
		timeoutMs: 5000,
		type: 'info',
		message: 'This is a toast',
		variant: 'outlined',
	},
	render: args => <DefaultTemplate {...args} />,
};

const TypesTemplate = ({ type, ...args }: IToastProps) => {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Button variant="outlined" onClick={handleClick}>
				Open {type} snackbar
			</Button>
			<Toast
				{...args}
				type={type}
				showToast={open}
				onClose={handleClose}
				action={
					<Button
						onClick={() => {
							console.log('clicked');
						}}
					>
						Some action
					</Button>
				}
			/>
		</div>
	);
};

/**
 * By changing `type` prop you can use different styles of the toast.
 */
export const DifferentTypes: Story = {
	args: { ...DefaultToast.args, type: 'info' },
	render: args => (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<TypesTemplate {...args} type="info" />
			<TypesTemplate {...args} type="success" />
			<TypesTemplate {...args} type="warning" />
			<TypesTemplate {...args} type="error" />
		</Box>
	),
};

const VariantsTemplate = ({ variant, ...args }: IToastProps) => {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Button variant="outlined" onClick={handleClick}>
				Open {variant} snackbar
			</Button>
			<Toast
				{...args}
				showToast={open}
				variant={variant}
				onClose={handleClose}
				action={
					<Button
						onClick={() => {
							console.log('clicked');
						}}
					>
						Some action
					</Button>
				}
			/>
		</div>
	);
};

/**
 * By changing `variant` prop you can use different styles of the toast.
 */
export const DifferentVariants: Story = {
	args: { ...DefaultToast.args },
	render: args => (
		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<VariantsTemplate {...args} variant="standard" />
			<VariantsTemplate {...args} variant="filled" />
			<VariantsTemplate {...args} variant="outlined" />
		</Box>
	),
};
