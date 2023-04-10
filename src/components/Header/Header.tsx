import { FC, useState, Fragment, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, Menu, MenuItem, useMediaQuery, Theme, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface MenuItem {
	label: string;
	onClick: () => void;
	children?: MenuItem[];
}

interface HeaderProps {
	title: string;
	menuItems: MenuItem[];
}

const renderMenuItems = (menuItems: MenuItem[]): JSX.Element[] => {
	return menuItems.map(menuItem => (
		<Box key={menuItem.label}>
			<MenuItem
				onClick={() => {
					menuItem.onClick();
				}}
			>
				{menuItem.label}
			</MenuItem>
			{menuItem.children && renderMenuItems(menuItem.children)}
		</Box>
	));
};

const Header: React.FC<HeaderProps> = ({ title, menuItems }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isSmallScreen = useMediaQuery(`(max-width: 600px)`);
	const [activeMenuItem, setActiveMenuItem] = useState('');

	const handleClick = (event: MouseEvent<HTMLButtonElement>, menuItem?: MenuItem) => {
		setAnchorEl(event.currentTarget);
		if (menuItem) setActiveMenuItem(menuItem.label);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="static">
			<Toolbar>
				{isSmallScreen || menuItems.length > 5 ? (
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
						<Typography variant="h6" color="inherit">
							{title}
						</Typography>
						<Box>
							<IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
								<MenuIcon />
							</IconButton>
							<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
								{renderMenuItems(menuItems)}
							</Menu>
						</Box>
					</Box>
				) : (
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
						<Typography variant="h6" color="inherit">
							{title}
						</Typography>
						<Box component="ul" sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
							{menuItems.map(menuItem => (
								<Box key={menuItem.label}>
									<Button
										aria-label="menu"
										onClick={e => handleClick(e, menuItem)}
										sx={{
											color: 'white',
											backgroundColor: activeMenuItem === menuItem.label ? '#333' : 'transparent',
										}}
										endIcon={menuItem.children && <ExpandMoreIcon />}
									>
										{menuItem.label}
									</Button>
									{menuItem.children && activeMenuItem === menuItem.label && (
										<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
											{renderMenuItems(menuItem.children || [])}
										</Menu>
									)}
								</Box>
							))}
						</Box>
					</Box>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
