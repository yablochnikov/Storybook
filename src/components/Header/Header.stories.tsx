import { Meta, StoryObj } from '@storybook/react';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import Header from './Header';

const menuItems = [
	{
		title: 'Home',
		onClick: () => console.log('Home clicked'),
	},
	{
		title: 'About',
		onClick: () => console.log('About clicked'),
		children: [
			{
				title: 'Company',
				onClick: () => console.log('Company clicked'),
				children: [
					{
						title: 'Social',
						onClick: () => console.log('Social clicked'),
					},
					{
						title: 'Advertisers',
						onClick: () => console.log('Advertisers clicked'),
					},
				],
			},
			{
				title: 'Team',
				onClick: () => console.log('Team clicked'),
			},
		],
	},
	{
		title: 'Contact',
		onClick: () => console.log('Contact clicked'),
		children: [
			{
				title: 'Social',
				onClick: () => console.log('Social clicked'),
			},
			{
				title: 'Advertisers',
				onClick: () => console.log('Advertisers clicked'),
			},
		],
	},
];

const ArgTypes = {
	title: {
		description: 'Title of the header.',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Header' },
		},
	},
	menuItems: {
		description: 'Items to display in the menu.',
	},
	position: {
		description: 'Position of the header.',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'static' },
		},
	},
	logo: {
		description: 'Image or SVG file to display as the logo of the header.',
		control: {
			type: 'object',
		},
	},
	search: {
		description: 'Set to true to display a search field in the header.',
		control: {
			type: 'boolean',
		},
		defaultValue: false,
	},
	onSearch: {
		description: 'Function to call when the search field is submitted.',
		control: {
			type: 'function',
		},
	},
};

/**
 * The Header component is a versatile and essential element that provides a consistent and visually appealing top section for web or mobile applications. It serves as a navigation hub, displaying the application's logo, menu options, and other important features.
 */
const meta: Meta<typeof Header> = {
	title: 'Layout/Header',
	component: Header,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const DefaultHeader: Story = {
	args: {
		menuItems,
	},
	render: args => <Header {...args} />,
};

/**
 * The Header with Logo component is a visually appealing and functional element that adds a touch of branding to web or mobile applications. It prominently displays the application's logo at the top section, allowing users to easily identify and associate the logo with the brand or organization.
 */
export const HeaderWithLogo: Story = {
	args: {
		menuItems,
		logo: <LogoDevIcon />,
	},
	render: args => <Header {...args} />,
};

/**
 * The Header with Search component combines branding and search functionality to enhance the user experience of web or mobile applications. It prominently displays the application's logo, establishing brand identity, and also incorporates a search bar within the header.
 */
export const HeaderWithSearch: Story = {
	args: {
		menuItems,
		search: true,
		onSearch: () => console.log("I'm typing some"),
	},
	render: args => <Header {...args} />,
};
