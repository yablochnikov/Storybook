import { ChangeEvent, DragEvent, FC, ReactElement, useRef, useState } from 'react';
import { useTheme } from '@mui/system';
import { Box, Grid, SxProps, Typography } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import { File } from '../../core/models/fileUploader';
import FilesList from './FilesList';
import { getFileExtension } from '../../core/helpers/FileUploader';
import FileUploaderSkeleton from './FileUploaderSkeleton';

interface FileUploaderProps {
	title: string | ReactElement;
	listTitle: string | ReactElement;
	removeButtonLabel: string;
	submitButtonCallback: () => void;
	uploaderRootStyles: SxProps;
	dragDropContainerStyles: SxProps;
	uploaderTitleStyles: SxProps;
	isSkeleton?: boolean;
}

const FileUploader: FC<FileUploaderProps> = ({
	title,
	listTitle,
	removeButtonLabel,
	submitButtonCallback,
	uploaderRootStyles,
	dragDropContainerStyles,
	uploaderTitleStyles,
	isSkeleton = false,
}) => {
	const theme: any = useTheme();
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
			status: 'uploaded',
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

	if (isSkeleton) {
		return <FileUploaderSkeleton />;
	}

	return (
		<Box sx={{ flexGrow: 1, ...uploaderRootStyles }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							border: `2px dashed ${theme.palette.primary.main}`,
							backgroundColor: theme.palette.background.default,
							borderRadius: 5,
							cursor: 'pointer',
							height: '200px',
							width: '100%',
							...dragDropContainerStyles,
						}}
					>
						<Box
							onDrop={handleDrop}
							onDragOver={event => event.preventDefault()}
							onClick={handleDragDropClick}
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
								width: '100%',
								height: '100%',
							}}
						>
							<input
								ref={fileInputRef}
								type="file"
								multiple
								onChange={handleFileSelect}
								style={{ display: 'none' }}
							/>
							<FileUpload
								sx={{
									color: theme.palette.primary.main,
									width: '36px',
									height: '36px',
								}}
							/>
							<Typography
								sx={{
									color: theme.palette.text.primary,
									fontWeight: theme.typography.fontWeightBold,
									...uploaderTitleStyles,
								}}
							>
								{title}
							</Typography>
						</Box>
					</Box>
				</Grid>
				{files.length > 0 && (
					<Grid item xs={12}>
						<FilesList
							files={files}
							handleRemove={handleRemove}
							handleRemoveAll={handleRemoveAll}
							getFileExtension={getFileExtension}
							removeButtonLabel={removeButtonLabel}
							title={listTitle}
							submitButtonCallback={submitButtonCallback}
						/>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};

export default FileUploader;
