import { Meta, StoryObj } from '@storybook/react';
import BasicTable from './BasicTable';

const ArgTypes = {
	columns: {
		description:
			'The columns to display in the table. accessorKeys or accessorFns must match keys in the data prop. See more info on creating columns on the official docs site',
	},
	data: {
		description:
			"Pass your data as an array of objects. Objects can theoretically be any shape, but it's best to keep them consistent. See the usage guide for more info on creating columns and data",
	},
};

/**
 * We are using [material-react-table library](https://www.material-react-table.com/), you can find more information about the props in the [documentation](https://www.material-react-table.com/docs/props).
 */
const meta: Meta<typeof BasicTable> = {
	title: 'Data/Basic table',
	component: BasicTable,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};

export default meta;
type Story = StoryObj<typeof BasicTable>;

const data = [
	{
		name: {
			firstName: 'John',
			lastName: 'Doe',
		},
		address: '261 Erdman Ford',
		city: 'East Daphne',
		state: 'Kentucky',
	},
	{
		name: {
			firstName: 'Jane',
			lastName: 'Doe',
		},
		address: '769 Dominic Grove',
		city: 'Columbus',
		state: 'Ohio',
	},
	{
		name: {
			firstName: 'Joe',
			lastName: 'Doe',
		},
		address: '566 Brakus Inlet',
		city: 'South Linda',
		state: 'West Virginia',
	},
	{
		name: {
			firstName: 'Kevin',
			lastName: 'Vandy',
		},
		address: '722 Emie Stream',
		city: 'Lincoln',
		state: 'Nebraska',
	},
	{
		name: {
			firstName: 'Joshua',
			lastName: 'Rolluffs',
		},
		address: '32188 Larkin Turnpike',
		city: 'Omaha',
		state: 'Nebraska',
	},
];

const columns = [
	{
		accessorKey: 'name.firstName',
		header: 'First Name',
	},
	{
		accessorKey: 'name.lastName',
		header: 'Last Name',
	},
	{
		accessorKey: 'address',
		header: 'Address',
	},
	{
		accessorKey: 'city',
		header: 'City',
	},
	{
		accessorKey: 'state',
		header: 'State',
	},
];

export const DefaultBasicTable: Story = {
	args: {
		columns,
		data,
	},
	render: args => <BasicTable {...args} />,
};
