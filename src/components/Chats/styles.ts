export const INPUT_HEIGHT = 60;
export const HEADER_HEIGHT = 80;
const chatsHeader = { display: 'flex', justifyContent: 'space-between', margin: '30px', alignItems: 'center' };
const chatsHeaderTitle = { fontSize: '1.5rem', textTransform: 'uppercase' };
const addCircle = { height: '50px', width: '30px', cursor: 'pointer' };
const searchWrap = {
	marginTop: '30px',
	padding: '2px 15px',
	display: 'flex',
	justifyContent: 'space-between',
	color: '#fff',
};
const inputColor = { color: '#fff' };
const chatsList = {
	display: 'flex',
	flexWrap: 'wrap',
	height: '200px',
	marginTop: '40px',
};
const chatButton = {
	display: 'flex',
	height: '60px',
	width: '100%',
	border: 'none',
	color: 'rgb(218, 213, 213)',
	justifyContent: 'flex-start',
	textTransform: 'none',
	'&.Mui-selected': { color: 'white' },
};
const userIcon = { height: '60px', width: '40px', marginRight: '10px' };
const chatHeader = {
	display: 'flex',
	justifyContent: 'space-between',
	height: HEADER_HEIGHT,
	alignItems: 'center',
	padding: '20px 10px',
};
const callButtonWrap = {
	height: 35,
	width: 35,
	borderRadius: '18px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginRight: '10px',
	cursor: 'pointer',
};
const callButton = { height: 15, width: 15 };
const viedoCall = { height: 40, width: 40, cursor: 'pointer' };

const scroll = {
	overflowY: 'scroll',
	width: '100%',
	'&::-webkit-scrollbar': {
		width: '8px',
	},
	'&::-webkit-scrollbar-track': {
		borderRadius: '5px',
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: 'rgb(218, 213, 213)',
		width: '3px',
		borderRadius: '16px',
	},
};
const messageContainer = { display: 'flex', margin: '15px', alignItems: 'center' };
const message = {
	minWidth: '150px',
	maxWidth: '250px',
	minHeight: '80px',
	borderRadius: '8px',
	padding: '10px',
};
const messageHeader = {
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: '10px',
};
const smsSection = {
	maxHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${INPUT_HEIGHT}px)`,
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-end',
	justifyContent: 'end',
	overflowX: 'hidden',
};
const inputStyle = {
	padding: '10px 15px',
	display: 'flex',
	justifyContent: 'space-between',
	color: '#000',
	width: '100%',
	height: INPUT_HEIGHT,
	position: 'absolute',
};
const buttonHeader = { display: 'flex', justifyContent: 'space-between' };
const chatsSection = {
	width: '100%',
	'@media(min-width: 900px)': {
		width: '35rem',
	},
};
const lastSms = {
	width: '300px',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
	'@media(max-width: 400px)': {
		width: '230px',
	},
};

export const chatsStyle = {
	chatsHeader,
	chatsHeaderTitle,
	addCircle,
	chatsList,
	inputColor,
	searchWrap,
	chatButton,
	userIcon,
	chatHeader,
	callButtonWrap,
	callButton,
	viedoCall,
	messageContainer,
	message,
	messageHeader,
	smsSection,
	inputStyle,
	scroll,
	buttonHeader,
	chatsSection,
	lastSms,
};
