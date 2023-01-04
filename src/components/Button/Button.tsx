import { Button as MuiButton } from '@mui/material';
import { FC } from 'react';

type ButtonTypes = 'button' | 'submit';
type ButtonColor = 'primary' | 'secondary' | 'error' | 'success' | 'info';
type ButtonVariant = 'text' | 'contained' | 'outlined';
type ButtonSize = 'small' | 'medium' | 'large';

interface IButtonProps {
	title: string;
	type?: ButtonTypes;
	size?: ButtonSize;
	btnType?: ButtonColor;
	variant?: ButtonVariant;
	clickAction?: () => void;
	disabled?: boolean;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
}

export const Button: FC<IButtonProps> = ({
	title,
	clickAction,
	btnType,
	type,
	startIcon,
	endIcon,
	disabled,
	variant = 'contained',
	size,
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
				color: btnType === 'info' ? '#fff' : '#333',
				fontWeight: '400',
				fontSize: '18px',
				padding: '10px 24px',
				borderRadius: '4px',
				maxHeight: '43px',
			}}
		>
			{title}
		</MuiButton>
	);
};
