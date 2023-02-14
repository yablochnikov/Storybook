import React, { FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { AlertTitle, Box, SxProps } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { AlertPropsVariantOverrides } from '@mui/material/Alert/Alert';

interface IToastProps {
	id: string;
	title: string;
	timeoutMs: number;
	type: AlertColor;
	message?: string | JSX.Element;
	action?: JSX.Element;
	onClose?: () => void;
	showToast: boolean;
	variant: OverridableStringUnion<'standard' | 'filled' | 'outlined', AlertPropsVariantOverrides>;
	stylesRoot?: SxProps;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return (
		<MuiAlert elevation={6} ref={ref} variant={props.variant} {...props}>
			<Box sx={{ maxWidth: '250px' }}>
				<AlertTitle>{props.title}</AlertTitle>
				<div>{props.children}</div>
			</Box>
		</MuiAlert>
	);
});

export const Toast: FC<IToastProps> = ({
	showToast,
	id,
	title,
	timeoutMs,
	type,
	message,
	action,
	onClose,
	variant,
	stylesRoot,
}) => {
	return (
		<Snackbar open={showToast} autoHideDuration={timeoutMs} onClose={onClose} sx={stylesRoot} id={id}>
			<Alert title={title} severity={type && type} onClose={onClose} variant={variant}>
				{message}
				{action}
			</Alert>
		</Snackbar>
	);
};
