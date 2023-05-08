import { Box, Button, TextField, Typography, Divider } from '@mui/material';
import { FC } from 'react';
import GoogleButton from 'react-google-button';
import { authenticationStyles } from './styles';

interface AuthenticationFormTypes {
	formTitle: string;
	googleLabel: string;
	centerTitle: string;
	inputLog: string;
	placeholderLog: string;
	inputPass: string;
	placeholderPass: string;
	submitButtonTitle: string;
	footerTitle: string;
	logInLabel: string;
}
const AuthenticationForm: FC<AuthenticationFormTypes> = ({
	formTitle,
	googleLabel,
	centerTitle,
	inputLog,
	placeholderLog,
	inputPass,
	placeholderPass,
	submitButtonTitle,
	footerTitle,
	logInLabel,
}) => {
	return (
		<Box sx={authenticationStyles.formContainer}>
			<Box sx={authenticationStyles.formWrap}>
				<Box sx={authenticationStyles.formHeader}>
					<Typography sx={authenticationStyles.headerTitle}>{formTitle}</Typography>
					<GoogleButton label={googleLabel} />
					<Box sx={authenticationStyles.positionWrap}>
						<Divider sx={authenticationStyles.dividerStyles} />
						<Typography sx={authenticationStyles.centerTitleStyles}>{centerTitle}</Typography>
						<Divider sx={authenticationStyles.dividerStyles} />
					</Box>
				</Box>
				<Box sx={authenticationStyles.inputContainer}>
					<Box sx={{ mb: '10px', mt: '10px' }}>
						<Typography sx={authenticationStyles.inputTitleStyle}>{inputLog}</Typography>
						<TextField
							variant="standard"
							placeholder={placeholderLog}
							sx={authenticationStyles.inputStyles}
						/>
					</Box>
					<Box>
						<Typography sx={authenticationStyles.inputTitleStyle}>{inputPass}</Typography>
						<TextField
							variant="standard"
							placeholder={placeholderPass}
							sx={authenticationStyles.inputStyles}
						/>
					</Box>
					<Button sx={authenticationStyles.submitButton}>{submitButtonTitle}</Button>
				</Box>
				<Box sx={authenticationStyles.positionWrap}>
					<Typography sx={{ fw: 'bold' }}>{footerTitle}</Typography>
					<Button>{logInLabel}</Button>
				</Box>
			</Box>
		</Box>
	);
};
export default AuthenticationForm;
