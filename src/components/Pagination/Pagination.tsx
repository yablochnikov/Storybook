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
import PaginationSkeleton from './PaginationSkeleton';
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
	isSkeleton?: boolean;
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
	isSkeleton,
}: PaginationProps<T>) => {
	const { displayedItems, changePage, currentPage, totalPages } = usePagination({
		items,
		itemsPerPage,
	});

	if (isSkeleton) {
		return (
			<>
				<PaginationSkeleton itemsPerPage={itemsPerPage} itemsWrapperStyles={itemsWrapperStyles} />
				<MuiPagination
					sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px', ...sx }}
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
	}

	return (
		<>
			<Box sx={itemsWrapperStyles}>{displayedItems.map(item => renderItem(item))}</Box>
			<MuiPagination
				sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px', ...sx }}
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
