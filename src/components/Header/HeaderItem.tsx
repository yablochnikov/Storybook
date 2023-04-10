import React, { FC } from 'react';
import { MenuItem, Menu } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IHeaderItem {
	title: string;
	onClick?: () => void;
	children?: IHeaderItem[];
}

const HeaderItem: FC<IHeaderItem> = ({ title, onClick, children }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (onClick: (() => void) | undefined, event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		if (onClick) {
			onClick();
		} // if statement cause of lint settings
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
				onClick={e => handleClick(onClick, e)}
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
						<HeaderItem {...item} key={item.title} />
					))}
				</Menu>
			)}
		</>
	);
};

export default HeaderItem;
