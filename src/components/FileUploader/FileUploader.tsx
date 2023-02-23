import { ChangeEvent, DragEvent, FC, ReactElement, useRef, useState } from 'react';
import './FileUploader.css';
import { Box, SxProps, Typography } from '@mui/material';
import { FileUpload } from '@mui/icons-material';

import { File } from '../../core/models/fileUploader';
import FilesList from './FilesList';

import { getFileExtension } from '../../core/helpers/FileUploader';

interface FileUploaderProps {
	title: string | ReactElement;
	listTitle: string | ReactElement;
	removeButtonLabel: string;
	submitButtonCallback: () => void;
	uploaderRootStyles: SxProps;
	dragDropContainerStyles: SxProps;
	uploaderTitleStyles: SxProps;
}

const FileUploader: FC<FileUploaderProps> = ({
	title,
	listTitle,
	removeButtonLabel,
	submitButtonCallback,
	uploaderRootStyles,
	dragDropContainerStyles,
	uploaderTitleStyles,
}) => {
	const [files, setFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDragDropClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFiles = (files: FileList | null) => {
		if (!files) {
			return;
		}

		const newFiles = Array.from(files).map(file => ({
			name: file.name,
			type: file.type,
			size: file.size,
			status: 'Uploaded',
		}));

		setFiles(prevFiles => [...prevFiles, ...newFiles]);
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		handleFiles(event.dataTransfer.files);
	};

	const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
		handleFiles(event.target.files);
	};

	const handleRemove = (index: number) => {
		setFiles(files.filter((_file, i) => i !== index));
	};

	const handleRemoveAll = () => {
		setFiles([]);
	};

	return (
		<Box className="uploader" sx={{ ...uploaderRootStyles }}>
			<Box className="drag-drop-container" sx={{ ...dragDropContainerStyles }}>
				<div
					className="drag-drop"
					onDrop={handleDrop}
					onDragOver={event => event.preventDefault()}
					onClick={handleDragDropClick}
				>
					<input ref={fileInputRef} id="file__input" type="file" multiple onChange={handleFileSelect} />
					<FileUpload
						sx={{
							color: '#93B0B3',
							width: '36px',
							height: '36px',
						}}
					/>
					<Typography sx={{ ...uploaderTitleStyles }}>{title}</Typography>
				</div>
			</Box>
			{files.length > 0 && (
				<FilesList
					files={files}
					handleRemove={handleRemove}
					handleRemoveAll={handleRemoveAll}
					getFileExtension={getFileExtension}
					removeButtonLabel={removeButtonLabel}
					title={listTitle}
					submitButtonCallback={submitButtonCallback}
				/>
			)}
		</Box>
	);
};

export default FileUploader;
