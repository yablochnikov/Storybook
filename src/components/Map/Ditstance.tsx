import { FC } from 'react';
import { Typography, Paper, Box, Icon, Button } from '@mui/material';
import DirectionsIcon from '@mui/icons-material/Directions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';

const commutesPerYear = 260 * 2;
const litresPerKm = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKm = litresPerKm * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

type DistanceProps = {
	leg: google.maps.DirectionsLeg[];
};

const Distance: FC<DistanceProps> = ({ leg }) => {
	const duration = leg[0]?.duration?.value;
	const now = new Date();
	const expectedArrivalTime =
		duration &&
		new Date(now.getTime() + duration * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	return (
		<Paper style={{ position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
			<Box p={2} display="flex" alignItems="center">
				<Typography variant="h6" style={{ marginLeft: 8 }}>
					Directions
				</Typography>
			</Box>
			<Box p={2}>
				<Box display="flex" alignItems="center">
					<Typography variant="body1" style={{ marginLeft: 8 }}>
						Distance: {leg[0]?.distance?.text}
						<DirectionsIcon />
					</Typography>
				</Box>
				<Box display="flex" alignItems="center">
					<Typography variant="body1" style={{ marginLeft: 8 }}>
						Expected time duration: {leg[0]?.duration?.text}
						<AccessTimeIcon />
					</Typography>
				</Box>
				<Box display="flex" alignItems="center">
					<Typography variant="body1" style={{ marginLeft: 8 }}>
						Expected arrival time:
						{duration && expectedArrivalTime}
						<WhereToVoteIcon />
					</Typography>
				</Box>
				<Box>
					<Button>Change distanation</Button>
					<Button>Change origin</Button>
				</Box>
			</Box>
		</Paper>
	);
};

export default Distance;
