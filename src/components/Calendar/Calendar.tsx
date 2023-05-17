import React, { FC, useReducer, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DateSelectArg, EventClickArg, CalendarOptions } from '@fullcalendar/core';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import './Calendar.css';
import CalendarSkeleton from './CalendarSkeleton';

interface CustomCalendarProps extends CalendarOptions {
	displayWeekends?: boolean;
	selectable?: boolean;
	editable?: boolean;
	initialDate?: string;
	isSkeleton?: boolean;
}

type Event = {
	id: string;
	title: string;
	start: Date;
	end?: Date;
	allDay?: boolean;
};

type DialogProperties = {
	open: boolean;
	title: string;
	content: string;
	start: Date | null;
	end: Date | null;
	allDay: boolean;
	id: number | null;
};

type DialogAction = {
	type: string;
	title?: string;
	content?: string;
	start?: Date | null;
	end?: Date | null;
	allDay?: boolean;
	id?: number | null;
};

const initialState: DialogProperties = {
	open: false,
	title: '',
	content: '',
	start: null,
	end: null,
	allDay: false,
	id: null,
};

const reducer = (state: typeof initialState, action: DialogAction): typeof initialState => {
	const { type, title, content, start, end, allDay, id } = action;
	switch (type) {
		case 'OPEN_DIALOG': {
			return {
				...state,
				open: true,
			};
		}
		case 'CLOSE_DIALOG':
			return {
				...state,
				open: false,
			};
		case 'EVENT_CLICK':
			return {
				open: true,
				title: title ?? state.title,
				content: content ?? state.content,
				start: start ?? state.start,
				end: end ?? state.end,
				allDay: allDay ?? state.allDay,
				id: id ?? state.id,
			};
		case 'ADD_EVENT':
			return {
				...state,
				open: true,
				title: title!,
				content: content!,
				start: start!,
				end: end!,
				allDay: allDay!,
				id: id!,
			};
		case 'SET_ALL_DAY':
			return {
				...state,
				allDay: allDay!,
			};
		case 'SET_CONTENT':
			return {
				...state,
				content: content!,
			};
		case 'SET_END':
			return {
				...state,
				end: end!,
			};
		case 'SET_START':
			return {
				...state,
				start: start!,
			};
		default:
			throw new Error();
	}
};

const Calendar: FC<CustomCalendarProps> = ({ displayWeekends, selectable, editable, isSkeleton, ...props }) => {
	const [events, setEvents] = useState<Event[]>([
		{
			id: '1',
			title: 'Event 1',
			start: new Date(),
			end: new Date(),
			allDay: true,
		},
	]);
	const [dialogProperties, dispatch] = useReducer(reducer, initialState);

	const handleSelect = (arg: DateSelectArg) => {
		dispatch({
			type: 'ADD_EVENT',
			title: 'Add Event',
			content: '',
			start: arg.start,
			end: arg.end,
			allDay: arg.allDay,
			id: null,
		});
	};

	const handleEventClick = (arg: EventClickArg) => {
		dispatch({
			type: 'EVENT_CLICK',
			title: 'Edit Event',
			content: arg.event.title,
			start: arg.event.start,
			end: arg.event.end,
			allDay: arg.event.allDay,
			id: Number(arg.event.id),
		});
	};

	const handleCloseDialog = () => {
		dispatch({ type: 'CLOSE_DIALOG' });
	};

	const handleSaveDialog = () => {
		if (dialogProperties.id) {
			const updatedEvent = events.find(event => Number(event.id) === dialogProperties.id);
			if (updatedEvent) {
				setEvents(prevEvents =>
					prevEvents.map(event =>
						Number(event.id) === dialogProperties.id
							? {
									...event,
									title: dialogProperties.content,
									start: dialogProperties.start || event.start,
									end: dialogProperties.end || event.end,
									allDay: dialogProperties.allDay,
							  }
							: event
					)
				);
			}
		} else {
			const newEvent: Event = {
				id: `${events.length + 1}`,
				title: dialogProperties.content,
				start: dialogProperties.start || new Date(),
				end: dialogProperties.end || new Date(),
				allDay: dialogProperties.allDay,
			};
			setEvents([...events, newEvent]);
		}
		handleCloseDialog();
	};

	const handleDeleteDialog = () => {
		const updatedEvents = events.filter(event => Number(event.id) !== dialogProperties.id);
		setEvents([...updatedEvents]);
		handleCloseDialog();
	};

	if (isSkeleton) {
		return <CalendarSkeleton />;
	}

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
				{...props}
			/>
			<Dialog open={dialogProperties.open} onClose={handleCloseDialog}>
				<DialogTitle>{dialogProperties.title}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Event"
						fullWidth
						value={dialogProperties.content}
						onChange={e => {
							dispatch({ type: 'SET_CONTENT', content: e.target.value });
						}}
					/>
					<TextField
						margin="dense"
						label="Start"
						type="datetime-local"
						fullWidth
						value={
							dialogProperties.start
								? new Date(
										dialogProperties.start.getTime() -
											dialogProperties.start.getTimezoneOffset() * 60000
								  )
										.toISOString()
										.substring(0, 16)
								: ''
						}
						onChange={e => {
							dispatch({ type: 'SET_START', start: new Date(e.target.value) });
						}}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						margin="dense"
						label="End"
						type="datetime-local"
						fullWidth
						value={
							dialogProperties.end
								? new Date(
										dialogProperties.end.getTime() -
											dialogProperties.end.getTimezoneOffset() * 60000
								  )
										.toISOString()
										.substring(0, 16)
								: ''
						}
						onChange={e => dispatch({ type: 'SET_END', end: new Date(e.target.value) })}
						InputLabelProps={{ shrink: true }}
					/>
					<Checkbox
						checked={dialogProperties.allDay}
						onChange={e => dispatch({ type: 'SET_ALL_DAY', allDay: e.target.checked })}
					/>
					All Day
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSaveDialog} color="primary">
						Save
					</Button>
					{dialogProperties.id && (
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
