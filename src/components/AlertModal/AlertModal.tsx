import { Box, Modal, Typography } from '@mui/material';
import { FC } from 'react';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Button } from '../Button/Button';

interface IAlertModalProps {
	title: string;
	msg?: string;
	secondaryMsg?: string | JSX.Element | JSX.Element[];
	onCancel: () => void;
	onConfirm: () => void;
	confirmTxt: string;
	cancelTxt?: string;
	isDestructive?: boolean;
	showModal: boolean;
	closeModal: () => void;
	modalStyles?: {};
	modalContentStyles?: {};
	cancelBtnStyles?: {};
	confirmBtnStyles?: {};
}

const AlertModal: FC<IAlertModalProps> = ({
	title,
	msg,
	secondaryMsg,
	onCancel,
	onConfirm,
	confirmTxt,
	cancelTxt,
	isDestructive,
	showModal,
	closeModal,
	modalStyles,
	modalContentStyles,
	cancelBtnStyles,
	confirmBtnStyles,
}) => {
	const modalStyle = {
		position: 'absolute' as 'absolute',
		top: '50%',
		zIndex: 999,
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		backgroundColor: '#fff',
		borderRadius: '15px',
		boxShadow: 24,
		padding: '20px',
		display: 'flex',
		...modalStyles,
	};

	const iconStyle = {
		padding: '5px',
		marginRight: '15px',
		width: '35px',
		height: '35px',
		backgroundColor: isDestructive ? '#FEE2E2' : '#FDF3C7',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '50%',
		svg: {
			fill: isDestructive ? '#D32F30' : '#92400D',
		},
	};

	return (
		<Modal
			open={showModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			onClose={closeModal}
		>
			<Box sx={modalStyle}>
				<Box sx={iconStyle}>
					<WarningAmberRoundedIcon
						sx={{
							display: 'block',
							marginBottom: '3px',
						}}
					/>
				</Box>
				<Box sx={{ width: '100%', ...modalContentStyles }}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						{title}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{msg}
					</Typography>
					{secondaryMsg && (
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							{secondaryMsg}
						</Typography>
					)}

					<Box
						sx={{
							display: 'flex',
							marginTop: '20px',
							justifyContent: 'end',
						}}
					>
						<Button
							title={cancelTxt}
							clickAction={onCancel}
							variant="outlined"
							styles={{ marginRight: '10px', ...cancelBtnStyles }}
						/>
						<Button
							title={confirmTxt}
							clickAction={onConfirm}
							btnType={isDestructive ? 'error' : 'success'}
							styles={{ ...confirmBtnStyles }}
						/>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
export default AlertModal;
