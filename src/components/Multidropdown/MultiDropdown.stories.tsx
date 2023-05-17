import { Meta, StoryObj } from '@storybook/react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MultiDropdown from './MultiDropdown';

const items = [
	{
		id: 1,
		value: 'Item 1',
	},
	{
		id: 2,
		value: 'Item 2',
		dropdownItems: [
			{
				id: 3,
				value: 'Sub-item 1',
				onClick: () => {},
				dropdownItems: [
					{
						id: 4,
						value: 'Sub-sub-item 1',
						onClick: () => {},
					},
					{
						id: 5,
						value: 'Sub-sub-item 2',
						onClick: () => {},
						dropdownItems: [
							{
								id: 6,
								value: 'Sub-sub-sub-item 1',
								onClick: () => {},
							},
							{
								id: 7,
								value: 'Sub-sub-sub-item 2',
								onClick: () => {},
							},
						],
					},
				],
			},
			{
				id: 8,
				value: 'Sub-item 2',
				onClick: () => {},
			},
		],
	},
	{
		id: 9,
		value: 'Item 3',
	},
];

const ArgTypes = {
	placeholder: {
		description: 'Placeholder of the dropdown',
		table: {
			defaultValue: { summary: 'Select' },
		},
	},
	items: {
		description: 'Items to display in the dropdown',
	},
	icon: {
		description: 'Icon to display in the dropdown',
	},
	isExpanded: {
		description: 'If true, the dropdown will be expanded',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	disabled: {
		description: 'If true, the dropdown will be disabled',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	dropdownStylesRoot: {
		description: 'Styles of the dropdown root',
	},
	reversed: {
		description: 'If true, the dropdown will be reversed',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
};

/**
 * MultiDropdown component is a versatile user interface element that allows users to select multiple options from a dropdown menu.
 */
const meta: Meta<typeof MultiDropdown> = {
	title: 'Components/MultiDropdown',
	component: MultiDropdown,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};
export default meta;

type Story = StoryObj<typeof MultiDropdown>;

export const DefaultMultiDropdown: Story = {
	args: {
		placeholder: 'Select',
		items,
		icon: <ExpandMoreIcon />,
		isExpanded: false,
		disabled: false,
		isSkeleton: false,
		reversed: false,
	},
	render: args => <MultiDropdown {...args} />,
};

/**
 * Reversed MultiDropdown component takes the concept of a traditional dropdown menu and flips it around, offering a unique and intuitive user experience. Instead of expanding downward, the Reversed MultiDropdown expands upward, presenting the options above the dropdown button.
 */
export const ReversedMultiDropdown: Story = {
	args: {
		placeholder: 'Select',
		items,
		icon: <ExpandMoreIcon />,
		reversed: true,
		dropdownStylesRoot: {
			width: '600px',
		},
	},
	parameters: {
		layout: 'centered',
	},
	render: args => <MultiDropdown {...args} />,
};
