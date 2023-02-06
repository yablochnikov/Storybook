import React, { FC, useEffect, useRef, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, keyframes } from '@mui/material';
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
	// expanded?: boolean;
	items?: IDropdownItem[];
	dropdownStylesRoot?: {};
	position?: string;
	children?: JSX.Element | JSX.Element[] | string;
	animationDuration?: number;
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

	const animationIn = keyframes`
    0% {
          opacity: 0;
          transform: translateY(-10px);
        }
    100% {
            opacity: 1;
            transform: translateY(0);
          }
    
	`;

	const animationOut = keyframes`
    0% {
          opacity: 1;
          transform: translateY(0);
        }
    100% {
            opacity: 0;
            transform: translateY(-10px);
          }
    
	`;

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
					opacity: 1,
					height: 'max-content',
					animation: isOpen ? `${animationIn} 0.1s ease-in` : `${animationOut} 0.1s ease-out`,
					position: 'absolute',
					width: '100%',
					zIndex: isOpen ? '1' : '-1',
					bottom: position === 'reversed' ? ` ${dropdownHeight}px` : 'auto',
					top: position === 'default' ? ` ${dropdownHeight}px` : 'auto',
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
			</AccordionDetails>
		</Accordion>
	);
};
