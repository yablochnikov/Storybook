import { Meta, StoryObj } from '@storybook/react';
import VirtualizedList from './Virtualizer';
import { VirtualizedListProps } from '../../core/models/virtualizer';

const ArgTypes = {
	items: {
		description: 'Array of elements which you want to display',
	},
	type: {
		table: {
			type: { summary: 'select' },
			defaultValue: { summary: 'vertical' },
		},
	},
	renderItem: {
		description: 'Function that renders each item. Example: `(item) => <div>{item}</div>`',
	},
	itemSize: {
		description:
			'Size of each item in pixels. If you are selecting `vertical` type then it will be height of each item and if you are selecting `horizontal` type then it will be width of each item',
		table: {
			type: { summary: 'number' },
			defaultValue: { summary: 50 },
		},
	},
	overScan: {
		description:
			'Number of items to render before and after the visible area. This is to prevent the user from seeing empty space while scrolling.',
		table: {
			type: { summary: 'number' },
			defaultValue: { summary: 5 },
		},
	},
};

/**
 * # Vitrualizer: Rendering Large Lists Efficiently
Virtualizer is an efficient technique to render large lists of items in web applications.
It renders only the items that are visible in the viewport and reuses the items that are scrolled out of the viewport.
This approach significantly improves the performance of your application, even when dealing with a list of 10000 items or more.

# How Virtualizer Works
Virtualizer is designed to reduce the number of items that are rendered at any given time.
Instead of rendering all the items at once, Virtualizer renders only the items that are visible in the viewport.
The viewport is the visible area of the web page, and Virtualizer checks whether an item is within the viewport before rendering it.

When an item is scrolled out of the viewport, Virtualizer removes it from the DOM and reuses it when a new item comes into view.
This means that Virtualizer only renders the items that are needed, reducing the load on the browser and improving the performance of your application.
 */
const meta: Meta<typeof VirtualizedList> = {
	title: 'Hooks/Virtualizer',
	component: VirtualizedList,
	argTypes: ArgTypes,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VirtualizedList>;

const Template = (args: VirtualizedListProps<any>) => {
	const items = [...Array(10000)].map((_, i) => `Item ${i}`);
	return <VirtualizedList {...args} items={items} renderItem={item => <div>{item}</div>} />;
};

export const DefaultVirtualizer: Story = {
	args: {
		type: 'vertical',
		itemSize: 50,
		overScan: 20,
	},
	render: args => <Template {...args} />,
};

export const HorizontalVirtualizer: Story = {
	args: {
		type: 'horizontal',
		itemSize: 50,
		overScan: 20,
	},
	render: args => <Template {...args} />,
};
