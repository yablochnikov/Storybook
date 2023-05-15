import { useState } from 'react';
import { Button } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import { AlertModal, IAlertModalProps } from './AlertModal';

const ArgTypes = {
	title: {
		description: 'Title of the alert modal',
		defaultValue: 'Alert modal',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Alert modal' },
		},
	},
	msg: {
		description: 'Message of the alert modal',
		defaultValue: 'This is a message of alert modal',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'This is a message of alert modal' },
		},
	},
	secondaryMsg: {
		description: 'Secondary message of the alert modal',
		defaultValue: 'This is a secondary message of alert modal',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'This is a message of alert modal' },
		},
	},
	confirmTxt: {
		description: 'Text of the confirm button',
		defaultValue: 'Confirm',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Confirm' },
		},
	},
	cancelTxt: {
		description: 'Text of the cancel button',
		defaultValue: 'Cancel',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Cancel' },
		},
	},
	isDestructive: {
		description: 'If true, the alert modal will have a destructive style',
		defaultValue: false,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	showModal: {
		description: 'If true, the alert modal will be shown',
		defaultValue: false,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	onConfirm: {
		description: 'Callback function when the confirm button is clicked',
		defaultValue: () => console.log('confirm'),
	},
	onCancel: {
		description: 'Callback function when the cancel button is clicked',
		defaultValue: () => console.log('cancel'),
	},
};
/**
 * The Alert Modal component is a versatile and attention-grabbing feature that enhances user experience by displaying important notifications and messages. This component provides a visually appealing and unobtrusive way to communicate critical information, such as error alerts, success messages, warnings, or important updates.
 */
const meta: Meta<typeof AlertModal> = {
	title: 'Modals/AlertModal',
	component: AlertModal,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

const AlertModalTemplate = (args: IAlertModalProps) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<Button onClick={() => setOpen(true)}>Open alert</Button>
			<AlertModal {...args} showModal={open} onCancel={() => setOpen(false)} />
		</div>
	);
};

export const DefaultAlertModal: Story = {
	args: {
		title: 'Alert modal',
		msg: 'This is alert modal',
		secondaryMsg: 'This is secondary message',
		confirmTxt: 'Confirm',
		cancelTxt: 'Cancel',
		isDestructive: false,
		showModal: false,
		onConfirm: () => console.log('confirm'),
		onCancel: () => console.log('cancel'),
	},
	render: args => <AlertModalTemplate {...args} />,
};

/**
 * Alert modal with destructive style
 */
export const DestructiveAlertModal: Story = {
	args: {
		...DefaultAlertModal.args,
		title: 'Alert!',
		msg: 'Something went wrong...',
		isDestructive: true,
	},
	render: args => <AlertModalTemplate {...args} />,
};
