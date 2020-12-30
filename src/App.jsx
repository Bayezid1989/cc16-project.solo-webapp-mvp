import React, { useCallback, useRef, useState } from "react";
import Modal from "react-modal";
import Map from "./components/Map";
import Post from "./components/Post";
import EditDelete from "./components/EditDelete";
import Grid from "./components/Grid";
import Filter from "./components/Filter";

Modal.setAppElement("#root");

export default function App() {
  const [clickedPlace, setClickedPlace] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [cities, setCities] = useState();
  const [countries, setCountires] = useState();
  const [areas, setAreas] = useState();
  const [isPostModal, setIsPostModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const mapRef = useRef();
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(5);
  }, []);

  return (
    <div className="App">
      <h1
        className="header-logo"
        onClick={() => {
          window.location.reload();
        }}
      >
        MagMap!
      </h1>
      <Map
        clickedPlace={clickedPlace}
        setClickedPlace={setClickedPlace}
        markers={markers}
        setMarkers={setMarkers}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        mapRef={mapRef}
        panTo={panTo}
        setCities={setCities}
        setCountires={setCountires}
        setAreas={setAreas}
        setIsPostModal={setIsPostModal}
        setIsEditModal={setIsEditModal}
      />

      <Post
        setClickedPlace={setClickedPlace}
        clickedPlace={clickedPlace}
        markers={markers}
        isPostModal={isPostModal}
        setIsPostModal={setIsPostModal}
      />

      <EditDelete
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
        isEditModal={isEditModal}
        setIsEditModal={setIsEditModal}
      />

      <Filter
        markers={markers}
        setMarkers={setMarkers}
        cities={cities}
        countries={countries}
        areas={areas}
      />
      <Grid markers={markers} panTo={panTo} />
    </div>
  );
}
