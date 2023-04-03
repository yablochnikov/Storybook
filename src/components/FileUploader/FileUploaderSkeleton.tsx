import React from 'react';
import { Box, Skeleton } from '@mui/material';

const FileUploaderSkeleton = () => {
	return (
		<Box>
			<Skeleton variant="rounded" width="100%" height={196} />
		</Box>
	);
};

export default FileUploaderSkeleton;
