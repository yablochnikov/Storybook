export interface VirtualizedListProps<T> {
	items: T[];
	itemSize: number; // if you choose type vertical you should pass item height/ if horizontal - pass item width
	renderItem: (item: T) => React.ReactNode;
	overScan?: number; // how many extra items to render above and below the visible area for smoother scrolling
	type?: 'vertical' | 'horizontal';
}
