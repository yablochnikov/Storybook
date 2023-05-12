import { FC, useRef } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { TextField, Autocomplete, InputAdornment, Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import { Map, LatLngLiteral } from '../../core/models/map';

type PlacesProps = {
	setPlace: (position: google.maps.LatLngLiteral) => void;
	type: 'origin' | 'destination';
	placeholder?: string;
};

const Places: FC<PlacesProps> = ({ setPlace, placeholder, type }) => {
	const mapRef = useRef<null | Map>(null);
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete();

	const handleInput = (place: string) => {
		setValue(place);
	};

	const handleSelect = async (description: string) => {
		setValue(description, false);
		clearSuggestions();

		try {
			const results = await getGeocode({ address: description });
			const { lat, lng } = await getLatLng(results[0]);
			setPlace({ lat, lng });
		} catch (error) {
			console.log('Error: ', error);
		}
	};

	const findMyLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
				fetch(url)
					.then(response => response.json())
					.then(location => {
						const place = location.results[0];
						setValue(place.formatted_address);
					});

				setPlace({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				mapRef.current?.panTo({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	};

	return (
		<>
			<Autocomplete
				sx={{ marginBottom: '1rem' }}
				disablePortal
				id="places-autocomplete"
				options={data}
				inputValue={value}
				getOptionLabel={option => option.description}
				filterOptions={x => x}
				autoComplete
				includeInputInList
				renderInput={params => (
					<TextField
						placeholder={placeholder}
						{...params}
						label={placeholder}
						variant="outlined"
						fullWidth
						onChange={e => handleInput(e.target.value)}
					/>
				)}
				onChange={(event, value) => value && handleSelect(value.description)}
			/>
			{type === 'origin' && (
				<Box
					sx={{
						marginBottom: '1rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						variant="caption"
						sx={{ marginBottom: '10px', cursor: 'pointer', textDecoration: 'underline' }}
						onClick={findMyLocation}
					>
						Find my location <MyLocationIcon />
					</Typography>
					<Typography
						variant="caption"
						sx={{ marginBottom: '10px', cursor: 'pointer', textDecoration: 'underline' }}
					>
						Point on the map
						<LocationOnIcon />
					</Typography>
				</Box>
			)}
		</>
	);
};

export default Places;
