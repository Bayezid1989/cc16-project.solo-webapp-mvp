import React, { useState } from "react";
import axios from "axios";

export default function Filter({ markers, setMarkers, cities, countries }) {
  const [selectedCity, setSelectedCity] = useState("City");
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHandmade, setIsHandmade] = useState(false);

  const filter = async () => {
    let query;
    if (selectedCity !== "City") {
      query = `city=${selectedCity}`;
    }
    if (selectedCountry !== "Country") {
      query
        ? (query += `&country=${selectedCountry}`)
        : (query = `country=${selectedCountry}`);
    }
    if (isFavorite === true) {
      query ? (query += "&favorite=true") : (query = "favorite=true");
    }
    if (isHandmade === true) {
      query ? (query += "&handmade=true") : (query = "handmade=true");
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
      <span>Favorite?</span>
      <input
        type="checkbox"
        className="post-input"
        onChange={(e) => {
          setIsFavorite(!isFavorite);
        }}
      ></input>
      <span>Handmade?</span>
      <input
        type="checkbox"
        className="post-input"
        onChange={(e) => {
          setIsHandmade(!isHandmade);
        }}
      ></input>
      <button
        onClick={() => {
          filter();
        }}
      >
        Filter!
      </button>
    </div>
  );
}
