import { FC, useEffect, useRef, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import MultipleDropdownItem from './MultipleDropdownItem';
import './MultiDropdown.css';

export interface IDropdownItem {
	id: number;
	value: string | JSX.Element | JSX.Element[];
	onClick: () => void;
	dropdownItems: IDropdownItem[];
}

interface IMultiDropdownProps {
	placeholder?: string;
	icon?: JSX.Element;
	isExpanded?: boolean;
	disabled?: boolean;
	// expanded?: boolean;
	items?: IDropdownItem[];
	dropdownStyles?: {};
	position?: string;
	children?: JSX.Element | JSX.Element[] | string;
}

export const MultiDropdown: FC<IMultiDropdownProps> = ({
	placeholder,
	items,
	icon,
	isExpanded,
	disabled,
	dropdownStyles,
	position,
	children,
}) => {
	const refDropdown = useRef<HTMLDivElement>(null);
	const [dropdownHeight, setDropdownHeight] = useState(0);

	useEffect(() => {
		setDropdownHeight(refDropdown?.current ? refDropdown.current.clientHeight : 0);
	}, []);

	return (
		<Accordion
			disabled={disabled}
			className="FiveUi__dropdown-root"
			defaultExpanded={isExpanded}
			ref={refDropdown}
			sx={{
				flexDirection: 'column-reverse',
				'& .MuiAccordion-root, .MuiAccordionSummary-root': {
					...dropdownStyles,
				},
			}}
			disableGutters
		>
			<AccordionSummary
				sx={{
					'& .FiveUi__dropdown-icon': {
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
					top: position === 'default' ? ` ${dropdownHeight}px` : 'auto',
					bottom: position === 'reversed' ? ` ${dropdownHeight}px` : 'auto',
				}}
				className="FiveUi__dropdown-items"
			>
				{!items
					? children
					: items.map((item, index) =>
							item.dropdownItems ? (
								<MultipleDropdownItem {...item} index={index} key={item.id} position={position} />
							) : (
								<Accordion expanded={isExpanded} key={item.id}>
									<AccordionSummary onClick={item.onClick}>
										<Typography>{item.value}</Typography>
									</AccordionSummary>
								</Accordion>
							)
					  )}
			</AccordionDetails>
		</Accordion>
	);
};
