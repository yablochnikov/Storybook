import { Meta, StoryObj } from '@storybook/react';
import { EmailRounded, LockRounded } from '@mui/icons-material';
import { TextInput } from '../TextInput/TextInput';
import GenericModal, { IModalProps } from './GenericModal';

const ArgTypes = {
	title: {
		description: 'Title of the modal',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Generic modal' },
		},
	},
	primaryBtnTxt: {
		description: 'Text of the primary button',
		defaultValue: 'Save',
	},
	primaryBtnClick: {
		description: 'Function to be executed when the primary button is clicked',
	},
	secondaryBtnTxt: {
		description: 'Text of the secondary button',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Reset' },
		},
	},
	secondaryBtnClick: {
		description: 'Function to be executed when the secondary button is clicked',
	},
	showTertiaryBtn: {
		description: 'If true, the tertiary button will be shown',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	tertiaryBtnTxt: {
		description: 'Text of the tertiary button',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Cancel' },
		},
	},
	tertiaryBtnClick: {
		description: 'Function to be executed when the tertiary button is clicked',
	},
	showButtonsSection: {
		description: 'If true, the buttons section will be shown',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	titleStyles: {
		description: 'Styles of the title',
	},
	contentStyles: {
		description: 'Styles of the content',
	},
};

/**
 * Modal dialogs are a common part of user interface design. Here’s one generic reusable modal copmonent that can be used in a variety of contexts throughout.
 */
const meta: Meta<typeof GenericModal> = {
	title: 'Modal/Generic modal',
	component: GenericModal,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};

export default meta;
type Story = StoryObj<typeof GenericModal>;

const SimpleTemplate = (args: IModalProps) => {
	return (
		<GenericModal {...args}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
			dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
			ea commodo consequat.
		</GenericModal>
	);
};

/**
 * A simple modal component to display some text.
 */
export const SimpleGenericModal: Story = {
	args: {
		title: 'Generic modal',
		primaryBtnTxt: 'Save',
		primaryBtnClick: () => console.log('Primary button clicked'),
		secondaryBtnTxt: 'Reset',
		secondaryBtnClick: () => console.log('Secondary button clicked'),
		showTertiaryBtn: false,
		tertiaryBtnTxt: 'Cancel',
		tertiaryBtnClick: () => console.log('Tertiary button clicked'),
		showButtonsSection: false,
	},
	render: args => <SimpleTemplate {...args} />,
};

const ComplexTemplate = (args: IModalProps) => {
	return (
		<GenericModal primaryBtnClick={() => console.log('cliked')} {...args}>
			<TextInput label="First name" />
			<TextInput label="Last name" />
			<TextInput
				label="Your email"
				sx={{ gridColumnStart: '1', gridColumnEnd: '3' }}
				startAdornment={<EmailRounded />}
			/>
			<TextInput
				label="Your password"
				sx={{ gridColumnStart: '1', gridColumnEnd: '3' }}
				startAdornment={<LockRounded />}
			/>
		</GenericModal>
	);
};

/**
 * Create custom modal by adding content via `children` property, set styles for modal content by `contentStyles` property. Also you can set your own styles for modal title and specify whether the button section and tertiary button should be displayed, or not. Use `titleStyles`, `showButtonsSection` and `showTertiaryBtn` props for this task.
 */
export const ComplexGenericModal: Story = {
	args: {
		title: 'Create your accaunt',
		showButtonsSection: true,
		titleStyles: {
			color: '#0F0F0F',
			fontSize: '24px',
			margin: '0',
			padding: '0',
		},
		contentStyles: {
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)',
			gridTemplateRows: 'repeat(3, 1fr)',
			gap: '15px',
			padding: '20px 0',
			borderTop: '1px solid #D9D9D9',
			borderBottom: '1px solid #D9D9D9',
			margin: '10px 0 15px',
		},
	},
	render: args => <ComplexTemplate {...args} />,
};
