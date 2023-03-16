import { useCallback, useEffect, useRef, useState } from 'react';
import { VirtualizedListProps } from '../core/models/virtualizer';

const useVirtualizedList = <T>({ items, itemSize, renderItem, overScan = 10, type }: VirtualizedListProps<T>) => {
	const listRef = useRef<HTMLDivElement>(null); // ref to list wrapper
	const [startIndex, setStartIndex] = useState(0); // first visible item
	const [endIndex, setEndIndex] = useState(0); // last visible item

	const itemCount = items.length; // total number of items.
	const visibleItemCount = Math.ceil(
		type === 'vertical' ? window.innerHeight / itemSize : window.innerWidth / itemSize
	); // how many items will be visible

	const updateVisibleItems = useCallback(() => {
		if (!listRef.current) {
			return; // if no ref - return
		}

		const scrollOffset = type === 'vertical' ? listRef.current.scrollTop : listRef.current.scrollLeft;

		const startIndex = Math.max(0, Math.floor(scrollOffset / itemSize) - overScan); // calculate the index of the first visible item in the list based on the current scroll position of the list
		const endIndex = Math.min(itemCount, startIndex + visibleItemCount + overScan * 2); // calculate the index of the last visible item in the list based on the current scroll position of the list
		setStartIndex(startIndex);
		setEndIndex(endIndex);
	}, [itemCount, itemSize, overScan, visibleItemCount, type]);

	useEffect(() => {
		updateVisibleItems();
	}, [updateVisibleItems]);

	const handleScroll = useCallback(() => {
		updateVisibleItems();
	}, [updateVisibleItems]);

	return {
		listRef,
		itemCount,
		startIndex,
		endIndex,
		renderItem,
		handleScroll,
		type,
	};
};

export default useVirtualizedList;
