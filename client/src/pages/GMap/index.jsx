import React, { useEffect } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function() {

  useEffect(() => {
    axios.get('/api/status.json');
  });

  const center = {
      lat: 59.95,
      lng: 30.33,
    };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBYQiEs3WrBjzAdUcADUZjX3FXxJWTUES8' }}
          defaultCenter={center}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
    </div>
  );
}
