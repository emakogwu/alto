import { Fragment, useRef, useState } from "react";
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";
import AltoMapStyles from "./AltoMap.module.scss";

const containerStyle = {
    width: "100%",
    height: "600px",
};

const center = {
    lat: 39.8283,
    lng: -98.5795,
};

const altoLocations = [
    { name: "Los Angeles", state: "california", lat: 34.018876, lng: -118.376485 },
    { name: "Irvine", state: "california", lat: 33.661377, lng: -117.706822 },
    { name: "San Diego", state: "california", lat: 32.8216, lng: -117.1475 },
    { name: "Las Vegas", state: "nevada", lat: 36.0845, lng: -115.1521 },
    { name: "Bellevue", state: "washington", lat: 47.6297, lng: -122.1661 },
    { name: "Denver", state: "colorado", lat: 39.73, lng: -104.987 },
    { name: "New York City", state: "new york", lat: 40.751, lng: -73.9787 },
    { name: "Plainview", state: "new york", lat: 40.7856, lng: -73.4502 },
    { name: "Bellaire", state: "texas", lat: 29.7056, lng: -95.4603 },
    { name: "Lewisville", state: "texas", lat: 32.9923, lng: -96.9785 },
    { name: "Austin", state: "texas", lat: 30.19, lng: -97.748 },
];

const highlightedStates = new Set([
    "california",
    "nevada",
    "washington",
    "colorado",
    "new york",
    "texas",
]);

const usaBounds = {
    north: 49.38,
    south: 24.52,
    west: -125.0,
    east: -66.95,
};

const mapOptions: google.maps.MapOptions = {
    restriction: {
        latLngBounds: usaBounds,
        strictBounds: true,
    },
    minZoom: 4,
    maxZoom: 18,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
};

export function AltoMap() {
    const mapRef = useRef<google.maps.Map | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [altoIcon, setAltoIcon] = useState<google.maps.Icon | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    });

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;

        const icon: google.maps.Icon = {
            url: "/alto-icon.png",
            scaledSize: new google.maps.Size(20, 20),
            anchor: new google.maps.Point(20, 20),
        };
        setAltoIcon(icon);

        map.data.loadGeoJson("/us-states.json", null, () => {
            map.data.setStyle((feature) => {
                const stateName = (feature.getProperty("NAME") as string)?.toLowerCase();
                return highlightedStates.has(stateName)
                    ? { fillColor: "#b4d46a", strokeColor: "#444", strokeWeight: 1 }
                    : { fillColor: "#e0e0e0", strokeColor: "#999", strokeWeight: 1 };
            });
        });

        map.data.addListener("click", (event: google.maps.Data.MouseEvent) => {
            const feature = event.feature;
            const stateName = (feature.getProperty("NAME") as string)?.toLowerCase();
            setSelectedState(stateName);

            map.data.forEach((f) => {
                const name = (f.getProperty("NAME") as string)?.toLowerCase();
                map.data.overrideStyle(f, {
                    fillColor: highlightedStates.has(name) ? "#b4d46a" : "#e0e0e0",
                    strokeColor: highlightedStates.has(name) ? "#0B4A73" : "#999",
                    strokeWeight: 1,
                });
            });

            map.data.overrideStyle(feature, {
                fillColor: "#74814b",
                strokeColor: "#0B4A73",
                strokeWeight: 2,
            });
        });
    };

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <Fragment>
            <div className={AltoMapStyles.mapAndAddressContainer}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={2}
                    onLoad={handleMapLoad}
                    options={mapOptions}
                >
                    {altoIcon &&
                        altoLocations.map((location) => (
                            <Marker
                                key={location.name}
                                position={{ lat: location.lat, lng: location.lng }}
                                icon={altoIcon}
                                title={`Alto - ${location.name}`}
                            />
                        ))}
                </GoogleMap>
                <div className={AltoMapStyles.addressContainer}>
                    <div className={AltoMapStyles.header}>
                        <h4>United States</h4>
                    </div>
                    <div className={AltoMapStyles.addresses}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cum cumque doloremque enim est eum expedita impedit magni numquam, odio omnis recusandae rem sit, sunt tempora velit veniam. Minima, voluptas?
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
