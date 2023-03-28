import { FC } from 'react';
import { Box, Skeleton } from '@mui/material';
import { SxProps } from '@mui/system';

interface MultiDropdownSkeletonProps {
	styles?: SxProps;
}

const MultiDropdownSkeleton: FC<MultiDropdownSkeletonProps> = ({ styles }) => {
	return (
		<Box>
			<Skeleton variant="rounded" width="100%" height={48} sx={{ ...styles }} />
		</Box>
	);
};

export default MultiDropdownSkeleton;
