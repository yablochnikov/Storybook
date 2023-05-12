import { useEffect, useMemo, useRef, useState, FC, useCallback } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
	GoogleMap,
	InfoWindow,
	Marker,
	useJsApiLoader,
	Polyline,
	LoadScript,
	DirectionsService,
	DirectionsRenderer,
	OverlayView,
} from '@react-google-maps/api';
import { Button, Box, Typography, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import NavigationIcon from '@mui/icons-material/Navigation';
import TourIcon from '@mui/icons-material/Tour';
import DestinationIcon from '../../assets/icons/destination-icon.svg';
import Places from './Places';
import { Map, LatLngLiteral } from '../../core/models/map';
import Distance from './Ditstance';

type MapProps = {
	lat: number;
	lng: number;
	zoom: number;
	apiKey: string;
	markers: {
		position: { lat: number; lng: number };
		label: string;
	}[];
	polylines: {
		path: { lat: number; lng: number }[];
		strokeColor: string | null;
		strokeOpacity: number | null;
		strokeWeight: number | null;
	}[];
	destinationIcon: string | google.maps.Icon | google.maps.Symbol;
	userLocationIcon: string | google.maps.Icon | google.maps.Symbol;
	travelMode: 'BICYCLING' | 'DRIVING' | 'TRANSIT' | 'WALKING';
};

type DirectionsResult = google.maps.DirectionsResult;

const MapComponent: FC<MapProps> = ({
	lat,
	lng,
	zoom,
	apiKey,
	markers,
	polylines,
	travelMode,
	destinationIcon,
	userLocationIcon,
}) => {
	enum TravelMode {
		DRIVING = 'DRIVING',
		BICYCLING = 'BICYCLING',
		TRANSIT = 'TRANSIT',
		WALKING = 'WALKING',
	}

	const [loading, setLoading] = useState(true);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [response, setResponse] = useState<DirectionsResult | null>(null);
	const [place, setPlace] = useState<LatLngLiteral>();
	const [userLocation, setUserLocation] = useState<LatLngLiteral>();
	const mapRef = useRef<null | Map>(null);
	const center = useMemo(() => ({ lat, lng }), [lat, lng]);
	const options = useMemo(() => ({ mapId: '4cecbdea91f37338', disableDefaultUI: true, clickableIcons: false }), []);

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: apiKey,
		libraries: ['places'],
	});

	const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackBar(false);
	};

	const onLoad = useCallback((map: Map | null) => {
		mapRef.current = map;
		setLoading(false);
	}, []);

	const onUnmount = useCallback(() => {
		mapRef.current = null;
	}, []);

	return (
		<Box
			sx={{
				width: '100vw',
				display: 'flex',
				height: '100vh',
			}}
		>
			{isLoaded ? (
				<>
					<Box
						sx={{
							width: '25%',
							padding: '1rem',
							textAlign: 'center',
							background: '#fff',
							color: '#14161a',
							zIndex: 2,
						}}
					>
						<Typography variant="h2" sx={{ marginBottom: '10px' }}>
							Where to go?
						</Typography>
						<Places
							setPlace={(position: LatLngLiteral) => {
								setUserLocation(position);
								mapRef.current?.panTo(position);
							}}
							type="origin"
							placeholder="Enter your location"
						/>
						<Places
							setPlace={(position: LatLngLiteral) => {
								setPlace(position);
								mapRef.current?.panTo(position);
							}}
							type="destination"
							placeholder="Enter your destination"
						/>
					</Box>
					<GoogleMap
						mapContainerStyle={{
							height: '100vh',
							width: '100%',
						}}
						center={center}
						zoom={zoom}
						options={options}
						onLoad={onLoad}
						onUnmount={onUnmount}
					>
						<Backdrop sx={{ color: '#fff', zIndex: 1 }} open={loading}>
							<CircularProgress color="inherit" />
						</Backdrop>
						<Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
							<Alert onClose={handleCloseSnackBar} severity="info" sx={{ width: '100%' }}>
								Is it correct?
							</Alert>
						</Snackbar>
						{userLocation && place && (
							<DirectionsService
								options={{
									destination: place,
									origin: userLocation,
									travelMode: TravelMode[travelMode],
								}}
								callback={(result, status) => {
									if (response) {
										return;
									}
									if (result && status === google.maps.DirectionsStatus.OK) {
										console.log(result);
										setResponse(result);
									}
								}}
							/>
						)}
						{response && (
							<DirectionsRenderer
								options={{
									directions: response,
									suppressMarkers: true,
									polylineOptions: {
										strokeColor: '#1877f2',
									},
								}}
							/>
						)}
						{place && (
							<Marker
								position={place}
								icon={{
									url: DestinationIcon,
									scaledSize: new google.maps.Size(35, 35),
								}}
							/>
						)}
						{markers.map(marker => (
							<Marker key={marker.label} {...marker} />
						))}
						{userLocation && <Marker position={userLocation} />}
						{polylines.map(polyline => (
							<Polyline key={polyline.path.toString()} {...polyline} />
						))}
					</GoogleMap>
				</>
			) : (
				<>Loading...</>
			)}
		</Box>
	);
};

export default MapComponent;

/* <MyLocationIcon
								onClick={() => {
									if (navigator.geolocation) {
										navigator.geolocation.getCurrentPosition(position => {
											setUserLocation({
												lat: position.coords.latitude,
												lng: position.coords.longitude,
											});
											mapRef.current?.panTo({
												lat: position.coords.latitude,
												lng: position.coords.longitude,
											});
										});
										console.log(userLocation);
									}
								}}
							/> */
