import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import './index.css';


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