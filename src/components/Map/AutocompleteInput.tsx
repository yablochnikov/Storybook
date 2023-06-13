import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import parse from 'autosuggest-highlight/parse';
import { TextField, Autocomplete, Grid } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { LatLngLiteral } from '../../core/models/map';

interface AutocompleteInputProps {
	placeholder: string;
	onSelect: (position: LatLngLiteral) => void;
	myLocation?: LatLngLiteral | null;
}

interface PlaceSelect {
	description: string;
	setPlace: (position: LatLngLiteral) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ placeholder, onSelect, myLocation }) => {
	const {
		value,
		suggestions: { data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		debounce: 300,
	});

	React.useEffect(() => {
		if (myLocation) {
			const { lat, lng } = myLocation;
			const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

			fetch(geocodeUrl)
				.then(response => response.json())
				.then(data => {
					const place = data.results[0];
					setValue(place.formatted_address);
				})
				.catch(error => console.log('😱 Error: ', error));
		}
	}, [myLocation, setValue]);

	const handleInput = (value: string) => {
		setValue(value);
	};

	const handleSelect = async ({ description, setPlace }: PlaceSelect) => {
		setValue(description, false);
		clearSuggestions();

		getGeocode({ address: description })
			.then(results => getLatLng(results[0]))
			.then(({ lat, lng }) => setPlace({ lat, lng }))
			.catch(error => console.log('😱 Error: ', error));
	};

	return (
		<Autocomplete
			id="destination-autocomplete"
			options={data}
			inputValue={value}
			getOptionLabel={option => option.description}
			filterOptions={x => x}
			onChange={(_event, value) => value && handleSelect({ description: value.description, setPlace: onSelect })}
			autoComplete
			includeInputInList
			sx={{ width: '100%', margin: '0 10px' }}
			noOptionsText="No results"
			renderInput={params => (
				<TextField
					{...params}
					onChange={e => handleInput(e.target.value)}
					size="small"
					variant="outlined"
					placeholder={placeholder}
				/>
			)}
			renderOption={(_props, option) => {
				const matches = option.structured_formatting.main_text_matched_substrings || [];

				const parts = parse(
					option.structured_formatting.main_text,
					matches.map((match: any) => [match.offset, match.offset + match.length])
				);

				return (
					<Grid
						container
						alignItems="center"
						onClick={() => handleSelect({ description: option.description, setPlace: onSelect })}
					>
						<Grid item>
							<LocationOn />
						</Grid>
						<Grid item xs>
							{parts.map(part => (
								<span key={part.text} style={{ fontWeight: part.highlight ? 700 : 400 }}>
									{part.text}
								</span>
							))}
						</Grid>
					</Grid>
				);
			}}
		/>
	);
};

export default AutocompleteInput;
