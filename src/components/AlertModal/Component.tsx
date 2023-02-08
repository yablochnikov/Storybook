import React from 'react';
import AlertModal from './AlertModal';
import { Button } from '../Button/Button';

export const Component = () => {
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleConfirm = () => {
		console.log('Confirmed!');
	};

	return (
		<div>
			<Button clickAction={handleClick} title="open modal" />
			<AlertModal
				closeModal={handleClose}
				showModal={open}
				title="Alert modal"
				confirmTxt="Confirm"
				cancelTxt="Cancel"
				onCancel={handleCancel}
				onConfirm={handleConfirm}
				msg="Some text"
				secondaryMsg="Some more text"
			/>
		</div>
	);
};
