import { useState } from 'react';

interface PaginationOptions<T> {
	items: T[];
	itemsPerPage: number;
}

interface Pagination<T> {
	displayedItems: T[];
	changePage: (event: React.ChangeEvent<unknown>, page: number) => void;
	currentPage: number;
	totalPages: number;
}

export function usePagination<T>(options: PaginationOptions<T>): Pagination<T> {
	const [currentPage, setCurrentPage] = useState(1);
	const { items, itemsPerPage } = options;
	const totalPages = Math.ceil(items.length / itemsPerPage);

	const changePage = (event: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	const displayedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	return {
		displayedItems,
		changePage,
		currentPage,
		totalPages,
	};
}
