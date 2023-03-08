import React, { FC, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import './Calendar.css';
import { useTheme } from '@mui/system';

interface CustomCalendarProps {
	displayWeekends: boolean;
	selectable: boolean;
	editable: boolean;
}

type Event = {
	id: string;
	title: string;
	start: Date;
	end?: Date;
	allDay?: boolean;
};

const Calendar: FC<CustomCalendarProps> = ({ displayWeekends, selectable, editable }) => {
	const [events, setEvents] = useState<Event[]>([
		{
			id: '1',
			title: 'Event 1',
			start: new Date(),
			end: new Date(),
			allDay: true,
		},
	]);
	const theme: any = useTheme();

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [dialogTitle, setDialogTitle] = useState<string>('');
	const [dialogContent, setDialogContent] = useState<string>('');
	const [dialogStart, setDialogStart] = useState<Date | null>(null);
	const [dialogEnd, setDialogEnd] = useState<Date | null>(null);
	const [dialogAllDay, setDialogAllDay] = useState<boolean>(false);
	const [dialogId, setDialogId] = useState<string | null>(null);

	const handleSelect = (arg: DateSelectArg) => {
		setDialogTitle('Add Event');
		setDialogContent('');
		setDialogStart(arg.start);
		setDialogEnd(arg.end);
		setDialogAllDay(arg.allDay);
		setDialogId(null);
		setDialogOpen(true);
	};

	const handleEventClick = (arg: EventClickArg) => {
		setDialogTitle('Edit Event');
		setDialogContent(arg.event.title);
		setDialogStart(arg.event.start);
		setDialogEnd(arg.event.end);
		setDialogAllDay(arg.event.allDay);
		setDialogId(arg.event.id);
		setDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDialogOpen(false);
	};

	const handleSaveDialog = () => {
		if (dialogId) {
			const updatedEvent = events.find(event => event.id === dialogId);
			if (updatedEvent) {
				setEvents(prevEvents =>
					prevEvents.map(event =>
						event.id === dialogId
							? {
									...event,
									title: dialogContent,
									start: dialogStart || event.start,
									end: dialogEnd || event.end,
									allDay: dialogAllDay,
							  }
							: event
					)
				);
			}
		} else {
			const newEvent: Event = {
				id: `${events.length + 1}`,
				title: dialogContent,
				start: dialogStart || new Date(),
				end: dialogEnd || new Date(),
				allDay: dialogAllDay,
			};
			setEvents([...events, newEvent]);
		}
		setDialogOpen(false);
	};

	const handleDeleteDialog = () => {
		const updatedEvents = events.filter(event => event.id !== dialogId);
		setEvents([...updatedEvents]);
		setDialogOpen(false);
	};

	// @ts-ignore
	return (
		<Box>
			<FullCalendar
				themeSystem="bootstrap5"
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
				initialView="dayGridMonth"
				events={events}
				weekends={displayWeekends}
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay',
				}}
				selectable={selectable}
				editable={editable}
				select={handleSelect}
				eventClick={handleEventClick}
			/>
			<Dialog open={dialogOpen} onClose={handleCloseDialog}>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Event"
						fullWidth
						value={dialogContent}
						onChange={e => setDialogContent(e.target.value)}
					/>
					<TextField
						margin="dense"
						label="Start"
						type="datetime-local"
						fullWidth
						value={
							dialogStart
								? new Date(dialogStart.getTime() - dialogStart.getTimezoneOffset() * 60000)
										.toISOString()
										.substring(0, 16)
								: ''
						}
						onChange={e => setDialogStart(new Date(e.target.value))}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						margin="dense"
						label="End"
						type="datetime-local"
						fullWidth
						value={
							dialogEnd
								? new Date(dialogEnd.getTime() - dialogEnd.getTimezoneOffset() * 60000)
										.toISOString()
										.substring(0, 16)
								: ''
						}
						onChange={e => setDialogEnd(new Date(e.target.value))}
						InputLabelProps={{ shrink: true }}
					/>
					<Checkbox checked={dialogAllDay} onChange={e => setDialogAllDay(e.target.checked)} />
					All Day
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSaveDialog} color="primary">
						Save
					</Button>
					{dialogId && (
						<Button onClick={handleDeleteDialog} color="secondary">
							Delete
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Calendar;
