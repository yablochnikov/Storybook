import React, { FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { AlertTitle, Box, SxProps } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { AlertPropsVariantOverrides } from '@mui/material/Alert/Alert';
import { useTheme } from '@mui/system';

export interface IToastProps {
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

const Toast: FC<IToastProps> = ({
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
	const theme = useTheme();
	return (
		<Snackbar
			open={showToast}
			autoHideDuration={timeoutMs}
			onClose={onClose}
			sx={{ backgroundColor: theme.palette.background.paper, ...stylesRoot }}
			id={id}
		>
			<Alert title={title} severity={type && type} onClose={onClose} variant={variant}>
				{message}
				{action}
			</Alert>
		</Snackbar>
	);
};

export default Toast;
