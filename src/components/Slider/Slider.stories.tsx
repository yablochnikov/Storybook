import { Meta, StoryObj } from '@storybook/react';
import Slider from './Slider';

const ArgTypes = {
	size: {
		description: 'The size of the slider.',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'medium' },
		},
	},
};

const meta: Meta<typeof Slider> = {
	title: 'Components/Slider',
	component: Slider,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const DefaultSlider: Story = {
	args: {},
	render: args => <Slider {...args} />,
};
