import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

export default function EditDelete({ selectedMarker, setSelectedMarker }) {
  const [imageUrl, setImageUrl] = useState();
  const [owner, setOwner] = useState();
  const [hunter, setHunter] = useState();
  const [comment, setComment] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [area, setArea] = useState();
  const [handmade, setHandmade] = useState(false);

  const submitEditData = useCallback(async () => {
    try {
      const body = {};
      if (imageUrl) body.image_url = imageUrl;
      if (owner) body.owner = owner;
      if (hunter) body.hunter = hunter;
      if (comment) body.comment = comment;
      if (city) body.city = city;
      if (country) body.country = country;
      if (area) body.area = area;
      if (handmade) body.handmade = true;
      const res = await axios.patch(`/api/magnet/${selectedMarker.id}`, body);
      if (res.status === 200) window.location.reload();
    } catch (err) {
      console.log("Error at axios.post", err);
    }
  });

  const submitDelete = useCallback(async () => {
    try {
      const res = await axios.delete(`/api/magnet/${selectedMarker.id}`);
      if (res.status === 200) window.location.reload();
    } catch (err) {
      console.log("Error at axios.delete", err);
    }
  });

  return (
    <div id="myModalEdit" className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit or Delete</h4>
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
                submitEditData();
              }}
            ></img>
            <img
              className="submit-button"
              src="/icons/delete.svg"
              onClick={() => {
                if (window.confirm("Are your sure to delete?")) submitDelete();
              }}
            ></img>
            <img
              className="submit-button"
              src="/icons/cancel.svg"
              data-dismiss="modal"
              onClick={() => {
                setSelectedMarker(null);
              }}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
