import React, { useCallback, useRef, useState } from "react";
import "./App.css";
// import Search from "./components/Search";
import Map from "./components/Map";
import Grid from "./components/Grid";
import Filter from "./components/Filter";

export default function App() {
  const [clickedPlace, setClickedPlace] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef();
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(5);
  }, []);

  return (
    <div className="App">
      <h1 className="header-logo">MagMap!</h1>
      <Map
        clickedPlace={clickedPlace}
        setClickedPlace={setClickedPlace}
        markers={markers}
        setMarkers={setMarkers}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        mapRef={mapRef}
        panTo={panTo}
      />
      <Filter markers={markers} setMarkers={setMarkers} />
      <Grid markers={markers} panTo={panTo} />
    </div>
  );
}
