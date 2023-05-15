import { Meta, StoryObj } from '@storybook/react';
import { Delete, Add, Search } from '@mui/icons-material';
import Button, { IButtonProps } from './Button';

const ArgTypes = {
	title: {
		description: 'The text to be displayed inside the button.',
		defaultValue: 'Button',
	},
	type: {
		description: 'The type of button.',
		defaultValue: 'button',
		table: {
			type: { summary: 'select' },
			defaultValue: { summary: 'button' },
		},
	},
	size: {
		description: 'The size of the button.',
		defaultValue: 'medium',
	},
	btnType: {
		description: 'The color of the button.',
		defaultValue: 'primary',
	},
	variant: {
		description: 'The variant of the button.',
		defaultValue: 'contained',
	},
	disabled: {
		description: 'If true, the button will be disabled.',
		defaultValue: false,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	startIcon: {
		description: 'The icon to display at the start of the button.',
		options: ['delete', 'add', 'search'],
		control: {
			type: 'select',
		},
		mapping: {
			delete: <Delete />,
			add: <Add />,
			search: <Search />,
		},
	},
	endIcon: {
		description: 'The icon to display at the end of the button.',
		options: ['delete', 'add', 'search'],
		control: {
			type: 'select',
		},
		mapping: {
			delete: <Delete />,
			add: <Add />,
			search: <Search />,
		},
	},
	icon: {
		description: 'The icon to display inside the button.',
	},
	clickAction: {
		description: 'Function to be executed when the button is clicked.',
	},
	styles: {
		description: 'Styles applied to the button.',
	},
};

/**
 * Button is a graphical control element that provides the user a simple way to trigger an event.
 */
const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
	args: {
		title: 'Primary',
		btnType: 'primary',
		variant: 'contained',
		type: 'button',
		size: 'medium',
		disabled: false,
	},
	render: args => <Button {...args} />,
};

const TypesTemplate = (args: IButtonProps) => {
	return (
		<>
			<Button {...args} styles={{ marginRight: '10px' }} />
			<Button {...args} variant="outlined" styles={{ marginRight: '10px' }} />
			<Button {...args} variant="text" />
		</>
	);
};

/**
 * By changing the btnType prop you can use different styles of the button.
 */
export const Types: Story = {
	render: args => <TypesTemplate {...args} />,
};

const SizesTemplate = (args: IButtonProps) => {
	return (
		<>
			<Button {...args} size="small" styles={{ marginRight: '10px' }} />
			<Button {...args} size="medium" styles={{ marginRight: '10px' }} />
			<Button {...args} size="large" />
		</>
	);
};

/**
 * By changing the size prop you can use different sizes of the button.
 */
export const Sizes: Story = {
	render: args => <SizesTemplate {...args} />,
};

const StartIconTemplate = (args: IButtonProps) => {
	return (
		<>
			<Button {...args} startIcon={<Delete />} styles={{ marginRight: '10px' }} />
			<Button {...args} startIcon={<Add />} styles={{ marginRight: '10px' }} />
			<Button {...args} startIcon={<Search />} />
		</>
	);
};

/**
 * By changing the `startIcon` prop you can use different icons of the button.
 */
export const StartIcons: Story = {
	render: args => <StartIconTemplate {...args} />,
};

const EndIconTemplate = (args: IButtonProps) => {
	return (
		<>
			<Button {...args} endIcon={<Delete />} styles={{ marginRight: '10px' }} />
			<Button {...args} endIcon={<Add />} styles={{ marginRight: '10px' }} />
			<Button {...args} endIcon={<Search />} />
		</>
	);
};

/**
 * By changing the `endIcon` prop you can use different icons of the button.
 */
export const EndIcons: Story = {
	render: args => <EndIconTemplate {...args} />,
};

const VariantsTemplate = (args: IButtonProps) => {
	return (
		<>
			<Button {...args} variant="text" styles={{ marginRight: '10px' }} />
			<Button {...args} variant="outlined" styles={{ marginRight: '10px' }} />
			<Button {...args} variant="contained" />
		</>
	);
};

/**
 * Choose variant of the Button by changing the `variant` prop.<br />
 **Text** buttons are typically used for _less-pronounced_ actions.<br />
 **Outlined** buttons are _medium-emphasis_.<br />
 **Contained** buttons are _high-emphasis_.
 */
export const Variants: Story = {
	render: args => <VariantsTemplate {...args} />,
};

const BtnTypesTemplate = (args: IButtonProps) => {
	return (
		<>
			<Button {...args} btnType="primary" styles={{ marginRight: '10px' }} />
			<Button {...args} btnType="secondary" styles={{ marginRight: '10px' }} />
			<Button {...args} btnType="error" styles={{ marginRight: '10px' }} />
			<Button {...args} btnType="success" styles={{ marginRight: '10px' }} />
			<Button {...args} btnType="info" />
		</>
	);
};

/**
 * By changing the `btnType` prop you can use different styles of the button.
 */
export const BtnTypes: Story = {
	render: args => <BtnTypesTemplate {...args} />,
};
