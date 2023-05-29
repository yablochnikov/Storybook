import { FC, RefObject } from 'react';
import { InputBase, Typography, IconButton, Box, Paper } from '@mui/material';
import { Call, Duo, Send, AttachFile, SentimentSatisfiedAlt, ArrowBackIos } from '@mui/icons-material';
import { chatsStyle } from './styles';
import Message from './Message';
import { ChatRoomType } from './types';
import { useScroll } from '../../hooks/useScroll';

const ChatRoom: FC<ChatRoomType> = ({
	selectedRoom,
	sortedMess,
	theme,
	isBreakpoints,
	setIsBreakpoints,
	setIsButton,
}) => {
	const { refScroll } = useScroll(selectedRoom);
	return (
		<Box
			sx={{
				width: '100%',
				position: 'relative',
			}}
		>
			<Box
				sx={{
					...chatsStyle.chatHeader,
					background: theme.backgroundsHeaderMess,
					borderBottom: theme.headerUnderline,
					color: theme.colorTextChat,
				}}
			>
				{isBreakpoints && (
					<IconButton
						type="button"
						onClick={() => {
							setIsBreakpoints(false);
							setIsButton(true);
						}}
					>
						<ArrowBackIos />
					</IconButton>
				)}

				<Typography variant="h2">{selectedRoom}</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Box sx={{ ...chatsStyle.callButtonWrap, background: theme.buttonColorCircle }}>
						<Call sx={{ ...chatsStyle.callButton, color: theme.buttonColorIcon }} />
					</Box>
					<Duo
						sx={{
							...chatsStyle.viedoCall,
							fill: theme.buttonColorCircle,
							color: theme.buttonColorIcon,
						}}
					/>
				</Box>
			</Box>
			<Box sx={chatsStyle.smsSection}>
				<Box sx={chatsStyle.scroll} ref={refScroll}>
					{sortedMess?.map(message => {
						return <Message selectedRoom={selectedRoom} message={message} theme={theme} />;
					})}
				</Box>
			</Box>

			<Paper
				component="form"
				sx={{
					...chatsStyle.inputStyle,
					background: theme.inputBackground,
					input: {
						color: theme.inputTextColor,
						'&::placeholder': { color: theme.inputPlaceholderColor },
					},
				}}
			>
				<InputBase sx={{ color: '#000', width: '100%' }} placeholder="Type your message here..." />
				<IconButton type="button" sx={{ color: theme.inputPlaceholderColor }}>
					<SentimentSatisfiedAlt />
				</IconButton>
				<IconButton type="button" sx={{ color: theme.inputPlaceholderColor }}>
					<AttachFile />
				</IconButton>
				<IconButton
					type="button"
					sx={{ background: theme.buttonColorCircle, '&:hover': { background: '#007aff' } }}
				>
					<Send sx={{ color: theme.buttonColorIcon }} />
				</IconButton>
			</Paper>
		</Box>
	);
};

export default ChatRoom;
