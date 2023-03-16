import uniqid from 'uniqid';
import { Box } from '@mui/material';
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
	const containerStyle = isVertical
		? { height: '100vh', overflowY: 'scroll' }
		: { width: '100vw', overflowX: 'scroll', whiteSpace: 'nowrap' };

	const spacerStyle = isVertical
		? { height: `${startIndex * itemSize}px` }
		: { width: `${startIndex * itemSize}px`, display: 'inline-block' };

	const itemStyle = isVertical
		? { marginBottom: '10px' }
		: { height: '100%', display: 'inline-block', verticalAlign: 'top', marginLeft: '10px' };

	const scrollStyle = isVertical
		? { height: `${(itemCount - endIndex) * itemSize}px` }
		: { width: `${(itemCount - endIndex) * itemSize}px`, height: `${itemSize}px` };

	return (
		// @ts-ignore
		<Box ref={listRef} sx={containerStyle} onScroll={handleScroll}>
			<Box sx={spacerStyle} />
			{visibleItems.map(item => (
				<Box key={uniqid()} style={itemStyle}>
					{renderItem(item)}
				</Box>
			))}
			<Box style={scrollStyle} />
		</Box>
	);
};

export default VirtualizedList;
