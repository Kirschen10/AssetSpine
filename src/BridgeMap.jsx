import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import './CSS/index.css';

/*
 * The BridgeMap component renders a Google Map displaying the location of a bridge or a specified point.
 * It uses the @react-google-maps/api library to load and display the map with a marker indicating the bridge location.
 *
 * The component consists of:
 * 1. Google Maps API Loading: Uses the useLoadScript hook to load the Google Maps JavaScript API with the provided API key.
 * 2. Map Centering: Defines a center point for the map using useMemo to optimize re-rendering. This center represents the location of the bridge.
 * 3. Map Rendering: Displays the map once the API is fully loaded. If the API is not yet loaded, it shows a loading message.
 * 4. Marker: Adds a marker at the center of the map to indicate the specific location of the bridge.
 */

const BridgeMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAFQOvZvXyFknkXTButx5u9jd3UXVgNBs8",
  });
  const center = useMemo(() => ({ lat: 32.484398675882346, lng: 34.949290038691394 }), []);

  return (
    <div className="BridgeMap">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={14}
        >
          <Marker position={center}/>
        </GoogleMap>
      )}
    </div>
  );
};

export default BridgeMap;