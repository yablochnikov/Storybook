import { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';

const ArgTypes = {
	items: {
		description: 'Array of elements which you want to display.',
	},
	itemsPerPage: {
		description: 'Number of items per page.',
		table: {
			type: { summary: 'number' },
			defaultValue: { summary: 5 },
		},
	},
	renderItem: {
		description: 'Function which returns the element to display. Example: `(item) => <div>{item}</div>',
	},
	color: {
		description: 'Color of the pagination buttons.',
		table: {
			type: { summary: 'string' },
			defaultValue: 'primary',
		},
		control: {
			type: 'select',
			options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
		},
	},
	size: {
		description: 'Size of the pagination buttons.',
		table: {
			type: { summary: 'string' },
			defaultValue: 'medium',
		},
		control: {
			type: 'select',
			options: ['small', 'medium', 'large'],
		},
	},
	shape: {
		description: 'Shape of the pagination buttons.',
		table: {
			type: { summary: 'string' },
			defaultValue: 'circular',
		},
	},
	variant: {
		description: 'Variant of the pagination buttons.',
		table: {
			type: { summary: 'string' },
			defaultValue: 'text',
		},
	},
	getItemAriaLabel: {
		description:
			'Accepts a function which returns a string value that provides a user-friendly name for the current page. This is important for screen reader users. For localization purposes, you can use the provided',
	},
	isSkeleton: {
		description: 'If true, the pagination will be displayed as skeleton.',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	sx: {
		description: 'Styles of the pagination root.',
	},
	itemsWrapperStyles: {
		description: 'Styles of the items wrapper.',
	},
};
/**
 * The Pagination Hook is a powerful tool that simplifies the implementation of pagination functionality in your React applications. It provides an intuitive API for managing page navigation, handling data fetching, and updating the UI based on user interactions. With just a few lines of code, you can easily integrate pagination into your components and enhance the user experience of your app.
 */
const meta: Meta<typeof Pagination> = {
	title: 'Hooks/Pagination',
	component: Pagination,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const PaginationTemplate = (args: any) => {
	const items = Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Item ${i}` }));
	return (
		<Pagination
			{...args}
			items={items}
			renderItem={(item: { id: number; name: string }) => <div key={item.id}>{item.name}</div>}
		/>
	);
};

export const DefaultPagination: Story = {
	args: {
		itemsPerPage: 5,
		shape: 'circular',
		size: 'medium',
		variant: 'text',
		isSkeleton: false,
	},
	render: args => <PaginationTemplate {...args} />,
};
