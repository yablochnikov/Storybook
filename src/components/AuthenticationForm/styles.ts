const formContainer = {
	display: 'flex',
	background: '#fff',
	height: '600px',
	width: '400px',
	border: '1px solid #e3e3e3',
	borderRadius: '16px',
	padding: '20px',
};
const formWrap = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alightItems: 'flex-start' };
const formHeader = {
	display: 'flex',
	flexWrap: 'wrap',
	height: '200px',
	justifyContent: 'center',
};
const headerTitle = {
	color: 'black',
	width: '100%',
	textAlign: 'center',
	paddingTop: '20px',
	fontWeight: 'bold',
	fontSize: '1.5rem',
};
const positionWrap = { display: 'flex', alignItems: 'center' };
const dividerStyles = { border: '2px solid #c9c9ca', width: '50px' };
const centerTitleStyles = { textTransform: 'uppercase', margin: '8px', color: '#c9c9ca' };
const inputStyles = {
	width: '300px',
	'& .MuiInput-root': {
		height: '50px',
		border: '1px solid #e3e3e3',
		borderRadius: '8px',
		paddingLeft: '10px',
		'&:hover::before': { border: 'none !important' },
		'&:before': { borderBottom: 'none' },
		'&:after': { borderBottom: 'none' },
	},
};
const inputContainer = { height: '250', textAlign: 'center' };
const inputTitleStyle = { textAlign: 'start', fontWeight: 'bold' };
const submitButton = {
	background: 'rgb(66, 133, 244)',
	color: 'white',
	marginTop: '20px',
	'&:hover': { background: 'rgb(66, 133, 244)' },
};
export const authenticationStyles = {
	inputStyles,
	formContainer,
	formWrap,
	formHeader,
	headerTitle,
	positionWrap,
	dividerStyles,
	centerTitleStyles,
	submitButton,
	inputContainer,
	inputTitleStyle,
};
