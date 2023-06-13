import { FC, useState, useCallback, useEffect, useMemo } from 'react';
import {
	useJsApiLoader,
	GoogleMap,
	Marker,
	DirectionsRenderer,
	DirectionsService,
	MarkerProps,
	GoogleMapProps,
	Circle,
} from '@react-google-maps/api';
import {
	Box,
	Typography,
	CircularProgress,
	Backdrop,
	useMediaQuery,
	FormControl,
	MenuItem,
	Select,
} from '@mui/material';
import { AccessTime, DirectionsBike, DirectionsBus, DirectionsWalk, DriveEta, Route } from '@mui/icons-material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Controls from './Contorls';
import { LatLngLiteral, MapOptions, Map, DirectionsResult, CircleOptions } from '../../core/models/map';
import { Aubergine, Night, Retro, Silver, Standard } from './mapThemes';

export interface MapProps extends GoogleMapProps {
	center: {
		lat: number;
		lng: number;
	};
	zoom: number;
	markers?: MarkerProps[];
	options?: MapOptions;
	disableDefaultUI?: boolean;
	disableDoubleClickZoom?: boolean;
	draggable?: boolean;
	draggableCursor?: string | null;
	fullscreenControl?: boolean;
	originMarkerIcon?: string | null;
	destinationMarkerIcon?: string | null;
	theme?: 'Night' | 'Retro' | 'Silver' | 'Standard' | 'Aubergine';
	circles?: {
		center: LatLngLiteral;
		radius: number;
		options: CircleOptions;
	}[];
	displayCustomControls?: boolean;
}

const MapComponent: FC<MapProps> = ({
	center,
	zoom,
	markers,
	disableDefaultUI,
	disableDoubleClickZoom,
	draggable,
	draggableCursor,
	fullscreenControl,
	originMarkerIcon,
	destinationMarkerIcon,
	theme,
	circles,
	displayCustomControls,
	...props
}) => {
	const [map, setMap] = useState<Map | null>(null);
	const [mapTheme, setMapTheme] = useState<{ styles: any }>({
		styles: Standard,
	});
	const [directionsResponse, setDirectionsResponse] = useState<DirectionsResult | null>(null);
	const [distance, setDistance] = useState<string>('');
	const [duration, setDuration] = useState<string>('');
	const [origin, setOrigin] = useState<LatLngLiteral | null>(null);
	const [destination, setDestination] = useState<LatLngLiteral | null>(null);
	const [openControls, setOpenControls] = useState<boolean>(true);
	const [mode, setMode] = useState<'DRIVING' | 'TRANSIT' | 'BICYCLING' | 'WALKING'>('DRIVING');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleModeChange = (value: 'DRIVING' | 'TRANSIT' | 'BICYCLING' | 'WALKING') => {
		const selectedMode = value;
		setMode(selectedMode);
	};
	const isMobile = useMediaQuery('(max-width:767px)');

	const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: apiKey as string,
		libraries: ['places'],
	});

	const containerStyle = {
		width: '100vw',
		height: '100vh',
		padding: 0,
		margin: 0,
		...props.mapContainerStyle,
	};

	const onLoad = useCallback((map: Map | null) => {
		setMap(map);
	}, []);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, []);

	const memoizedMarkers = useMemo(() => {
		return (
			markers &&
			markers.map((marker, index) => <Marker key={`${marker.position.lat}${marker.position.lng}`} {...marker} />)
		);
	}, [markers]);

	useEffect(() => {
		if (origin && destination) {
			const directionsService = new google.maps.DirectionsService();

			directionsService.route(
				{
					origin,
					destination,
					travelMode: google.maps.TravelMode[mode],
				},
				(result, status) => {
					if (status === google.maps.DirectionsStatus.OK) {
						setDirectionsResponse(result);
					} else {
						console.log(`Directions request failed due to ${status}`);
					}
				}
			);
		}
	}, [origin, destination, mode]);

	useEffect(() => {
		switch (theme) {
			case 'Standard':
				setMapTheme({
					styles: Standard,
				});
				break;
			case 'Silver':
				setMapTheme({
					styles: Silver,
				});
				break;
			case 'Night':
				setMapTheme({
					styles: Night,
				});
				break;
			case 'Retro':
				setMapTheme({
					styles: Retro,
				});
				break;
			case 'Aubergine':
				setMapTheme({
					styles: Aubergine,
				});
				break;
			default:
				setMapTheme({
					styles: Standard,
				});
				break;
		}
	}, [theme]);

	if (!isLoaded) {
		return (
			<Backdrop open>
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}

	if (loadError) {
		return <div>Map cannot be loaded right now, sorry</div>;
	}

	return (
		<Box
			sx={{
				position: 'relative',
				flexDirection: 'column',
				alignItems: 'center',
				height: '100vh',
				width: '100vw',
			}}
		>
			{displayCustomControls && (
				<>
					<Box
						sx={{
							overflow: 'hidden',
							position: 'absolute',
							flexGrow: 1,
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
							alignItems: 'center',
							top: 0,
							zIndex: 1,
							left: '50%',
							width: isMobile ? '100%' : '40%',
							transform: 'translateX(-50%)',
						}}
						className="controls"
					>
						<Box
							sx={{
								p: 2,
								zIndex: 2,
								backgroundColor: '#fff',
								boxShadow: '0 0 10px rgba(0,0,0,0.2)',
								display: 'flex',
								borderRadius: '0 0 20px 20px',
								flexDirection: 'column',
								width: '100%',
								transform: openControls ? 'translateY(0)' : 'translateY(-100%)',
								transition: 'transform 0.3s ease-in-out',
							}}
						>
							<Box
								sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', height: '50px' }}
							>
								<Controls
									setOpenControls={setOpenControls}
									setIsLoading={setIsLoading}
									setOrigin={(position: LatLngLiteral) => {
										setOrigin(position);
										map?.panTo(position);
									}}
									setDestination={(position: LatLngLiteral) => {
										setDestination(position);
										map?.panTo(position);
									}}
								/>
							</Box>
							{distance && duration ? (
								<Box
									sx={{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-around',
										alignItems: 'center',
										padding: '10px 0',
									}}
								>
									<Typography
										sx={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<Route sx={{ marginRight: '10px' }} /> {distance && `Distance: ${distance}`}
									</Typography>
									<Typography
										sx={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<AccessTime sx={{ marginRight: '10px' }} />
										{duration && `Duration: ${duration}`}
									</Typography>
								</Box>
							) : null}
						</Box>

						<Box
							sx={{
								backgroundColor: '#fff',
								display: openControls ? 'none' : 'flex',
								width: '15%',
								padding: '0 5px',
								textAlign: 'center',
								zIndex: 1,
								borderRadius: '0 0 20px 20px',
								cursor: 'pointer',
								top: 0,
								position: 'absolute',
								justifyContent: 'center',
							}}
							onClick={() => setOpenControls(!openControls)}
						>
							<KeyboardDoubleArrowDownIcon />
						</Box>
					</Box>

					<FormControl
						sx={{
							display: origin && destination ? 'flex' : 'none',
							position: 'absolute',
							background: '#fff',
							zIndex: 1,
							overflow: 'hidden',
							bottom: '10px',
							right: '10px',
							height: '50px',
						}}
					>
						<Select
							variant="outlined"
							value={mode}
							sx={{
								width: '100%',
								borderRadius: 0,
								height: '100%',
							}}
							size="small"
							onChange={e =>
								handleModeChange(e.target.value as 'DRIVING' | 'TRANSIT' | 'BICYCLING' | 'WALKING')
							}
						>
							<MenuItem value="DRIVING" sx={{ display: 'flex', justifyContent: 'center' }}>
								<DriveEta />
							</MenuItem>
							<MenuItem value="WALKING" sx={{ display: 'flex', justifyContent: 'center' }}>
								<DirectionsWalk />
							</MenuItem>
							<MenuItem value="BICYCLING" sx={{ display: 'flex', justifyContent: 'center' }}>
								<DirectionsBike />
							</MenuItem>
							<MenuItem value="TRANSIT" sx={{ display: 'flex', justifyContent: 'center' }}>
								<DirectionsBus />
							</MenuItem>
						</Select>
					</FormControl>
				</>
			)}
			<Box>
				<GoogleMap
					{...props}
					mapContainerStyle={containerStyle}
					center={center}
					options={{
						disableDefaultUI,
						disableDoubleClickZoom,
						draggable,
						draggableCursor,
						fullscreenControl,
						...mapTheme,
					}}
					zoom={10}
					onLoad={onLoad}
					onUnmount={onUnmount}
				>
					<>
						<Backdrop sx={{ color: '#fff', zIndex: 1 }} open={isLoading}>
							<CircularProgress color="inherit" />
						</Backdrop>
						{memoizedMarkers}
						{origin && <Marker position={origin} icon={{ url: originMarkerIcon as string }} />}

						{origin && destination && (
							<DirectionsService
								options={{
									destination,
									origin,
									travelMode: google.maps.TravelMode[mode],
								}}
								callback={(result, status) => {
									if (
										(result?.routes[0]?.legs[0]?.distance?.text as string) === distance &&
										(result?.routes[0]?.legs[0]?.duration?.text as string) === duration
									) {
										return;
									}
									if (result && status === google.maps.DirectionsStatus.OK) {
										setDistance(result?.routes[0]?.legs[0]?.distance?.text as string);
										setDuration(result?.routes[0]?.legs[0]?.duration?.text as string);
										setDirectionsResponse(result);
									}
								}}
							/>
						)}
						{directionsResponse && (
							<DirectionsRenderer
								options={{
									directions: directionsResponse,
									polylineOptions: {
										strokeColor: '#1877f2',
									},
								}}
							/>
						)}
						{circles &&
							circles.map(circle => (
								<Circle
									key={circle.center.lat + circle.center.lng}
									center={circle.center}
									radius={circle.radius}
									options={circle.options}
								/>
							))}
					</>
				</GoogleMap>
			</Box>
		</Box>
	);
};

export default MapComponent;
