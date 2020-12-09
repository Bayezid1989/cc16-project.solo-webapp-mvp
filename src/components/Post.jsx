import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Post({
  markers,
  setMarkers,
  setIsPostView,
  setClickedPlace,
  clickedPlace,
}) {
  const [imageUrl, setImageUrl] = useState();
  const [owner, setOwner] = useState();
  const [hunter, setHunter] = useState();
  const [comment, setComment] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [area, setArea] = useState();
  const [handmade, setHandmade] = useState(false);

  const submitPostData = useCallback(async () => {
    try {
      const body = {
        image_url: imageUrl,
        lat: clickedPlace.lat,
        lng: clickedPlace.lng,
        owner: owner,
        hunter: hunter,
        comment: comment,
        city: city,
        country: country,
        area: area,
        handmade: handmade,
      };
      const res = await axios.post("/api/magnet", body);
      window.location.reload();
    } catch (err) {
      console.log("Got an error at axios.post", err);
    }
  });

  return (
    <div className="post-wrapper">
      <div className="post-input-wrapper">
        <input
          type="text"
          className="post-input"
          placeholder="Image URL"
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="post-input"
          placeholder="Owner"
          onChange={(e) => {
            setOwner(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="post-input"
          placeholder="Hunter"
          onChange={(e) => {
            setHunter(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="post-input"
          placeholder="Comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="post-input"
          placeholder="City"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="post-input"
          placeholder="Country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        ></input>
        <input
          type="text"
          className="post-input"
          placeholder="Area"
          onChange={(e) => {
            setArea(e.target.value);
          }}
        ></input>
        <span>Handmade?</span>
        <input
          type="checkbox"
          className="post-input"
          placeholder="Area"
          onChange={(e) => {
            setHandmade(!handmade);
          }}
        ></input>
        <button
          className="post-button"
          onClick={() => {
            if (
              imageUrl &&
              owner &&
              hunter &&
              comment &&
              city &&
              country &&
              area
            ) {
              submitPostData();
            } else {
              alert("Input all the information!");
            }
          }}
        >
          Post New Magnet
        </button>
        <button
          onClick={() => {
            setIsPostView(false);
            setClickedPlace(null);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
