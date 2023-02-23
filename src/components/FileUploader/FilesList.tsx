import React, { FC, ReactElement } from 'react';
import { Delete } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { cutFileName } from '../../core/helpers/FileUploader';
import { File } from '../../core/models/fileUploader';
import './FilesList.css';

interface FilesListProps {
	files: File[];
	title?: string | ReactElement;
	handleRemove?: (index: number) => void;
	handleRemoveAll?: () => void;
	getFileExtension?: (fileName: string) => ReactElement;
	removeButtonLabel?: string;
	submitButtonCallback?: () => void;
}

const FilesList: FC<FilesListProps> = ({
	files,
	title,
	handleRemove,
	handleRemoveAll,
	getFileExtension,
	removeButtonLabel,
	submitButtonCallback,
}) => {
	return (
		<Box className="files__list">
			<Box className="files__header">
				<Typography>{title}</Typography>
				<Button
					type="button"
					className="remove-all"
					onClick={handleRemoveAll}
					variant="text"
					sx={{
						backgroundColor: '#286CCC',
						color: '#fff',
						textTransform: 'none',
						fontWeight: 600,
					}}
				>
					{removeButtonLabel}
				</Button>
			</Box>
			<ul>
				{files.map((file, index) => (
					<li key={file.name} className="files__item">
						<div className="file__data">
							<div className="file__icon">{getFileExtension && getFileExtension(file.name)}</div>
							<span className="file__name">{cutFileName(file.name)}</span>
						</div>
						<div className="file__controls">
							<Delete
								onClick={() => handleRemove && handleRemove(index)}
								sx={{
									cursor: 'pointer',
								}}
							/>
							<span className="file__status">{file.status}</span>
						</div>
					</li>
				))}
			</ul>
			<Button onClick={submitButtonCallback} sx={{ margin: '5px' }}>
				Submit
			</Button>
		</Box>
	);
};

export default FilesList;
