import { ReactElement } from 'react';
import { Article, Attachment, Image, PictureAsPdf, VideoFile } from '@mui/icons-material';

export const getFileExtension = (filename: string): ReactElement => {
	switch (filename.split('.').pop() || '') {
		case 'pdf':
			return <PictureAsPdf />;
		case 'doc':
			return <Article />;
		case 'docx':
			return <Article />;
		case 'txt':
			return <Article />;
		case 'rtf':
			return <Article />;
		case 'xlsx':
			return <Article />;
		case 'jpg':
			return <Image />;
		case 'png':
			return <Image />;
		case 'jpeg':
			return <Image />;
		case 'mov':
			return <VideoFile />;
		default:
			return <Attachment />;
	}
};

export const cutFileName = (fileName: string) => {
	if (fileName.length > 20) {
		return `${fileName.substring(0, 20)}...`;
	}
	return fileName;
};
