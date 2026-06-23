import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 14); // Adjust zoom as needed
    }
  }, [lat, lng]);
  return null;
};

const LiveMap = ({ center, pickup, destination, captain }) => {
  return (
    <MapContainer center={center || [20.5937, 78.9629]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {center && <RecenterAutomatically lat={center[0]} lng={center[1]} />}
      
      {pickup && (
        <Marker position={pickup}>
          <Popup>Pickup Location</Popup>
        </Marker>
      )}
      
      {destination && (
        <Marker position={destination}>
          <Popup>Destination Location</Popup>
        </Marker>
      )}

      {captain && (
        <Marker position={captain}>
          <Popup>Captain Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default LiveMap;
