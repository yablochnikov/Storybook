import { FC, useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Typography, AppBar, Menu, Box, IconButton, Toolbar, InputBase } from '@mui/material';
import HeaderItem from './HeaderItem';

interface HeaderProps {
	title: string;
	menuItems: IMenuItem[];
	logo?: JSX.Element;
	search?: boolean;
	onSearch?: () => void;
	position?: 'absolute' | 'fixed' | 'relative' | 'static';
}

interface IMenuItem {
	title: string;
	onClick?: () => void;
	children?: IMenuItem[];
}

const Header: FC<HeaderProps> = ({ title, menuItems, logo, search, onSearch, position }) => {
	const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const screenCondition = !isSmallScreen && menuItems.length <= 4;
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 420);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<AppBar
			position={position}
			sx={{
				padding: '0 1rem',
			}}
		>
			<Toolbar
				sx={{
					minHeight: '64px',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				{logo && <Box component="div">{logo}</Box>}
				{title && (
					<Typography variant="h3" component="div">
						{title}
					</Typography>
				)}
				{search && (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
						}}
					>
						<InputBase
							sx={{ marginLet: '15px', color: '#fff', width: '50%' }}
							placeholder="Search..."
							inputProps={{ 'aria-label': 'search' }}
							onChange={onSearch}
						/>
						<IconButton type="button" aria-label="search">
							<SearchIcon sx={{ fill: '#fff' }} />
						</IconButton>
					</Box>
				)}
				<Box
					component="ul"
					sx={{
						display: 'flex',
						margin: 0,
						padding: 0,
					}}
				>
					{screenCondition ? (
						menuItems.map(item => <HeaderItem {...item} />)
					) : (
						<>
							<IconButton aria-controls="header-menu" aria-haspopup="true" onClick={handleClick}>
								<MenuIcon
									sx={{
										fill: 'white',
									}}
								/>
							</IconButton>
							<Menu open={Boolean(anchorEl)} onClose={handleClose} anchorEl={anchorEl} id="header-menu">
								{menuItems.map(item => (
									<HeaderItem {...item} key={item.title} />
								))}
							</Menu>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
