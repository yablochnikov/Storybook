import { FC } from 'react';
import { InputBase, Typography, IconButton, Box, Paper, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { AccountCircle, AddCircle, Search } from '@mui/icons-material';
import { chatsStyle } from './styles';
import { chatsContent } from './constants';
import { SelectChatWindowType } from './types';

const SelectChatWindow: FC<SelectChatWindowType> = ({
	selectedRoom,
	setSelectedRoom,
	theme,
	setIsBreakpoints,
	setIsButton,
}) => {
	const handleAlignment = (event: React.MouseEvent<HTMLElement>, newSelectedRoom: string | null) => {
		if (window.innerWidth < 900) {
			setIsBreakpoints(true);
			setIsButton(false);
		}
		setSelectedRoom(newSelectedRoom);
	};

	return (
		<Box sx={{ ...chatsStyle.chatsSection, background: theme.selectChatBackground }}>
			<Box sx={{ ...chatsStyle.chatsHeader, color: '#fff' }}>
				<Typography sx={chatsStyle.chatsHeaderTitle} variant="h2">
					Chats
				</Typography>
				<AddCircle sx={chatsStyle.addCircle} />
			</Box>
			<Paper component="form" sx={{ ...chatsStyle.searchWrap, background: theme.searchColor }}>
				<InputBase sx={chatsStyle.inputColor} placeholder="Search Here" />
				<IconButton type="button">
					<Search sx={chatsStyle.inputColor} />
				</IconButton>
			</Paper>
			<ToggleButtonGroup sx={chatsStyle.chatsList} onChange={handleAlignment} exclusive value={selectedRoom}>
				{chatsContent?.map(messageContent => {
					const lastMessage = messageContent.content.at(-1)?.time ?? '';
					return (
						<ToggleButton
							value={messageContent.roomName}
							sx={chatsStyle.chatButton}
							key={messageContent.roomName}
						>
							<AccountCircle sx={chatsStyle.userIcon} />
							<Box
								sx={{
									textAlign: 'start',
									width: '100%',
								}}
							>
								<Box sx={chatsStyle.buttonHeader}>
									<Typography sx={{ fontWeight: 'bold' }}>{messageContent.roomName}</Typography>
									<Typography sx={{ marginRight: '10px' }}>
										{`${new Date(lastMessage).getUTCHours()}:${new Date(
											lastMessage
										).getUTCMinutes()}`}
									</Typography>
								</Box>
								<Typography sx={chatsStyle.lastSms}>{messageContent.content.at(-1)?.sms}</Typography>
							</Box>
						</ToggleButton>
					);
				})}
			</ToggleButtonGroup>
		</Box>
	);
};

export default SelectChatWindow;
