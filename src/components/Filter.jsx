import React, { useState } from "react";
import axios from "axios";

export default function Filter({ setMarkers, cities, countries, areas }) {
  const [selectedCity, setSelectedCity] = useState("Region/City");
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [selectedArea, setSelectedArea] = useState("Area");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHandmade, setIsHandmade] = useState(false);

  const filter = async () => {
    let query;
    if (selectedCity !== "Region/City") {
      query = `city=${selectedCity}`;
    }
    if (selectedCountry !== "Country") {
      query
        ? (query += `&country=${selectedCountry}`)
        : (query = `country=${selectedCountry}`);
    }
    if (selectedArea !== "Area") {
      query
        ? (query += `&area=${selectedArea}`)
        : (query = `area=${selectedArea}`);
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
          setSelectedArea(e.target.value);
        }}
        onBlur={(e) => {
          setSelectedArea(e.target.value);
        }}
      >
        <option>Area</option>
        {areas
          ? areas
              .sort()
              .map((area, index) => <option key={index}>{area}</option>)
          : null}
      </select>
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
          ? countries
              .sort()
              .map((country, index) => <option key={index}>{country}</option>)
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
          ? cities
              .sort()
              .map((city, index) => <option key={index}>{city}</option>)
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
