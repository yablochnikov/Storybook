import React, { FC, useEffect, useRef, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import MultipleDropdownItem from './MultipleDropdownItem';

export interface IDropdownItem {
	id: number;
	value: string | JSX.Element | JSX.Element[];
	onClick?: () => void;
	dropdownItems?: IDropdownItem[];
}

interface IMultiDropdownProps {
	placeholder: string;
	icon: JSX.Element;
	isExpanded?: boolean;
	disabled?: boolean;
	items?: IDropdownItem[];
	dropdownStylesRoot?: {};
	position?: string;
	children?: JSX.Element | JSX.Element[] | string;
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
}) => {
	const theme = useTheme();
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
				width: '100%',
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
					backgroundColor: theme.palette.background.paper,
					color: theme.palette.text.primary,
				}}
				expandIcon={icon}
			>
				<Typography>{placeholder}</Typography>
			</AccordionSummary>

			<AccordionDetails
				sx={{
					position: 'absolute',
					visibility: 'visible',
					padding: '0',
					left: 0,
					width: '100%',
					maxHeight: isOpen ? '300px' : 0,
					overflow: 'auto',
					borderRadius: '0 0 5px 5px',
					opacity: 1,
					transition: 'max-height 0.3s ease, opacity 0.3s ease',
					boxShadow:
						'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
					zIndex: 1,
					bottom: position === 'reversed' ? ` ${dropdownHeight}px` : 'auto',
					top: position === 'default' ? ` ${dropdownHeight}px` : 'auto',
					'::-webkit-scrollbar': {
						width: '20px',
					},
					'::-webkit-scrollbar-track': {
						background: '#f1f1f1',
					},
					'::-webkit-scrollbar-thumb': {
						borderRadius: '20px',
						backgroundColor: '#d6dee1',
						border: '6px solid transparent',
						backgroundClip: 'content-box',
					},
				}}
			>
				<Box
					sx={{
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
						overflowY: 'scroll',
					}}
				>
					{items && !children ? (
						items.map((item, index) =>
							item.dropdownItems ? (
								<MultipleDropdownItem {...item} index={index} key={item.id} position={position} />
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
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};
