"use client";

import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";
import { counties, County } from "../data/counties";

interface GoogleMapContainerProps {
    onSelectCounty: (county: County) => void;
}

// Minimal "Mapbox Dark" Style
const mapStyles = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
    { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
    { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
    { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
    { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
    { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
    { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] }
];

export default function GoogleMapContainer({ onSelectCounty }: GoogleMapContainerProps) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    const center = useMemo(() => ({ lat: 0.0236, lng: 37.9062 }), []);

    const options = useMemo(() => ({
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true, // Keep zoom control for usability
        backgroundColor: "#111111",
    }), []);

    if (loadError) return <div className="w-full h-full flex items-center justify-center text-red-500">Error loading maps</div>;
    if (!isLoaded) return <div className="w-full h-full flex items-center justify-center text-gray-400">Loading Maps...</div>;

    return (
        <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={7}
            options={options}
        >
            {counties.map((county) => (
                <MarkerF
                    key={county.id}
                    position={{ lat: county.lat, lng: county.lng }}
                    onClick={() => onSelectCounty(county)}
                    title={county.name}
                    // Simple Dot Marker
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        fillColor: "#ffffff",
                        fillOpacity: 0.9,
                        scale: 5,
                        strokeColor: "#111111",
                        strokeWeight: 2,
                    }}
                />
            ))}
        </GoogleMap>
    );
}
