import { Meta, StoryObj } from '@storybook/react';
import MapComponent, { MapProps } from './Map';

const ArgTypes = {
	lat: {
		description: 'The latitude of the center of the map',
		control: {
			type: 'number',
			min: -90,
			max: 90,
		},
		defaultValue: 50.4501,
	},
	lng: {
		description: 'The longitude of the center of the map',
		control: {
			type: 'number',
			min: -180,
			max: 180,
		},
		defaultValue: 30.523399,
	},
	zoom: {
		description: 'The zoom level of the map',
		control: {
			type: 'range',
			min: 0,
			max: 20,
			step: 1,
		},
		defaultValue: 10,
	},
	apiKey: {
		description: 'The Google Maps API key',
	},
	onBoundsChanged: {
		description: "A callback function that is called when the map's bounds change",
	},
	onCenterChanged: {
		description: "A callback function that is called when the map's center changes",
	},
	onZoomChanged: {
		description: "A callback function that is called when the map's zoom level changes",
	},
	markers: {
		control: {
			type: 'object',
		},
		description: 'An array of objects that define markers to be placed on the map',
	},
	polylines: {
		description: 'An array of objects that define polylines to be drawn on the map',
	},
	destinationIcon: {
		description:
			'The URL or | google.maps.Icon | google.maps.Symbol of the icon to be used for the destination marker',
	},
	userLocationIcon: {
		description:
			'The URL or | google.maps.Icon | google.maps.Symbol of the icon to be used for the user location marker',
	},
	travelMode: {
		description: 'The mode of travel to use when calculating directions',
		options: ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'],
		control: {
			type: 'select',
		},
		defaultValue: 'DRIVING',
	},
};

const meta: Meta<typeof MapComponent> = {
	title: 'Layout/Map',
	component: MapComponent,
	tags: ['autodocs'],
	argTypes: ArgTypes,
};
export default meta;

type Story = StoryObj<typeof MapComponent>;

const Template = (args: MapProps) => {
	const polylines = [
		{
			path: [
				{ lat: 37.7749, lng: -122.4194 },
				{ lat: 40.712776, lng: -74.005974 },
			],
			strokeColor: 'green',
			strokeOpacity: 1.0,
			strokeWeight: 2,
		},
		{
			path: [
				{ lat: 37.7749, lng: -122.4194 },
				{ lat: 34.052235, lng: -118.243683 },
			],
			strokeColor: 'green',
			strokeOpacity: 1.0,
			strokeWeight: 2,
		},
	];
	const markers = [
		{
			position: { lat: 37.7749, lng: -122.4194 },
			label: 'A',
		},
		{
			position: { lat: 40.712776, lng: -74.005974 },
			label: 'B',
		},
		{
			position: { lat: 34.052235, lng: -118.243683 },
			label: 'C',
		},
	];

	return (
		<MapComponent
			{...args}
			polylines={polylines}
			markers={markers}
			apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
		/>
	);
};

export const DefaultMap: Story = {
	args: {
		lat: 50.4501,
		lng: 30.523399,
		zoom: 10,
	},
	render: args => <Template {...args} />,
};
