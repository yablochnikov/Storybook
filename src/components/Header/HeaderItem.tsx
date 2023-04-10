import React, { FC } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Button, MenuItem } from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IMenuItem {
	title: string;
	url?: string;
	onClick?: () => void;
	children?: IMenuItem[];
}

const CustomizedMenus: FC<IMenuItem> = ({ title, url, onClick, children }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<MenuItem
				sx={{
					height: '100%',
					minWidth: '100px',
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					textAlign: 'center',
					'&:hover': {
						backgroundColor: 'rgba(0,0,0,0.1)',
					},
				}}
				onClick={handleClick}
			>
				{title}
				{children && (open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)}
			</MenuItem>
			{children && (
				<Menu
					sx={{
						boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
					}}
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					onMouseLeave={handleClose}
					elevation={0}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					{children?.map(item => (
						<CustomizedMenus {...item} />
					))}
				</Menu>
			)}
		</>
	);
};

export default CustomizedMenus;
