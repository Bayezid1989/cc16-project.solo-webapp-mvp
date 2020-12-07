import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Filter from "./components/Filter";
import Grid from "./components/Grid";
import axios from "axios";

export default function App() {
  const [clickedPlace, setClickedPlace] = useState();
  const [markers, setMarkers] = useState([]);

  useEffect(async () => {
    const allData = await axios.get("/api/magnets");
    setMarkers(allData.data);
    console.log(allData.data);
  }, []);

  return (
    <div className="App">
      <h1>MagMap!</h1>
      <Map
        setClickedPlace={setClickedPlace}
        clickedPlace={clickedPlace}
        markers={markers}
      />
      <Filter />
      <Grid />
    </div>
  );
}
