import { Box, Pagination as MuiPagination } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import {
	PaginationPropsColorOverrides,
	PaginationPropsSizeOverrides,
	PaginationPropsVariantOverrides,
} from '@mui/material/Pagination/Pagination';

import { usePagination } from '../../hooks/usePagination';

export interface PaginationProps<T> {
	items: T[];
	renderItem: (item: T) => React.ReactNode;
	itemsPerPage?: number;
	color?: OverridableStringUnion<'primary' | 'secondary' | 'standard', PaginationPropsColorOverrides>;
	getItemAriaLabel?: (
		type: 'page' | 'first' | 'last' | 'next' | 'previous',
		page: number,
		selected: boolean
	) => string;
	shape?: 'circular' | 'rounded';
	size?: OverridableStringUnion<'small' | 'medium' | 'large', PaginationPropsSizeOverrides>;
	sx?: SxProps<Theme>;
	itemsWrapperStyles?: SxProps<Theme>;
	variant?: OverridableStringUnion<'text' | 'outlined', PaginationPropsVariantOverrides>;
}

const Pagination = <T,>({
	items,
	renderItem,
	itemsPerPage = 10,
	color = 'primary',
	getItemAriaLabel,
	size,
	shape,
	variant,
	sx,
	itemsWrapperStyles,
}: PaginationProps<T>) => {
	const { displayedItems, changePage, currentPage, totalPages } = usePagination({
		items,
		itemsPerPage,
	});
	return (
		<>
			<Box sx={itemsWrapperStyles}>{displayedItems.map(item => renderItem(item))}</Box>
			<MuiPagination
				sx={{ display: 'flex', justifyContent: 'center', ...sx }}
				count={totalPages}
				page={currentPage}
				onChange={changePage}
				color={color}
				size={size}
				shape={shape}
				variant={variant}
				getItemAriaLabel={getItemAriaLabel}
			/>
		</>
	);
};

export default Pagination;
