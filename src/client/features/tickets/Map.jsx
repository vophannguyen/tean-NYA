import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { mapLocation } from "../utils/helpers";
import { useEffect } from "react";
import { useState } from "react";

const mapContainerStyle = {
  width: "500px",
  height: "600px",
};
//default center US
let center = {
  lat: 39.828175, // latitude
  lng: -98.5795, // longitude
};
let zoom = 5;
/** Display Map with tickets pass in */
export default function Map({ tickets }) {
  //Hook
  const [location, setLocation] = useState([]);

  // fetch google map
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDJ759x5BMY36iXtQw7akcggJTGdp70Egc",
  });

  //get all address
  const allAdress = tickets.map((ticket) => {
    return `${ticket.address1}, ${ticket.city}, ${ticket.state}, ${ticket.zip}, ${ticket.country}`;
  });

  // get all lat , lng
  useEffect(() => {
    async function getLatLng() {
      const ln = await mapLocation(allAdress);
      setLocation(() => ln);
    }
    getLatLng();
  }, []);
  ///
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  /////

  /// if only 1 marker ,set this marker center and change zoom
  if (location.length === 1) {
    center = location[0];
    zoom = 10;
  }

  ///render to
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={center}
      >
        {location.map((marker, index) => {
          return <Marker position={marker} key={index} />;
        })}
      </GoogleMap>
    </div>
  );
}
