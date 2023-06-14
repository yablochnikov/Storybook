import { FC } from 'react';
import { LocationOn } from '@mui/icons-material';
import { Grid } from '@mui/material';
import parse from 'autosuggest-highlight/parse';
import { LatLngLiteral } from '../../core/models/map';

interface AutocompleteElementProps {
	option: google.maps.places.AutocompletePrediction;
	handleSelect: (place: any) => void;
	onSelect: (position: LatLngLiteral) => void;
}

const AutocompleteElement: FC<AutocompleteElementProps> = ({ option, handleSelect, onSelect }) => {
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
};

export default AutocompleteElement;
