import { CSSProperties, FC, useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Button } from '../Button/Button';
import './GlobalCssGenericModal.css';

interface IModalProps {
	title: string;
	children: JSX.Element;
	primaryBtnTxt?: string;
	primaryBtnClick?: () => void;
	secondaryBtnTxt?: string;
	secondaryBtnClick?: () => void;
	showTertiaryBtn?: boolean;
	tertiaryBtnTxt?: string;
	tertiaryBtnClick?: () => void;
	titleStyles?: CSSProperties;
	contentStyles?: CSSProperties;
	showButtonsSection?: boolean;
}

const headerSlyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
};

const footerStyle = {
	display: 'grid',
	gridTemplateColumns: '3fr auto',
	justifyItems: 'flex-start',
};

const mainButtonsAreaStyle = {
	display: 'flex',
	gap: '10px',
	justifySelf: 'end',
};

export const GenericModal: FC<IModalProps> = ({
	title,
	children,
	primaryBtnTxt = 'Save',
	primaryBtnClick,
	secondaryBtnTxt = 'Reset',
	secondaryBtnClick,
	showTertiaryBtn = true,
	tertiaryBtnTxt = 'Cancel',
	tertiaryBtnClick,
	titleStyles,
	contentStyles,
	showButtonsSection = true,
}) => {
	const [open, setIsOpen] = useState(false);
	const handleClose = () => setIsOpen(false);

	return (
		<>
			<Button title="Open Modal" clickAction={() => setIsOpen(true)} btnType="primary" />
			<Dialog open={open}>
				<Box sx={headerSlyle}>
					<DialogTitle sx={titleStyles}>{title}</DialogTitle>
					<Button icon={<Close />} variant="text" clickAction={handleClose} />
				</Box>

				<DialogContent sx={contentStyles}>{children}</DialogContent>

				{showButtonsSection && (
					<Box sx={footerStyle}>
						{showTertiaryBtn && (
							<Button title={tertiaryBtnTxt} variant="text" clickAction={tertiaryBtnClick} />
						)}
						<Box sx={mainButtonsAreaStyle}>
							<Button
								title={secondaryBtnTxt}
								variant="outlined"
								clickAction={secondaryBtnClick}
								type="reset"
							/>
							<Button title={primaryBtnTxt} clickAction={primaryBtnClick} type="submit" />
						</Box>
					</Box>
				)}
			</Dialog>
		</>
	);
};
