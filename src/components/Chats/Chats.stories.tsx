import { Meta, StoryObj } from '@storybook/react';
import Chats from './Chats';
import { ThemeType } from './types';

const ArgsChatTypes = {
	themeType: {
		description: 'Change theme chats',
		defaultValue: ThemeType.Default,
	},
};

const meta: Meta<typeof Chats> = {
	title: 'Components/Chats',
	component: Chats,
	tags: ['autodocs'],
	argTypes: ArgsChatTypes,
};
export default meta;

type Story = StoryObj<typeof Chats>;

export const Chat: Story = {
	args: {
		themeType: ThemeType.Default,
	},
	render: args => <Chats {...args} />,
};

export const DarkTheme: Story = {
	args: {
		themeType: ThemeType.Night,
	},
	render: args => <Chats {...args} />,
};

export const GreenTheme: Story = {
	args: {
		themeType: ThemeType.Green,
	},
	render: args => <Chats {...args} />,
};
