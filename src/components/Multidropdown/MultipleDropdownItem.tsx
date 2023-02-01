import React, { FC, SyntheticEvent, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IDropdownItem } from './MultiDropdown';

interface IMultipleDropdownItem {
	dropdownItems: IDropdownItem[];
	id: number;
	value: string | JSX.Element | JSX.Element[];
	index: number;
	position?: string;
}

const MultipleDropdownItem: FC<IMultipleDropdownItem> = ({ dropdownItems, id, value, index, position }) => {
	const [expanded, setExpanded] = useState<string | false>(false);

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	return (
		<Accordion
			expanded={expanded === `panel${index}`}
			onChange={handleChange(`panel${index}`)}
			key={id}
			disableGutters
		>
			<AccordionSummary
				className="FiveUi__dropdown-summary"
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`panel${index}bh-content`}
				id={`panel${index}bh-header`}
			>
				<Typography>{value}</Typography>
			</AccordionSummary>
			<AccordionDetails
				sx={{
					backgroundColor: 'inherit',
					padding: '0',
				}}
			>
				{dropdownItems &&
					dropdownItems.map((subItem: IDropdownItem, index) =>
						subItem.dropdownItems ? (
							<MultipleDropdownItem {...subItem} index={index} key={subItem.id} />
						) : (
							<AccordionDetails onClick={subItem.onClick} key={subItem.id} sx={{ cursor: 'pointer' }}>
								<Typography>{subItem.value}</Typography>
							</AccordionDetails>
						)
					)}
			</AccordionDetails>
		</Accordion>
	);
};

export default MultipleDropdownItem;
