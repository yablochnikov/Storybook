/* eslint-disable no-restricted-globals */
import { InputAdornment, SxProps, TextField as MuiTextInput } from '@mui/material';
import { ChangeEvent, FC, ReactNode, Ref } from 'react';

type TextFieldVariant = 'outlined' | 'filled' | 'standard';
type TextInputColor = 'primary' | 'secondary' | 'info' | 'error' | 'success' | 'warning';
type TextInputType = 'text' | 'number' | 'password' | 'search' | 'date' | 'time' | 'email';
type TextInputSize = 'medium' | 'small';
type TextInputMargin = 'none' | 'normal' | 'dense';

export interface ITextInput {
	variant?: TextFieldVariant;
	size?: TextInputSize;
	color?: TextInputColor;
	type?: TextInputType;
	margin?: TextInputMargin;
	label?: string;
	placeholder?: string;
	helperText?: string;
	error?: boolean;
	disabled?: boolean;
	autoFocus?: boolean;
	fullWidth?: boolean;
	required?: boolean;
	multiline?: boolean;
	rows?: number;
	minRows?: number;
	maxRows?: number;
	id?: string;
	name?: string;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	startAdornment?: ReactNode;
	endAdornment?: ReactNode;
	sx?: SxProps;
	inputRef?: Ref<HTMLInputElement>;
}

const TextInput: FC<ITextInput> = ({ label, type, endAdornment, startAdornment, ...props }) => {
	return (
		<MuiTextInput
			{...props}
			hiddenLabel={!label}
			label={!['date', 'time'].includes(type!) ? label : undefined}
			type={type}
			InputProps={{
				startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>,
				endAdornment: endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>,
			}}
		/>
	);
};

export default TextInput;
