import { useRef, useEffect } from 'react';

export const useScroll = (selectedRoom: string | null) => {
	const refScroll = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (refScroll.current && selectedRoom) {
			setTimeout(() => {
				refScroll.current?.scrollTo(0, refScroll.current.scrollHeight);
			}, 0);
		}
	}, [selectedRoom, refScroll]);
	return { refScroll };
};
