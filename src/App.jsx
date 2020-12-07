import logo from "./logo.svg";
import "./App.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
require("dotenv").config();

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "70vh",
};

const center = {
  lat: 34.669529,
  lng: 135.497009,
};

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className="App">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={3}
        center={center}
      ></GoogleMap>
    </div>
  );
}

export default App;
