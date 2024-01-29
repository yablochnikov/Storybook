import { Slider as MuiSlider, SliderProps as MuiSliderProps } from '@mui/material';
import { FC } from 'react';

interface SliderProps {
	size?: MuiSliderProps['size'];
	defaultValue?: number;
	ariaLabel: string;
	valueLabelDisplay?: 'auto' | 'on' | 'off';
	marks?: boolean | { value: number; label: string }[];
	step?: number;
	min?: number;
	max?: number;
	disabled?: boolean;
	onChange?: (event: Event, value: number | number[]) => void;
}

const Slider: FC<SliderProps> = ({ size, defaultValue, ariaLabel, valueLabelDisplay, marks, onChange, ...props }) => {
	return (
		<MuiSlider size={size} defaultValue={defaultValue} aria-label={ariaLabel} marks={marks} onChange={onChange} />
	);
};

export default Slider;
