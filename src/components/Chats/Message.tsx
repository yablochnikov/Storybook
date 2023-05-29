import { useEffect, useState, FC } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';
import { chatsStyle } from './styles';
import { MessageType } from './types';

const Message: FC<MessageType> = ({ selectedRoom, message, theme }) => {
	const [accountPosition, setAccountPosition] = useState(false);
	useEffect(() => {
		return message.name === selectedRoom ? setAccountPosition(true) : setAccountPosition(false);
	}, [selectedRoom, message.name]);

	return (
		<Box
			sx={
				message.name === selectedRoom
					? {
							...chatsStyle.messageContainer,
							justifyContent: 'flex-start',
							alignSelf: 'start',
					  }
					: { ...chatsStyle.messageContainer, justifyContent: 'flex-end' }
			}
		>
			{accountPosition && (
				<AccountCircle
					sx={{ color: theme.colorTextChat, marginRight: '10px', width: '30px', height: '30px' }}
				/>
			)}
			<Box
				sx={
					message.name === selectedRoom
						? {
								...chatsStyle.message,
								background: theme.messContainerBackground,
								color: theme.colorTextChat,
						  }
						: {
								...chatsStyle.message,
								background: theme.myMessContainerBackground,
								color: '#fff',
						  }
				}
			>
				<Box sx={chatsStyle.messageHeader}>
					<Typography sx={{ fontWeight: 'bold' }}>{message.name}</Typography>
					<Typography sx={{ fontWeight: 'bold' }}>{`${new Date(message.time).getUTCHours()}:${new Date(
						message.time
					).getUTCMinutes()}`}</Typography>
				</Box>
				<Box>{message.sms}</Box>
			</Box>
			{!accountPosition && (
				<AccountCircle sx={{ color: theme.colorTextChat, marginLeft: '10px', width: '30px', height: '30px' }} />
			)}
		</Box>
	);
};

export default Message;
