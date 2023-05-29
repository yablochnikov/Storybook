import { useEffect, useState } from 'react';
import { RoomType, ContentType } from '../components/Chats/types';

export const useChats = (chatsContent: RoomType[]) => {
	const [isBreakpoints, setIsBreakpoints] = useState(false);
	const [isButton, setIsButton] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState<string | null>('Richards');
	const [sortedMess, setSortedMess] = useState<ContentType[] | undefined>([]);

	useEffect(() => {
		const messages = chatsContent.find(room => room.roomName === selectedRoom)?.content;
		const seortedMessages = messages?.sort((prevMess, nextMess) => Number(prevMess.time) - Number(nextMess.time));
		setSortedMess(seortedMessages);
	}, [selectedRoom, chatsContent]);

	const handleResize = () => {
		if (window.innerWidth < 900) {
			setIsBreakpoints(true);
		} else {
			setIsBreakpoints(false);
			setIsButton(false);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return {
		sortedMess,
		selectedRoom,
		setSelectedRoom,
		isBreakpoints,
		setIsBreakpoints,
		isButton,
		setIsButton,
	};
};
