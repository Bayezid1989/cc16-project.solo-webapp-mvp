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
import { Image } from "cloudinary-react";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "60vh",
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
  setIsPostModal,
  setIsEditModal,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onMapClick = useCallback((e) => {
    setClickedPlace({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    setSelectedMarker(null);
  }, []);

  const onMarkerClick = useCallback((marker) => {
    setSelectedMarker(marker);
    setClickedPlace(null);
  }, []);

  const onMapLoad = useCallback(async (map) => {
    const res = await axios.get("/api/magnets");
    setMarkers(res.data);
    console.log("Loaded data", res.data);
    mapRef.current = map;
    const cities = [];
    const countries = [];
    res.data.map((data) => {
      cities.push(data.city);
      countries.push(data.country);
    });
    setCities([...new Set(cities)]);
    setCountires([...new Set(countries)]);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className="modal-wrapper">
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={3}
        center={center}
        options={options}
        onClick={onMapClick}
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
              setIsPostModal(true);
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
              <Image
                className="window-box-image"
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                publicId={selectedMarker.image_path}
                width="150"
                crop="scale"
                onClick={() => setIsEditModal(true)}
              />
              <div className="window-box-info">
                <ul>
                  <li>Hunted by {selectedMarker.hunter}</li>
                  <li>Owned by {selectedMarker.owner}</li>
                  <li>{selectedMarker.comment}</li>
                  <li>
                    {selectedMarker.favorite ? (
                      <img
                        className="window-box-icon"
                        src="/icons/star.svg"
                        alt=""
                      />
                    ) : null}
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
