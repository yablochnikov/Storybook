import { RefObject, Dispatch, SetStateAction } from 'react';

export type ContentType = { name: string; time: number; sms: string };
export type RoomType = { roomName: string; content: ContentType[] };

export enum ThemeType {
	Default = 'default',
	Night = 'night',
	Green = 'green',
}
export interface ChatsTypes {
	themeType: ThemeType;
}

export type StylesType = {
	backgroundsMess: string;
	backgroundsHeaderMess: string;
	colorTextChat: string;
	messContainerBackground: string;
	myMessContainerBackground: string;
	inputBackground: string;
	inputPlaceholderColor: string;
	inputTextColor: string;
	buttonColorCircle: string;
	buttonColorIcon: string;
	selectChatBackground: string;
	searchColor: string;
	headerUnderline: string;
};
export interface ChatRoomType {
	selectedRoom: string | null;
	sortedMess: ContentType[] | undefined;
	theme: StylesType;
	isBreakpoints: boolean;
	setIsBreakpoints: Dispatch<SetStateAction<boolean>>;
	setIsButton: Dispatch<SetStateAction<boolean>>;
}
export interface SelectChatWindowType {
	selectedRoom: string | null;
	setSelectedRoom: Dispatch<SetStateAction<string | null>>;
	theme: StylesType;
	setIsBreakpoints: Dispatch<SetStateAction<boolean>>;
	setIsButton: Dispatch<SetStateAction<boolean>>;
}
export interface MessageType {
	selectedRoom: string | null;
	message: ContentType;
	theme: StylesType;
}
