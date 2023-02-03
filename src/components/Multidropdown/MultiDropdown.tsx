import React, { FC, useEffect, useRef, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, Collapse } from '@mui/material';
import MultipleDropdownItem from './MultipleDropdownItem';

export interface IDropdownItem {
	id: number;
	value: string | JSX.Element | JSX.Element[];
	onClick?: () => void;
	dropdownItems?: IDropdownItem[];
}

interface IMultiDropdownProps {
	placeholder?: string;
	icon?: JSX.Element;
	isExpanded?: boolean;
	disabled?: boolean;
	// expanded?: boolean;
	items?: IDropdownItem[];
	dropdownStylesRoot?: {};
	position?: string;
	children?: JSX.Element | JSX.Element[] | string;
	animationDuration?: number;
	dropdownStylesItems?: {};
}

export const MultiDropdown: FC<IMultiDropdownProps> = ({
	placeholder,
	items,
	icon,
	isExpanded,
	disabled,
	dropdownStylesRoot,
	position,
	children,
	animationDuration,
}) => {
	const refDropdown = useRef<HTMLDivElement>(null);
	const [dropdownHeight, setDropdownHeight] = useState(0);
	const [isOpen, setOpen] = useState(false);

	useEffect(() => {
		if (isExpanded) setOpen(true);
		if (disabled) setOpen(false);
		setDropdownHeight(refDropdown?.current ? refDropdown.current.clientHeight - 5 : 0);
	}, [isExpanded, disabled]);

	const handleClick = () => {
		setOpen(isOpen => !isOpen);
	};

	return (
		<Accordion
			disabled={disabled}
			defaultExpanded={isExpanded}
			ref={refDropdown}
			sx={{
				position: 'relative',
				...dropdownStylesRoot,
			}}
			disableGutters
		>
			<AccordionSummary
				onClick={handleClick}
				sx={{
					'& .MuiSvgIcon-root': {
						transform: position === 'reversed' ? 'rotate(180deg)' : '',
					},
				}}
				expandIcon={icon}
			>
				<Typography>{placeholder}</Typography>
			</AccordionSummary>

			<AccordionDetails
				sx={{
					padding: '0',
				}}
			>
				<Collapse
					in={isOpen}
					sx={{
						position: 'absolute',
						width: '100%',
						visibility: 'visible',
						zIndex: isOpen ? '1' : '-1',
						bottom: position === 'reversed' ? ` ${dropdownHeight}px` : 'auto',
						top: position === 'default' ? ` ${dropdownHeight}px` : 'auto',
					}}
					collapsedSize={0}
					{...(isOpen ? { timeout: animationDuration } : {})}
				>
					{items && !children ? (
						items.map((item, index) =>
							item.dropdownItems ? (
								<MultipleDropdownItem
									{...item}
									index={index}
									key={item.id}
									position={position}
									dropdownStylesItems
								/>
							) : (
								<Accordion key={item.id} disableGutters>
									<AccordionSummary onClick={item.onClick}>
										<Typography>{item.value}</Typography>
									</AccordionSummary>
								</Accordion>
							)
						)
					) : (
						<Accordion disableGutters>
							<AccordionSummary>{children && children}</AccordionSummary>
						</Accordion>
					)}
				</Collapse>
			</AccordionDetails>
		</Accordion>
	);
};
