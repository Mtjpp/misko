import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '50vh',
  maxWidth: "550px",
  maxHeight: "550px"
};
function Map({latitude, longitude}){

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyACcoL4oMNba7qbTpgnB_EXY5nUY-e5ZEM',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  console.log('Latitude:', latitude);
  console.log('Longitude:', longitude);
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={{ lat: latitude, lng: longitude }}
      >
        <MarkerF 
        position={{ 
          lat: latitude, 
          lng: longitude 
        }}
        />
      </GoogleMap>
    </div>
  );
};

export default Map;

