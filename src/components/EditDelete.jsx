import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

export default function EditDelete({
  selectedMarker,
  setSelectedMarker,
  isEditModal,
  setIsEditModal,
}) {
  const [imagePath, setImagePath] = useState();
  const [owner, setOwner] = useState();
  const [hunter, setHunter] = useState();
  const [comment, setComment] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [favorite, setFavorite] = useState(false);
  const [handmade, setHandmade] = useState(false);

  useEffect(() => {
    if (selectedMarker) {
      setFavorite(selectedMarker.favorite);
      setHandmade(selectedMarker.handmade);
    }
  }, [selectedMarker]);

  const submitEditData = useCallback(async () => {
    try {
      const body = {};
      if (imagePath) body.image_path = imagePath;
      if (owner) body.owner = owner;
      if (hunter) body.hunter = hunter;
      if (comment) body.comment = comment;
      if (city) body.city = city;
      if (country) body.country = country;
      body.favorite = favorite;
      body.handmade = handmade;
      const res = await axios.patch(`/api/magnet/${selectedMarker.id}`, body);
      if (res.status === 200) window.location.reload();
    } catch (err) {
      console.log("Error at axios.patch", err);
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
    <div className="modal-wrapper">
      <Modal
        isOpen={isEditModal}
        onRequestClose={() => setIsEditModal(false)}
        overlayClassName={{
          base: "overlay-base ",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before",
        }}
        className={{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before",
        }}
        closeTimeoutMS={200}
      >
        <div className="modal-header">
          <h2 className="modal-title">Edit or Delete Magnet</h2>
        </div>
        <div className="modal-body">
          {selectedMarker ? (
            <input
              type="text"
              className="modal-input"
              placeholder="Image URL"
              defaultValue={selectedMarker.image_path}
              onChange={(e) => {
                setImagePath(e.target.value);
              }}
            ></input>
          ) : null}
          {selectedMarker ? (
            <input
              type="text"
              className="modal-input"
              placeholder="Owner"
              defaultValue={selectedMarker.owner}
              onChange={(e) => {
                setOwner(e.target.value);
              }}
            ></input>
          ) : null}
          {selectedMarker ? (
            <input
              type="text"
              className="modal-input"
              placeholder="Hunter"
              defaultValue={selectedMarker.hunter}
              onChange={(e) => {
                setHunter(e.target.value);
              }}
            ></input>
          ) : null}
          {selectedMarker ? (
            <input
              type="text"
              className="modal-input modal-comment"
              placeholder="Comment"
              defaultValue={selectedMarker.comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></input>
          ) : null}
          {selectedMarker ? (
            <input
              type="text"
              className="modal-input"
              placeholder="City"
              defaultValue={selectedMarker.city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            ></input>
          ) : null}
          {selectedMarker ? (
            <input
              type="text"
              className="modal-input"
              placeholder="Country"
              defaultValue={selectedMarker.country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            ></input>
          ) : null}
          <div className="modal-input">
            <label className="check-label" htmlFor="edit-check-favorite">
              Favorite
            </label>
            <input
              defaultChecked={favorite}
              id="edit-check-favorite"
              type="checkbox"
              className="checkbox"
              onChange={() => {
                setHandmade(!favorite);
              }}
            ></input>
          </div>
          <div className="modal-input">
            <label className="check-label" htmlFor="edit-check-handmade">
              Handmade
            </label>
            <input
              defaultChecked={handmade}
              id="edit-check-handmade"
              type="checkbox"
              className="checkbox"
              onChange={() => {
                setHandmade(!handmade);
              }}
            ></input>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="submit-button green modal-button"
            onClick={() => {
              submitEditData();
            }}
          >
            Edit
          </button>
          <button
            className="submit-button red modal-button"
            onClick={() => {
              if (window.confirm("Are your sure to delete?")) submitDelete();
            }}
          >
            Delete
          </button>
          <button
            className="submit-button grey modal-button"
            onClick={() => {
              setSelectedMarker(null);
              setIsEditModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
