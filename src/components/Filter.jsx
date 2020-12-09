import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Filter({
  markers,
  setMarkers,
  cities,
  countries,
  areas,
}) {
  const [selectedCity, setSelectedCity] = useState("City");
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [selectedArea, setSelectedArea] = useState("Area");
  const filter = async () => {
    let query;
    if (selectedCity !== "City") {
      query = `city=${selectedCity}`;
    } else if (selectedCountry !== "Country") {
      query = `country=${selectedCountry}`;
    } else if (selectedArea !== "Area") {
      query = `area=${selectedArea}`;
    }

    let filteredData;
    if (query) {
      filteredData = await axios.get(`/api/magnets?${query}`);
    } else {
      filteredData = await axios.get("/api/magnets");
    }
    setMarkers(filteredData.data);
  };

  return (
    <div>
      <select
        className="select"
        onChange={(e) => {
          setSelectedArea(e.target.value);
        }}
        onBlur={(e) => {
          setSelectedArea(e.target.value);
        }}
      >
        <option>Area</option>
        {areas
          ? areas.map((area, index) => <option key={index}>{area}</option>)
          : null}
      </select>
      <select
        className="select"
        onChange={(e) => {
          setSelectedCountry(e.target.value);
        }}
        onBlur={(e) => {
          setSelectedCountry(e.target.value);
        }}
      >
        <option>Country</option>
        {countries
          ? countries.map((country, index) => (
              <option key={index}>{country}</option>
            ))
          : null}
      </select>
      <select
        className="select"
        onChange={(e) => {
          setSelectedCity(e.target.value);
        }}
        onBlur={(e) => {
          setSelectedCity(e.target.value);
        }}
      >
        <option>City</option>
        {cities
          ? cities.map((city, index) => <option key={index}>{city}</option>)
          : null}
      </select>
      <button
        onClick={() => {
          filter();
        }}
      >
        Filter!
      </button>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reset
      </button>
    </div>
  );
}
