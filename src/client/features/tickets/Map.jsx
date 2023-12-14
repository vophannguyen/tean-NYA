import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { mapLocation } from "../utils/helpers";
import { useEffect } from "react";
import { useState } from "react";

//single ticket view map
const mapContainerStyleSingle = {
  aspectRatio: "5/6",
  position: "relative",
  width: "100%",
};
// all tickets
const mapContainerStyle = {
  aspectRatio: "6/8",
  position: "relative",
  width: "100%",
};

//default center US
const center = {
  lat: 39.828175, // latitude
  lng: -98.5795, // longitude
};
//default zoom
const zoom = 4;
/** Display Map with tickets pass in
 * https://www.npmjs.com/package/@react-google-maps/api
 */
export default function Map({ tickets, single, city }) {
  const [location, setLocation] = useState([]);
  let latLng = {};
  let map = {};
  let setZoom = null;
  //Hook

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
    if (city === "NewYork") {
      latLng = { lat: 40.73061, lng: -73.935242 };
      setZoom = 11;
      map = mapContainerStyle;
    }
    if (city === "LosAng") {
      latLng = { lat: 34.052235, lng: -118.243683 };
      setZoom = 11;
      map = mapContainerStyle;
    }
    if (city === "Chicago") {
      latLng = { lat: 41.881832, lng: -87.623177 };
      setZoom = 11;
      map = mapContainerStyle;
    }
    if (city === "Boston") {
      latLng = { lat: 42.361145, lng: -71.057083 };
      setZoom = 11;
      map = mapContainerStyle;
    }
  }

  ///render to
  return (
    <section className="map">
      <GoogleMap mapContainerStyle={map} zoom={setZoom} center={latLng}>
        {location.map((marker, index) => {
          return (
            <Marker
              position={marker}
              key={index}
              title={tickets[index]?.title}
              label={tickets[index]?.category.slice(0, 1).toUpperCase()}
            />
          );
        })}
      </GoogleMap>
    </section>
  );
}
