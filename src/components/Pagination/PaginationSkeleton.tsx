import * as React from 'react';
import { FC } from 'react';
import { Box, Skeleton } from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

interface IPaginationSkeleton {
	itemsWrapperStyles?: SxProps<Theme>;
	itemsPerPage?: number;
	width?: string;
	height?: string;
}

const PaginationSkeleton: FC<IPaginationSkeleton> = ({ width, height, itemsWrapperStyles, itemsPerPage }) => {
	return (
		<Box>
			<Box sx={itemsWrapperStyles}>
				{[...Array(itemsPerPage)].map(el => (
					<Skeleton key={el} width={width} height={height} variant="text" />
				))}
			</Box>
		</Box>
	);
};

export default PaginationSkeleton;
