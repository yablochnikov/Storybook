import { Meta, StoryObj } from '@storybook/react';
import MapComponent, { MapProps } from './MapComponent';

const ArgTypes = {
	center: {
		description: 'Center of the map',
	},
	zoom: {
		description: 'Zoom level of the map',
		table: {
			type: { summary: 'number' },
			defaultValue: { summary: 8 },
		},
	},
	markers: {
		description: 'Markers to be displayed on the map',
	},
	clickableIcons: {
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: true },
		},
	},
	disableDefaultUI: {
		description: `Enables/disables all default UI buttons. Does not disable the keyboard controls option. Does not disable gesture controls.`,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: true },
		},
	},
	disableDoubleClickZoom: {
		description: `If false, disables zooming on double click, zooming the map on double click will still be available.`,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	draggable: {
		description: `If false, prevents the map from being dragged. Dragging is enabled by default.`,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
	draggableCursor: {
		description: `The name or url of the cursor to display when mousing over a draggable map. This property uses the css cursor attribute to change the icon. As with the css property, you must specify at least one fallback cursor that is not a URL. For example: draggableCursor: 'url(http://www.example.com/icon.png), auto;'.`,
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'null' },
		},
	},
	fullscreenControl: {
		description: `If false, hides the fullscreen control. This control is not supported on Internet Explorer 11 and earlier.`,
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: true },
		},
	},
	originMarkerIcon: {
		description: `Icon to be displayed for the origin marker. For example: 'http://www.example.com/icon.png`,
		table: {
			type: { summary: 'string' },
		},
	},
	destinationMarkerIcon: {
		description: `Icon to be displayed for the destination marker. For example: 'http://www.example.com/icon.png`,
		table: {
			type: { summary: 'string' },
		},
	},
	theme: {
		description: 'Theme of the map',
		table: {
			type: { summary: 'string' },
			defaultValue: { summary: 'Standard' },
		},
	},
	circles: {
		description: 'Circles to be displayed on the map',
		table: {
			type: { summary: 'array' },
		},
	},
	displayCustomControls: {
		description: 'Display custom controls',
		table: {
			type: { summary: 'boolean' },
			defaultValue: { summary: false },
		},
	},
};
/**
 * Map was created using the Google Maps API and the @react-google-maps/api package. You can find more info about props and usage here: https://react-google-maps-api-docs.netlify.app/
 */
const meta: Meta<typeof MapComponent> = {
	title: 'Layout/Map',
	component: MapComponent,
	tags: ['autodocs'],
	decorators: [
		Story => (
			<div style={{ margin: 0, padding: 0 }}>
				<Story />
			</div>
		),
	],
	argTypes: ArgTypes,
};

export default meta;

type Story = StoryObj<typeof MapComponent>;

export const DefaultMap: Story = {
	args: {
		center: {
			lat: 37.7749,
			lng: -122.4194,
		},
		zoom: 8,
		markers: [
			{
				position: {
					lat: 37.7749,
					lng: -122.4194,
				},
			},
		],
		clickableIcons: true,
		disableDefaultUI: true,
		disableDoubleClickZoom: false,
		draggable: true,
		draggableCursor: null,
		fullscreenControl: true,
		originMarkerIcon: null,
		destinationMarkerIcon: null,
		theme: 'Night',
		circles: [
			{
				center: {
					lat: 37.7749,
					lng: -122.4194,
				},
				radius: 1000,
				options: {
					strokeColor: '#FF0000',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: '#FF0000',
					fillOpacity: 0.35,
					clickable: true,
				},
			},
		],
		displayCustomControls: true,
	},
	parameters: {
		layout: 'fullscreen',
	},

	render: args => <MapComponent {...args} />,
};
