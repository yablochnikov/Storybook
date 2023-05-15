import { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';

const ArgTypes = {
	displayWeekends: {
		description: 'If true, the calendar will display weekends',
		defaultValue: true,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: true },
		},
	},
	selectable: {
		description: 'If true, the calendar will be selectable',
		defaultValue: true,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: true },
		},
	},
	editable: {
		description: 'If true, the calendar will be editable',
		defaultValue: true,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: true },
		},
	},
	initialDate: {
		description: 'The initial date of the calendar',
	},
	isSkeleton: {
		description: 'If true, the calendar will be shown as a skeleton',
		defaultValue: false,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
};

/**
 * We are using  [FullCalendar](https://fullcalendar.io/) library, you can find more information about the props in the documentation.
 */
const meta: Meta<typeof Calendar> = {
	title: 'Components/Calendar',
	component: Calendar,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const DefaultCalendar: Story = {
	args: {
		displayWeekends: true,
		selectable: true,
		editable: true,
		isSkeleton: false,
	},
	render: args => <Calendar {...args} />,
};
