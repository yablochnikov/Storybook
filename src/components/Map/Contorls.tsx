import React, { FC, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import usePlacesAutocomplete from 'use-places-autocomplete';

import { Button } from '@mui/material';
import { Close, NearMe } from '@mui/icons-material';
import { LatLngLiteral, Map } from '../../core/models/map';
import AutocompleteInput from './AutocompleteInput';

interface GeocodeResponse {
	results: {
		formatted_address: string;
	}[];
}

interface PlaceInputProps {
	setOrigin: (position: LatLngLiteral) => void;
	setDestination: (position: LatLngLiteral) => void;
	setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenControls: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls: FC<PlaceInputProps> = ({ setOrigin, setDestination, setIsLoading, setOpenControls }) => {
	const [map, _setMap] = useState<Map | null>(null);
	const [myLocation, setMyLocation] = useState<LatLngLiteral | null>(null);

	const {
		suggestions: { data },
		setValue,
	} = usePlacesAutocomplete({
		debounce: 300,
	});

	const findMyLocation = () => {
		if (navigator.geolocation) {
			setIsLoading && setIsLoading(true);
			navigator.geolocation.getCurrentPosition(position => {
				const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

				axios
					.get(url)
					.then((response: AxiosResponse<GeocodeResponse>) => response.data)
					.then((location: GeocodeResponse) => {
						const place = location.results[0];
						setValue(place.formatted_address);
					})
					.finally(() => setIsLoading && setIsLoading(false));

				setOrigin({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				map?.panTo({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				setMyLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	};

	return (
		<>
			<Button size="small" sx={{ height: '40px', padding: 0 }} onClick={findMyLocation}>
				<NearMe />
			</Button>

			<AutocompleteInput placeholder="Origin" onSelect={setOrigin} myLocation={myLocation} />
			<AutocompleteInput placeholder="Destination" onSelect={setDestination} />

			<Button size="small" sx={{ height: '40px' }} onClick={() => setOpenControls(false)}>
				<Close />
			</Button>
		</>
	);
};

export default Controls;
