import React, { useCallback, useState } from "react";
import axios from "axios";

export default function Post({ setClickedPlace, clickedPlace, modalAddRef }) {
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
      if (res.status === 200) window.location.reload();
    } catch (err) {
      console.log("Error at axios.post", err);
    }
  });

  return (
    <div className="post-wrapper">
      <button
        ref={modalAddRef}
        type="button"
        className="btn btn-info btn-lg display-none"
        data-toggle="modal"
        data-target="#myModalPost"
      >
        Open Modal
      </button>
      <div className="post-input-wrapper">
        <div id="myModalPost" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Magnet</h4>
              </div>
              <div className="modal-body">
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
                  onChange={(e) => {
                    setHandmade(!handmade);
                  }}
                ></input>
              </div>
              <div className="modal-footer">
                <img
                  className="submit-button"
                  src="/icons/check.svg"
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
                ></img>
                <img
                  className="submit-button"
                  src="/icons/cancel.svg"
                  data-dismiss="modal"
                  onClick={() => {
                    setClickedPlace(null);
                  }}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
