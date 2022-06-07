import React, { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import ProgressBar from './ProgressBar';

const GoogleMapComponent = () => {
   const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY });

   const center = useMemo(() => ({
      lat: 40.67,
      lng: -73.94
   }), []);

   if (!isLoaded) return <ProgressBar />;

   return (
      <GoogleMap
         zoom={10}
         center={center}
         mapContainerClassName='map-container'
      >
         <Marker position={center}
         />
      </GoogleMap>
   );
};

export default GoogleMapComponent;