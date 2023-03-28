import React from 'react';
import { Box, Skeleton } from '@mui/material';

const CalendarSkeleton = () => {
	return (
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Skeleton variant="rectangular" width="15%" height={40} />
				<Skeleton variant="rectangular" width="25%" height={40} />
				<Skeleton variant="rectangular" width="15%" height={40} />
			</Box>

			<Box sx={{ marginTop: '10px' }}>
				<Skeleton variant="rectangular" width="100%" height={750} />
			</Box>
		</Box>
	);
};

export default CalendarSkeleton;
