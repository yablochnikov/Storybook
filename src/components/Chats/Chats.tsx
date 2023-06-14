import { SxProps, useTheme, Box } from '@mui/system';
import SelectChatWindow from './SelectChatWindow';
import ChatRoom from './ChatRoom';
import { useChats } from '../../hooks/useChats';
import { chatsContent } from './constants';
import { ThemeStyles } from './theme';
import { ChatsTypes } from './types';

const Chats = ({ themeType }: ChatsTypes) => {
	const theme = ThemeStyles[themeType];
	const pageContainer: SxProps = {
		display: 'flex',
		borderRadius: '16px',
		width: '100%',
		height: '100vh',
		color: '#fff',
		boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.14)',
	};
	const { isBreakpoints, selectedRoom, sortedMess, setSelectedRoom, isButton, setIsBreakpoints, setIsButton } =
		useChats(chatsContent);

	return (
		<Box sx={pageContainer}>
			{!isBreakpoints && (
				<SelectChatWindow
					setSelectedRoom={setSelectedRoom}
					selectedRoom={selectedRoom}
					theme={theme}
					setIsBreakpoints={setIsBreakpoints}
					setIsButton={setIsButton}
				/>
			)}

			{!isButton && (
				<ChatRoom
					selectedRoom={selectedRoom}
					sortedMess={sortedMess}
					theme={theme}
					setIsBreakpoints={setIsBreakpoints}
					isBreakpoints={isBreakpoints}
					setIsButton={setIsButton}
				/>
			)}
		</Box>
	);
};

export default Chats;
