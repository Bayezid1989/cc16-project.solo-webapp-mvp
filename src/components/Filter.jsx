import React, { useState } from "react";
import axios from "axios";

export default function Filter({ setMarkers, cities, countries }) {
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
    <div className="filter-wrapper">
      <select
        className="select filter-part"
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
        className="select filter-part"
        onChange={(e) => {
          setSelectedCity(e.target.value);
        }}
        onBlur={(e) => {
          setSelectedCity(e.target.value);
        }}
      >
        <option>Region/City</option>
        {cities
          ? cities.map((city, index) => <option key={index}>{city}</option>)
          : null}
      </select>
      <div className="filter-part">
        <label className="check-label" htmlFor="filter-check-favorite">
          Favorite
        </label>
        <input
          id="filter-check-favorite"
          type="checkbox"
          className="checkbox"
          onChange={() => {
            setIsFavorite(!isFavorite);
          }}
        ></input>
      </div>
      <div className="filter-part">
        <label className="check-label" htmlFor="filter-check-handmade">
          Handmade
        </label>
        <input
          id="filter-check-handmade"
          type="checkbox"
          className="checkbox"
          onChange={() => {
            setIsHandmade(!isHandmade);
          }}
        ></input>
      </div>
      <button
        className="submit-button purple filter-part"
        onClick={() => {
          filter();
        }}
      >
        Filter!
      </button>
    </div>
  );
}
