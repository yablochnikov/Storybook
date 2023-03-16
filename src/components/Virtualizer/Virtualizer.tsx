import uniqid from 'uniqid';
import { Box, SxProps } from '@mui/material';
import useVirtualizedList from '../../hooks/useVirtualList';
import { VirtualizedListProps } from '../../core/models/virtualizer';

const VirtualizedList = <T,>({ items, itemSize, renderItem, overScan = 10, type }: VirtualizedListProps<T>) => {
	const { listRef, itemCount, startIndex, endIndex, handleScroll } = useVirtualizedList({
		items,
		itemSize,
		renderItem,
		overScan,
		type,
	});

	const isVertical = type === 'vertical';

	const visibleItems = items.slice(startIndex, endIndex);
	const containerStyle: SxProps = isVertical
		? { height: '100vh', overflowY: 'scroll' }
		: { width: '100vw', overflowX: 'scroll', whiteSpace: 'nowrap' };

	const spacerStyle: SxProps = isVertical
		? { height: `${startIndex * itemSize}px` }
		: { width: `${startIndex * itemSize}px`, display: 'inline-block' };

	const itemStyle: SxProps = isVertical
		? { marginBottom: '10px' }
		: { height: '100%', display: 'inline-block', verticalAlign: 'top', marginLeft: '10px' };

	const scrollStyle: SxProps = isVertical
		? { height: `${(itemCount - endIndex) * itemSize}px` }
		: { width: `${(itemCount - endIndex) * itemSize}px`, height: `${itemSize}px` };

	return (
		<Box ref={listRef} sx={containerStyle} onScroll={handleScroll}>
			<Box sx={spacerStyle} />
			{visibleItems.map(item => (
				<Box key={uniqid()} sx={itemStyle}>
					{renderItem(item)}
				</Box>
			))}
			<Box sx={scrollStyle} />
		</Box>
	);
};

export default VirtualizedList;
