import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { mapLocation } from "../utils/helpers";
import { useEffect } from "react";
import { useState } from "react";

//single ticket view map
const mapContainerStyleSingle = {
  width: "500px",
  height: "600px",
};
// all tickets
const mapContainerStyle = {
  width: "700px",
  height: "900px",
};

//default center US
const center = {
  lat: 39.828175, // latitude
  lng: -98.5795, // longitude
};
//default zoom
const zoom = 5;
/** Display Map with tickets pass in */
export default function Map({ tickets, single }) {
  let latLng = {};
  let map = {};
  let setZoom = null;
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
  }, [tickets]);
  ///
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  /////

  /// if only 1 marker ,set new center, zoom, style
  if (single === true) {
    latLng = location[0];
    setZoom = 15;
    map = mapContainerStyleSingle;
  } else {
    /// not singel view set to default
    latLng = center;
    setZoom = zoom;
    map = mapContainerStyle;
  }

  ///render to
  return (
    <div>
      <GoogleMap mapContainerStyle={map} zoom={setZoom} center={latLng}>
        {location.map((marker, index) => {
          return <Marker position={marker} key={index} />;
        })}
      </GoogleMap>
    </div>
  );
}
