import { Fragment, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import AltoMapStyles from "./AltoMap.module.scss";
import { Location } from "./Location";
import { altoLocations, type AltoLocation } from "./Locations";

const containerStyle = {
    width: "100%",
    height: "600px",
};

const center = {
    lat: 39.8283,
    lng: -98.5795,
};

const highlightedStates = new Set([
    "california",
    "nevada",
    "washington",
    "colorado",
    "new york",
    "texas",
]);

const mapOptions: google.maps.MapOptions = {
    restriction: {
        latLngBounds: {
            north: 49.38,
            south: 24.52,
            west: -125.0,
            east: -66.95,
        },
        strictBounds: true,
    },
    minZoom: 4,
    maxZoom: 18,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapId: "a777a6d9e910712c717fc1da",
};

export function AltoMap() {
    const mapRef = useRef<google.maps.Map | null>(null);
    const markerRefs = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
    const [selectedState, setSelectedState] = useState<string | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries: ["marker"],
    });

    const resetView = () => {
        if (!mapRef.current) return;
        const map = mapRef.current;
        const bounds = new google.maps.LatLngBounds();
        altoLocations.forEach((loc) => bounds.extend(new google.maps.LatLng(loc.lat, loc.lng)));
        map.fitBounds(bounds);
        setSelectedState(null);
    };

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;

        map.data.loadGeoJson("/us-states.json", null, () => {
            map.data.setStyle((feature) => {
                const stateName = (feature.getProperty("NAME") as string)?.toLowerCase();
                return highlightedStates.has(stateName)
                    ? { fillColor: "#b4d46a", strokeColor: "#444", strokeWeight: 1 }
                    : { fillColor: "#e0e0e0", strokeColor: "#999", strokeWeight: 1 };
            });
        });

        map.data.addListener("click", (event: google.maps.Data.MouseEvent) => {
            const stateName = (event.feature.getProperty("NAME") as string)?.toLowerCase();
            if (!highlightedStates.has(stateName)) return;

            setSelectedState(stateName);
            const locations = altoLocations.filter((l) => l.state === stateName);
            if (locations.length) {
                map.setCenter({ lat: locations[0].lat, lng: locations[0].lng });
                map.setZoom(7);
            }
        });

        altoLocations.forEach((location) => {
            const icon = document.createElement("img");
            icon.src = "/alto-icon.png";
            icon.style.width = "30px";
            icon.style.height = "30px";

            const marker = new google.maps.marker.AdvancedMarkerElement({
                position: { lat: location.lat, lng: location.lng },
                content: icon,
                title: `Alto - ${location.name}`,
                map: map,
            });

            markerRefs.current.push(marker);
        });
    };

    useEffect(() => {
        return () => {
            markerRefs.current.forEach((marker) => marker.map = null);
            markerRefs.current = [];
        };
    }, [isLoaded]);

    if (!isLoaded) return <div>Loading map...</div>;

    return (
        <Fragment>
            <div className={AltoMapStyles.mapAndAddressContainer}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={4}
                    onLoad={handleMapLoad}
                    options={mapOptions}
                />
                <div className={AltoMapStyles.addressContainer}>
                    <div className={AltoMapStyles.header}>
                        <h4>United States</h4>
                        {selectedState && (<button
                            onClick={resetView}
                            style={{
                                marginTop: "0.5rem",
                                padding: "0.4rem 0.8rem",
                                fontSize: "0.9rem",
                                border: "1px solid #ccc",
                                backgroundColor: "white",
                                cursor: "pointer",
                            }}
                        >
                        All locations</button>)}
                    </div>
                    <div className={AltoMapStyles.addresses}>
                        <Location
                            selectedState={selectedState}
                            onSelect={(location: AltoLocation) => {
                                setSelectedState(location.state);
                                const map = mapRef.current;
                                if (map) {
                                    map.setCenter({lat: location.lat, lng: location.lng});
                                    map.setZoom(7);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
