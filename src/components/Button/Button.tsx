import { Button as MuiButton } from '@mui/material';
import { FC } from 'react';

type ButtonTypes = 'button' | 'submit' | 'reset';
type ButtonColor = 'primary' | 'secondary' | 'error' | 'success' | 'info';
type ButtonVariant = 'text' | 'contained' | 'outlined';
type ButtonSize = 'small' | 'medium' | 'large';

interface IButtonProps {
	title?: string;
	type?: ButtonTypes;
	size?: ButtonSize;
	btnType?: ButtonColor;
	variant?: ButtonVariant;
	disabled?: boolean;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	icon?: JSX.Element;
	clickAction?: () => void;
	styles?: {};
}

export const Button: FC<IButtonProps> = ({
	title,
	btnType,
	type,
	startIcon,
	endIcon,
	disabled,
	variant = 'contained',
	size,
	icon,
	clickAction,
	styles,
}) => {
	return (
		<MuiButton
			onClick={clickAction}
			color={btnType}
			variant={variant}
			type={type}
			size={size}
			disabled={disabled}
			startIcon={startIcon}
			endIcon={endIcon}
			sx={{
				boxShadow: variant === 'contained' ? '0 4px 10px rgb(0 0 0 / 25%)' : '',
				color: variant === 'contained' ? '#fff' : btnType,
				borderRadius: icon ? '50%' : '4px',
				padding: icon ? '8px' : '6px 16px',
				minWidth: '24px',
				...styles,
			}}
		>
			{title}
			{icon && icon}
		</MuiButton>
	);
};
