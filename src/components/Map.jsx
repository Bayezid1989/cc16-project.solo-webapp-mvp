import React, { useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import axios from "axios";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "99vw",
  height: "55vh",
};

const center = {
  lat: 34.669529,
  lng: 135.497009,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map({
  setClickedPlace,
  clickedPlace,
  setMarkers,
  markers,
  selectedMarker,
  setSelectedMarker,
  mapRef,
  panTo,
  setCities,
  setCountires,
  setAreas,
  clickModalAdd,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapClick = useCallback((e) => {
    setClickedPlace({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  }, []);

  const onMarkerClick = useCallback((marker) => {
    setSelectedMarker(marker);
  }, []);

  const onMapLoad = useCallback(async (map) => {
    const res = await axios.get("/api/magnets");
    setMarkers(res.data);
    console.log("Loaded data", res.data);
    mapRef.current = map;
    const cities = [];
    const countries = [];
    const areas = [];
    res.data.map((data) => {
      cities.push(data.city);
      countries.push(data.country);
      areas.push(data.area);
    });
    setCities([...new Set(cities)]);
    setCountires([...new Set(countries)]);
    setAreas([...new Set(areas)]);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={3}
        center={center}
        options={options}
        onClick={onMapClick} //popup windoe to insert data --> setMarkers
        onLoad={onMapLoad}
      >
        {markers.map((marker) => {
          let iconPath = "/icons/magnet.svg";
          if (marker.owner !== marker.hunter) iconPath = "/icons/giftbox.svg";
          return (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: iconPath,
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                onMarkerClick(marker);
              }}
            />
          );
        })}

        {clickedPlace !== null ? (
          <Marker
            position={{ lat: clickedPlace.lat, lng: clickedPlace.lng }}
            onClick={() => {
              setClickedPlace(clickedPlace);
              clickModalAdd();
            }}
          />
        ) : null}

        {selectedMarker ? (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div className="window-box-wrapper">
              <img
                className="window-box-image"
                src={selectedMarker.image_url}
                data-toggle="modal"
                data-target="#myModalEdit"
              ></img>
              <div className="window-box-info">
                <ul>
                  <li>Hunted by {selectedMarker.hunter}</li>
                  <li>Owned by {selectedMarker.owner}</li>
                  <li>{selectedMarker.comment}</li>
                  <li>
                    {selectedMarker.handmade ? (
                      <img
                        className="window-box-icon"
                        src="/icons/porcelain.svg"
                        alt=""
                      />
                    ) : null}
                  </li>
                </ul>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 34.669529, lng: () => 135.497009 },
      radius: 200 * 1000,
    },
  });
  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch {
            console.log("Combobox error");
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter a location"
        />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
