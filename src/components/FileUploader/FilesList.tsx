import React, { FC, ReactElement } from 'react';
import { Clear } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@emotion/react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import { File } from '../../core/models/fileUploader';
import './FilesList.css';
import { cutFileName } from '../../core/helpers/FileUploader';

interface FilesListProps {
	files: File[];
	title?: string | ReactElement;
	handleRemove: (index: number) => void;
	handleRemoveAll: () => void;
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
	const theme = useTheme();

	return (
		<Box
			sx={{
				backgroundColor: theme.palette.background.paper,
				borderRadius: '10px',
				width: '100%',
				marginTop: '20px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					borderRadius: '10px 10px 0 0',
					display: 'flex',
					justifyContent: 'space-between',
					padding: theme.spacing(3),
					width: '100%',
					alignItems: 'center',
					backgroundColor: theme.palette.primary.main,
				}}
			>
				<Typography
					sx={{
						color: theme.palette.primary.contrastText,
						fontWeight: theme.typography.fontWeightBold,
					}}
				>
					{title}
				</Typography>
				<Typography
					onClick={handleRemoveAll}
					sx={{
						'&:hover': {
							backgroundColor: theme.palette.primary.main,
							color: theme.palette.primary.contrastText,
						},
						color: theme.palette.primary.contrastText,
						cursor: 'pointer',
						fontWeight: theme.typography.fontWeightBold,
						padding: theme.spacing(2),
						textTransform: 'none',
					}}
				>
					{removeButtonLabel}
				</Typography>
			</Box>
			<List
				sx={{
					width: '100%',
					maxHeight: '500px',
					overflow: 'auto',
					backgroundColor: theme.palette.background.paper,
				}}
			>
				{files.map((file, index) => (
					<ListItem
						key={file.name}
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<ListItemIcon
							sx={{
								color: theme.palette.info.main,
							}}
						>
							{getFileExtension && getFileExtension(file.name)}
						</ListItemIcon>
						<ListItemText
							primary={cutFileName(file.name)}
							secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
							sx={{ color: theme.palette.text.secondary }}
							primaryTypographyProps={{ color: theme.palette.text.primary }}
						/>

						{file.status === 'uploaded' && (
							<Tooltip title={`Status: ${file.status}`}>
								<CheckIcon sx={{ color: theme.palette.success.main, minWidth: '56px' }} />
							</Tooltip>
						)}
						<Clear
							onClick={() => handleRemove(index)}
							sx={{
								cursor: 'pointer',
								color: theme.palette.error.main,
								'&:hover': {
									color: 'error',
								},
							}}
						/>
					</ListItem>
				))}
			</List>
			<Button onClick={submitButtonCallback} sx={{ margin: '5px' }}>
				Submit
			</Button>
		</Box>
	);
};

export default FilesList;
