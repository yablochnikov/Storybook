import { ChangeEvent, DragEvent, ReactElement, useState } from 'react';
import './FileUploader.css';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

interface File {
	// eslint-disable-next-line no-restricted-globals
	name: string;
	type: string;
	size: number;
	// eslint-disable-next-line no-restricted-globals
	status: string;
}

const FileUploader = () => {
	const [files, setFiles] = useState<File[]>([]);

	function handleDrop(event: DragEvent<HTMLDivElement>) {
		event.preventDefault();
		const newFiles = [...files];

		// @ts-ignore // eslint-disable-next-line no-restricted-syntax
		// eslint-disable-next-line no-restricted-syntax
		for (const file of event.dataTransfer.files) {
			newFiles.push({
				name: file.name,
				type: file.type,
				size: file.size,
				status: 'Uploaded',
			});
		}

		setFiles(newFiles);
	}

	function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
		const newFiles = [...files];
		// @ts-ignore // eslint-disable-next-line no-restricted-syntax
		// eslint-disable-next-line no-restricted-syntax
		for (const file of event.target.files as FileList) {
			newFiles.push({
				name: file.name,
				type: file.type,
				size: file.size,
				status: 'Uploaded',
			});
		}

		setFiles(newFiles);
	}

	function handleRemove(index: number) {
		const newFiles = [...files];
		newFiles.splice(index, 1);
		setFiles(newFiles);
	}

	function handleRemoveAll() {
		setFiles([]);
	}

	function getFileExtension(filename: string): ReactElement {
		switch (filename.split('.').pop() || '') {
			case 'pdf':
				return <PictureAsPdfIcon />;
			case 'doc':
				return <ArticleIcon />;
			case 'docx':
				return <ArticleIcon />;
			case 'txt':
				return <ArticleIcon />;
			case 'rtf':
				return <ArticleIcon />;
			case 'xlsx':
				return <ArticleIcon />;
			case 'jpg':
				return <ImageIcon />;
			case 'png':
				return <ImageIcon />;
			case 'jpeg':
				return <ImageIcon />;
			case 'mov':
				return <VideoFileIcon />;
			default:
				return <AttachmentIcon />;
		}
	}

	return (
		<Box className="uploader">
			<div className="drag-drop-container">
				<div
					className="drag-drop"
					onDrop={handleDrop}
					onDragOver={event => event.preventDefault()}
					onClick={() => (document.querySelector('#file-input') as HTMLInputElement).click()}
				>
					<input
						id="file-input"
						type="file"
						multiple
						style={{ display: 'none' }}
						onChange={handleFileSelect}
					/>
					<FileUploadIcon
						sx={{
							color: '#93B0B3',
							width: '36px',
							height: '36px',
						}}
					/>
					<p>
						<span>Choose a file</span> or drag it here.
					</p>
				</div>
			</div>
			{files.length > 0 && (
				<div className="files__list">
					<div className="files__header">
						<h3>Files</h3>
						<button type="button" className="remove-all" onClick={handleRemoveAll}>
							Remove All
						</button>
					</div>
					<ul>
						{files.map((file, index) => (
							<li key={file.name} className="files__item">
								<div className="file__data">
									<div className="file__icon">{getFileExtension(file.name)}</div>
									<span className="file__name">{file.name}</span>
								</div>
								<div className="file__controls">
									<DeleteIcon
										onClick={() => handleRemove(index)}
										sx={{
											cursor: 'pointer',
										}}
									/>
									<span className="file__status">{file.status}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</Box>
	);
};

export default FileUploader;
